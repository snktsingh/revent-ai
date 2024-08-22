import { Box, Grid, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import {
  ChildContainer,
  Description,
  LeftContainer,
  RedirectLink,
  RightContainer,
  SignUp,
  SubTitle,
  TextInput,
  Title,
} from './style';
import LoginImage from '../../assets/Login.gif';
import Logo from '../../assets/logo.svg';
import { CommonLink, CustomButton } from '@/styles/common-styles/style';
import { Slide, ToastContainer } from 'react-toastify';
import useLogin from './container';
import { useAppSelector } from '@/redux/store';
import React, { useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/endpoint';

const Login = () => {
  const navigate = useNavigate();
  const { email, setEmail, password, setPassword, handleLogin, loginError, setLoginError, isLoading } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleLoginWithError();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [email, password, handleLogin]);

  const { isDisabled } = useAppSelector(state => state.apiData);

  const handleLoginWithError = async () => {
    await handleLogin();
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
            <Title>Transform ideas into stunning slides</Title>
            <Description>
              A platform that encompasses all the creative tools you need for
              your presentations
            </Description>
            <img src={LoginImage} width="90%" />
          </ChildContainer>
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
                value={email}
                type="email"
                name="email"
                label="Enter your Email"
                variant="outlined"
                fullWidth
                onChange={e => {
                  setEmail(e.target.value);
                  if(loginError !== '') {
                    setLoginError('')
                  }
                }}
              />
              <TextInput
                id="fullWidth"
                value={password}
                name="password"
                type={showPassword ? 'text' : 'password'}
                label="Enter your Password"
                variant="outlined"
                fullWidth
                onChange={e =>{ 
                  setPassword(e.target.value)
                  if(loginError !== '') {
                    setLoginError('')
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
              {loginError && (
                <Box sx={{ color: 'red'}}>{loginError}</Box>
              )}
              <CommonLink onClick={()=> navigate(ROUTES.FORGOT_PASSWORD)}>Forgot Password ?</CommonLink>
              <CustomButton
                variant="contained"
                size="large"
                fullWidth
                onClick={() => !isLoading && handleLoginWithError()}
              >
                {isLoading ? 
                  <>
                    <CircularProgress size={18} color="inherit" sx={{mr: 2}} />
                      Logging in...
                  </>
                 : 
                  'Login'
                }
              </CustomButton>
              <SignUp>
                <RedirectLink to="/signup">
                  Not registered ? Create a new account
                </RedirectLink>
              </SignUp>
              <Box sx={{ textAlign: 'center', mt: 1 }}>
                <Link to="/" style={{ textDecoration: 'none', color: '#004fba' }}>
                  Return to Home
                </Link>
              </Box>
            </Box>
          </RightContainer>
        </Grid>
      </Grid>
    </div>
  );
};
export default Login;