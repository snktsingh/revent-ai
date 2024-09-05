import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const GoogleLoginButton = () => {
  const handleSuccess = (response: any) => {
    const idToken = response.credential;
    fetch('https://api.revent.ai/ppt-service/login/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    })
      .then(response => response.text())
      .then(jwtToken => {
        localStorage.setItem('jwt', jwtToken);
        console.log('JWT Token:', jwtToken);
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <GoogleOAuthProvider clientId="684468240936-u98cvial9g1gm02j0p8f7ln6fl0bkogv.apps.googleusercontent.com">
      <GoogleLogin onSuccess={handleSuccess} onError={console.error} />;
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
