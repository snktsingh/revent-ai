import { Box, Grid, IconButton } from '@mui/material';
import {
  ChildContainer,
  Description,
  LeftContainer,
  PassMessage,
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
import { Slide, ToastContainer } from 'react-toastify';
import useLogin from './container';
import { useAppSelector } from '@/redux/store';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const { email, setEmail, password, setPassword, handleLogin } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const { isDisabled } = useAppSelector(state => state.apiData);
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
                onChange={e => setEmail(e.target.value)}
              />
              <TextInput
                id="fullWidth"
                value={password}
                name="password"
                type={showPassword ? 'text' : 'password'}
                label="Enter your Password"
                variant="outlined"
                fullWidth
                onChange={e => setPassword(e.target.value)}
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
                        )
                    }}
              />
              <CommonLink>Forgot Password ?</CommonLink>
              <CustomButton
                variant="contained"
                size="large"
                fullWidth
                onClick={handleLogin}
              >
                Login
              </CustomButton>
              <SignUp>
                <Link href="/signup">
                  Not registered ? Create a new account
                </Link>
              </SignUp>
            </Box>
            {/* <PassMessage>
              * Password must be minimum of 8 characters and contain at least 1
              letter and 1 number.
            </PassMessage> */}
          </RightContainer>
        </Grid>
      </Grid>
    </div>
  );
};
export default Login;
