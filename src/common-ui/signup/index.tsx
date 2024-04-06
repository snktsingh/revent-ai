import {
  GoogleButton,
  LoginLink,
  SignUpLeftContainer,
  SignupRightContainer,
} from './style';
import Logo from '../../assets/logo.svg';
import SignUpImage from '../../assets/signup.svg';
import { Box, Button, Divider, Grid } from '@mui/material';
import { TextInput } from '../login/style';
import Google from '../../assets/google.svg';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';

const SignUp = () => {
  return (
    <div>
      <Grid container>
        <SignUpLeftContainer xs={6}>
          <img src={Logo} width="25%" />
          <img src={SignUpImage} width="85%" />
        </SignUpLeftContainer>
        <SignUpLeftContainer xs={6}>
          <h1>Create Your Account</h1>
          <SignupRightContainer>
            <br />
            <br />
            <GoogleButton variant="outlined">
              <img src={Google} width="15%" style={{ marginRight: '5%' }} />
              <>Sign up with Google</>
            </GoogleButton>
            <br /> <br />
            <Divider>About</Divider>
            <Box
              sx={{
                width: '80%',
                maxWidth: '100%',
              }}
            >
              <TextInput
                id="fullWidth"
                label="Enter your Name"
                variant="outlined"
                fullWidth
              />
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
            </Box>
            <FormControlLabel
              control={<Checkbox />}
              label="I have read and accept Terms of use and Privacy Notice"
            />
            <br />
            <Button variant="contained" size="large" style={{ width: '80%' }}>
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
