import { Box } from '@mui/material';
import { Message, MessageContainer, PreviewContainer } from './style';
import { useEffect } from 'react';
import { Verify } from '@/constants/media';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/endpoint';
import { UserLink } from '@/pages/homepage/style';

const EmailPreview = ({ mail }: any) => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Set your custom message here
      const confirmationMessage =
        'Are you sure you want to leave? Your changes may not be saved.';

      // Display a confirmation dialog
      event.preventDefault();
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    const handlePopState = () => {
      // Display an alert when the back button is pressed
      window.alert('Back button pressed!');
      // You can add more custom actions here if needed
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
  return (
    <PreviewContainer>
      <MessageContainer>
        <img src={Verify} width="16%" />
        <br />
        <h2>Please verify your email</h2>
        <Message> We have sent a mail to {mail}.</Message>
        <Message>Click the link in the email to verify your account. </Message>
        <br />
        <Message>
          Once verified !{' '}
          <UserLink to={ROUTES.LOGIN}>Click here to Login</UserLink>
        </Message>
      </MessageContainer>
    </PreviewContainer>
  );
};
export default EmailPreview;
