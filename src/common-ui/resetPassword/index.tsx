import React, { useEffect, useState } from 'react';
import { Box, Grid, IconButton, InputAdornment } from '@mui/material';
import { Slide, ToastContainer, toast } from 'react-toastify';
import {
  ChildContainer,
  Description,
  LeftContainer,
  RightContainer,
  SubTitle,
  TextInput,
  Title,
} from './style';
import { CustomButton } from '@/styles/common-styles/style';
import { ForgotSvgIcon, LockSvgIcon, ResetSuccessIcon } from '@/constants/media';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '@/redux/store';
import { resetPassword } from '@/redux/thunk/user';
import { ResendText } from '../forgotPassword/style';
import { ROUTES } from '@/constants/endpoint';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [searchParams, _] = useSearchParams();
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const key = searchParams.get('key');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordVerified(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(newPassword)
    );
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleResetPassword = () => {
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should match. Please try again.");
    } else if (!passwordVerified) {
      toast.error("Password must contain at least one number, one uppercase letter, one lowercase letter, and one symbol");
    } else {
      if (key) {
        setIsLoading(true);
        dispatch(resetPassword({ key, newPassword: password })).then((res) => {
          setIsLoading(false);
          if (res.payload.detail === 'No user was found for this reset key') {
            toast.error("URL expired or Please use the correct URL received in the email.");
          } else {
            setIsPasswordChanged(true)
            toast.success("Your password has been reset successfully!", {
              className: 'toast-success',
            });
          }
        }).catch((error) => {
          setIsLoading(false);
          console.log(error);
          toast.error("Something went wrong");
        })
      }
    }
  };

  return (
    <div>
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar transition={Slide} />
      <Grid container>
        <LeftContainer xs={6}>
          <ChildContainer>
            <Title>Reset Your Password</Title>
            <Description>
              Forgot your password? No worries! Reset it here. Enter your new password and confirm to regain access to your account
            </Description>
            <img src={ForgotSvgIcon} alt="forgot password" width="90%" />
          </ChildContainer>
        </LeftContainer>
        <Grid xs={6}>
          <RightContainer>
            {
              isPasswordChanged ?
                <>
                <img src={ResetSuccessIcon} alt="" width={"30%"} />
                <h1>Password Reset Successful</h1>
                <SubTitle>Password reset successful. You can now log in.</SubTitle>
                <br />
                <Box
                  sx={{
                    width: 400,
                    maxWidth: '100%',
                  }}
                >
                  <CustomButton
                    variant="outlined"
                    size="large"
                    fullWidth
                    disabled={isLoading}
                    sx={{ mt: 1 }}
                    onClick={() => navigate(ROUTES.LOGIN)}
                  >
                    Go to Login
                  </CustomButton>
                </Box>
                </>
                :
                <>
                  <img src={LockSvgIcon} alt="lock" width="30%" />
                  <h1>Reset Password</h1>
                  <SubTitle>Please enter your new password and confirm it below.</SubTitle>
                  <br />
                  <Box
                    sx={{
                      width: 400,
                      maxWidth: '100%',
                    }}
                  >
                    <TextInput
                      type={showPassword ? 'text' : 'password'}
                      label="New Password"
                      variant="outlined"
                      fullWidth
                      value={password}
                      onChange={handlePasswordChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility} edge="end">
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextInput
                      type={showConfirmPassword ? 'text' : 'password'}
                      label="Confirm Password"
                      variant="outlined"
                      fullWidth
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomButton variant="contained" size="large" fullWidth onClick={handleResetPassword}>
                      Reset Password
                    </CustomButton>
                    {password && !passwordVerified && (
                      <p style={{ color: 'red', marginTop: '10px' }}>Password must contain at least one number, one uppercase letter, one lowercase letter, and one symbol</p>
                    )}
                  </Box>
                </>
            }
          </RightContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default ResetPasswordPage;
