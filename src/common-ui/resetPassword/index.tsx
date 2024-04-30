import { Box, Grid } from '@mui/material'
import React from 'react'
import { Slide, ToastContainer } from 'react-toastify'
import { ChildContainer, Description, LeftContainer, RightContainer, TextInput, Title } from './style'
import { CustomButton } from '@/styles/common-styles/style'
import { Logo } from '@/constants/media'

const ResetPasswordPage = () => {
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
            {/* <img src={LoginImage} width="90%" /> */}
          </ChildContainer>
        </LeftContainer>
        <Grid xs={6}>
          <RightContainer>
          <img src={Logo} width="30%" />
            <br />
            <br />
            <h1>Reset Password</h1>
            {/* <SubTitle>Sign in to your account</SubTitle> */}
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
                type="email"
                name="email"
                label="Enter your Email"
                variant="outlined"
                fullWidth
              />
              <CustomButton
                variant="contained"
                size="large"
                fullWidth
              >
                Login
              </CustomButton>
            </Box>
          </RightContainer>
        </Grid>
      </Grid>
    </div>
  )
}

export default ResetPasswordPage