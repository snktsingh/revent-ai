import { Box, CircularProgress, Grid } from '@mui/material';
import React, { useState } from 'react';
import { Slide, ToastContainer, toast } from 'react-toastify';
import { ChildContainer, Description, LeftContainer, ResendText, RightContainer, SubTitle, TextInput, Title } from './style';
import { CustomButton } from '@/styles/common-styles/style';
import { ForgotSvgIcon, LockSvgIcon } from '@/constants/media';
import { useAppDispatch } from '@/redux/store';
import { verifyEmailAddress } from '@/redux/thunk/user';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/endpoint';

const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleContinueClick = () => {
    if (!email) {
      toast.error("Please enter your email address");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error('Invalid email address');
      } else {
        setIsLoading(true);
        dispatch(verifyEmailAddress(email))
          .then((res) => {
            setIsEmailSent(true);
            setIsLoading(false);
            toast.success("Email has been sent. Please check your inbox.");
          })
          .catch((error) => {
            setIsLoading(false);
            toast.error("Failed to send email. Please try again.");
            console.error(error);
          });
      }
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        transition={Slide}
      />
      <Grid container>
        <LeftContainer xs={6}>
          <ChildContainer>
            <Title>Forgot Your Password?</Title>
            <Description>
              No worries if you forgot your password! We'll guide you through resetting it, and you'll be back into your account in no time.
            </Description>
            <img src={ForgotSvgIcon} width="90%" />
          </ChildContainer>
        </LeftContainer>
        <Grid xs={6}>
          <RightContainer>
            {isEmailSent ? (
              <>
                <img src="https://img.freepik.com/free-vector/mail-sent-concept-illustration_114360-96.jpg?t=st=1714565196~exp=1714568796~hmac=8ff0cb0150d6193b75f2d7ade070efdd1a839d4140f6b90dd0894f9354da7d56&w=1380" alt="" width={"30%"} />
                <h1>Check your Email</h1>
                <SubTitle >We have sent you an email with the password reset information to {email}</SubTitle>
                <br />
                <ResendText>Haven't received the email? Check your spam folder or</ResendText>
                <Box
                  sx={{
                    width: 400,
                    maxWidth: '100%',
                  }}
                >
                  <CustomButton
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={isLoading ? undefined : handleContinueClick}
                  >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Resend Email'}
                  </CustomButton>
                  <CustomButton
                    variant="outlined"
                    size="large"
                    fullWidth
                    disabled={isLoading}
                    sx={{ mt: 1 }}
                    onClick={() => navigate(ROUTES.LOGIN)}
                  >
                    Back to Login
                  </CustomButton>
                </Box>
              </>
            ) : (
              <>
                <img src={LockSvgIcon} width="30%" />
                <h1>Forgot Password</h1>
                <SubTitle >Please enter your email address associated with your account, and we'll send you an email confirmation to reset your password.</SubTitle>
                <br />
                <br />
                <Box
                  sx={{
                    width: 400,
                    maxWidth: '100%',
                  }}
                >
                  <div>
                    <TextInput
                      id="fullWidth"
                      type="email"
                      name="email"
                      label="Enter your Email"
                      variant="outlined"
                      fullWidth
                      value={email}
                      onChange={handleEmailChange}
                      required
                      disabled={isLoading}
                    />
                    <CustomButton
                      variant="contained"
                      size="large"
                      fullWidth
                      onClick={isLoading ? undefined : handleContinueClick}
                    // disabled={isLoading}
                    >
                      {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Continue'}
                    </CustomButton>
                    <CustomButton
                      variant="outlined"
                      size="large"
                      fullWidth
                      disabled={isLoading}
                      sx={{ mt: 1 }}
                      onClick={() => navigate(ROUTES.LOGIN)}
                    >
                      Back to Login
                    </CustomButton>
                  </div>
                </Box>
              </>
            )}
          </RightContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default ForgotPasswordPage;
