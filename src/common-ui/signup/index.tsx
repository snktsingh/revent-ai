import {
  FormContainer,
  LoginLink,
  PassMessage,
  SignUpLeftContainer,
  SignupRightContainer,
} from './style';
import Logo from '../../assets/logo.svg';
import SignUpImage from '../../assets/signup.svg';
import { Box, Button, Grid, IconButton, Link, CircularProgress, MenuItem, Autocomplete, TextField } from '@mui/material';
import { TextInput } from '../login/style';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import useSignup from './container';
import { Slide, ToastContainer } from 'react-toastify';
import EmailPreview from '../emailPreview';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { theme } from '@/constants/theme';
import { countries } from './countries';
import { Link as RouteLink} from 'react-router-dom';

const SignUp = () => {
  const {
    values,
    handleChange,
    setConfirmPassword,
    confirmPassword,
    handleSubmit,
    isDisabled,
    isPreview,
    setIsPreview,
    setIsDisabled,
    handleClickShowPassword,
    handleMouseDownPassword,
    showConfirmPassword,
    showPassword,
    handleClickShowConfirmPassword,
    validation,
    loading,
    handleCountryChange
  } = useSignup();

  if (isPreview) {
    return <EmailPreview mail={values.email} />;
  } else {
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
                  width: '100%',
                  maxWidth: '100%',
                }}
              >
                <FormContainer>
                  <TextInput
                    id="fullWidth"
                    name="email"
                    type="email"
                    label="Enter your Email"
                    variant="outlined"
                    fullWidth
                    value={values.email}
                    onChange={handleChange}
                    error={validation.title === 'email'}
                    helperText={validation.title === 'email' ? validation.message : ''}
                  />
                </FormContainer>
                <FormContainer>
                  <TextInput
                    id="fullWidth"
                    name="firstName"
                    type="text"
                    label="Enter your First Name"
                    variant="outlined"
                    fullWidth
                    value={values.firstName}
                    onChange={handleChange}
                    error={validation.title === 'firstName'}
                    helperText={validation.title === 'firstName' ? validation.message : ''}
                  />
                  <TextInput
                    id="fullWidth"
                    name="lastName"
                    type="text"
                    label="Enter your Last Name"
                    variant="outlined"
                    fullWidth
                    value={values.lastName}
                    onChange={handleChange}
                    error={validation.title === 'lastName'}
                    helperText={validation.title === 'lastName' ? validation.message : ''}
                  />
                </FormContainer>

                <Autocomplete
                  id="country-select-demo"
                  sx={{ width: '100%' }}
                  options={countries}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  onChange={(event, value) => {
                    if (value) handleCountryChange(value?.label)
                  }}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      <img
                        loading="lazy"
                        width="20"
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        alt=""
                      />
                      {option.label}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <FormContainer>
                      <TextField
                        {...params}
                        label="Choose a country"
                        name='country'
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password',
                        }}
                        error={validation.title === 'country'}
                        helperText={validation.title === 'country' ? validation.message : ''}
                        fullWidth
                      />
                    </FormContainer>
                  )}
                />
                <TextInput
                  id="fullWidth"
                  name="password"
                  label="Enter your Password"
                  variant="outlined"
                  fullWidth
                  value={values.password}
                  onChange={handleChange}
                  type={showPassword ? 'text' : 'password'}
                  error={validation.title === 'password'}
                  // helperText={validation.title === 'Password' ? validation.message : ''}
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
                <TextInput
                  id="fullWidth"
                  label="Confirm your Password"
                  variant="outlined"
                  fullWidth
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  type={showConfirmPassword ? 'text' : 'password'}
                  error={(validation.title === 'password') || (validation.title === 'Confirm Password')}
                  helperText={validation.title === 'password' || (validation.title === 'Confirm Password') ? validation.message : ''}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    ),
                  }}
                />
                {validation.title === 'Error' && (
                  <PassMessage style={{ color: '#d32f2f' }}>{validation.message}</PassMessage>
                )}
                {/* <PassMessage>
                  *Passwords must be minimum 8 characters and contain 1 letter,
                  1 number 1 uppercase and 1 lowercase character.
                </PassMessage> */}
              </Box>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox onClick={() => setIsDisabled(!isDisabled)} />
                  }
                  label={
                    <div>
                      I agree to all{' '}
                      <Link
                        href="https://revent-ppt-templates.s3.ap-south-1.amazonaws.com/Terms+of+Service+-+Revent.pdf"
                        target="_blank"
                        style={{
                          color: `${theme.colorSchemes.light.palette.primary}`,
                          textDecoration: 'none',
                        }}
                      >
                        terms of service
                      </Link>{' '}
                      and{' '}
                      <Link
                        href="https://revent-ppt-templates.s3.ap-south-1.amazonaws.com/Privacy+and+Cookie+Policy+-+Revent.pdf"
                        target="_blank"
                        style={{
                          color: `${theme.colorSchemes.light.palette.primary}`,
                          textDecoration: 'none',
                        }}
                      >
                        privacy policy
                      </Link>
                    </div>
                  }
                />
                <br />
                <Button
                  variant="contained"
                  size="large"
                  style={{ width: '100%', margin: '3% 0%' }}
                  onClick={handleSubmit}
                  disabled={isDisabled || loading}
                >
                  {loading ? <CircularProgress size={18} color="inherit" /> : 'Sign up'}
                </Button>
                <LoginLink to="/login">
                  Already have an account ? Login
                </LoginLink>
                <Box sx={{ textAlign: 'center', mt: 1 }}>
                <RouteLink to="/" style={{ textDecoration: 'none', color: '#004fba' }}>
                  Return to Home
                </RouteLink>
              </Box>
              </div>
            </SignupRightContainer>
          </SignUpLeftContainer>
        </Grid>
      </div>
    );
  }
};
export default SignUp;