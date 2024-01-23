import { Box, Button, Grid } from '@mui/material';
import {
  ChildContainer,
  Description,
  LeftContainer,
  RightContainer,
  SignUp,
  SubTitle,
  TextInput,
  Title,
} from './style';
import LoginImage from '../../assets/Login.gif';
import Logo from '../../assets/logo.svg';
import { CommonLink, CustomButton } from '@/styles/common-styles/style';
import Link from '@mui/material/Link';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <Grid container>
        <LeftContainer xs={6}>
          {/* <ImageContainer>
            <img src={LoginBg} />
          </ImageContainer> */}
          <ChildContainer>
            <Title>Transform ideas into stunning slides</Title>
            <Description>
              A platform that encompasses all the creative tools you need for
              your presentations
            </Description>
            <img src={LoginImage} width="90%" />
          </ChildContainer>
          {/* <Image2Container>
            <img src={LoginBg} />
          </Image2Container> */}
        </LeftContainer>
        <Grid xs={6}>
          <RightContainer>
            <img src={Logo} width="30%" />
            <br />
            <br />
            <h1>Welcome back !</h1>
            <SubTitle>Sign in to your account</SubTitle>
            <br />
            <br />
            <br />
            <Box
              sx={{
                width: 400,
                maxWidth: '100%',
              }}
            >
              <TextInput
                id="fullWidth"
                label="Enter your Email"
                variant="outlined"
                fullWidth
              />
              <TextInput
                id="fullWidth"
                label="Enter your Password"
                variant="outlined"
                fullWidth
              />
              <CommonLink>Forgot Password ?</CommonLink>
              <CustomButton
                variant="contained"
                size="large"
                fullWidth
                onClick={() => loginWithRedirect()}
              >
                Login
              </CustomButton>
              {/* <GoogleOAuthProvider clientId="274064975268-8i9v2id2g6f0i9lt6lolehjpolcu41gh.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />
              </GoogleOAuthProvider> */}

              <SignUp>
                <Link href="/signup">
                  Not registered ? Create a new account
                </Link>
              </SignUp>
            </Box>
          </RightContainer>
        </Grid>
      </Grid>
    </div>
  );
};
export default Login;
