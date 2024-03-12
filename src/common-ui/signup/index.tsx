import { LoginLink, SignUpLeftContainer, SignupRightContainer } from './style';
import Logo from '../../assets/logo.svg';
import SignUpImage from '../../assets/signup.svg';
import { Box, Button, Grid } from '@mui/material';
import { TextInput } from '../login/style';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import useSignup from './container';
import { Slide, ToastContainer } from 'react-toastify';

const SignUp = () => {
  const {
    values,
    handleChange,
    setConfirmPassword,
    confirmPassword,
    handleSubmit,
    isDisabled,
    setIsDisabled,
  } = useSignup();

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        transition={Slide}
      />
      <Grid container>
        <SignUpLeftContainer xs={6}>
          <img src={Logo} width="25%" />
          <img src={SignUpImage} width="85%" />
        </SignUpLeftContainer>
        <SignUpLeftContainer xs={6}>
          <h1>Create Your Account</h1>
          <SignupRightContainer>
            <Box
              sx={{
                width: '80%',
                maxWidth: '100%',
              }}
            >
              <TextInput
                id="fullWidth"
                name="login"
                label="Enter your User Name"
                variant="outlined"
                fullWidth
                value={values.login}
                onChange={handleChange}
              />
              <TextInput
                id="fullWidth"
                name="firstName"
                label="Enter your First Name"
                variant="outlined"
                fullWidth
                value={values.firstName}
                onChange={handleChange}
              />
              <TextInput
                id="fullWidth"
                name="lastName"
                label="Enter your Last Name"
                variant="outlined"
                fullWidth
                value={values.lastName}
                onChange={handleChange}
              />
              <TextInput
                id="fullWidth"
                name="email"
                label="Enter your Email"
                variant="outlined"
                fullWidth
                value={values.email}
                onChange={handleChange}
              />
              <TextInput
                id="fullWidth"
                name="password"
                label="Enter your Password"
                variant="outlined"
                fullWidth
                value={values.password}
                onChange={handleChange}
              />
              <TextInput
                id="fullWidth"
                label="Confirm your Password"
                variant="outlined"
                fullWidth
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </Box>
            <FormControlLabel
              control={<Checkbox onClick={() => setIsDisabled(false)} />}
              label="I have read and accept Terms of use and Privacy Notice"
            />
            <br />
            <Button
              variant="contained"
              size="large"
              style={{ width: '80%' }}
              onClick={handleSubmit}
              disabled={isDisabled}
            >
              Sign up
            </Button>
            <LoginLink>
              <Link href="/login">Already have an account ? Login</Link>
            </LoginLink>
          </SignupRightContainer>
        </SignUpLeftContainer>
      </Grid>
    </div>
  );
};
export default SignUp;
