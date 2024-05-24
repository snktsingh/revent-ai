import styled from 'styled-components';
import { Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const SignUpLeftContainer = styled(Grid)`
  padding: 4%;
  height: 100vh;
`;
export const GoogleButton = styled(Button)`
  padding: 1.5% !important;
  border-radius: 10px !important;
  border: 1px solid #dfdfdf !important;
  color: #2f2f2f !important;
  font-size: 105% !important;
  width: 35% !important;
`;
export const LoginLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  margin: 5% 0%;
  color: #004fba;
  display: flex;
  justify-content: center;
  font-size: 110%;
`;
export const SignupRightContainer = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 72vh;
`;
export const FormContainer = styled.span`
  display: flex;
  justify-content: space-between;
  gap: 15px;
`;
export const PassMessage = styled.span`
  font-size: 10px;
`;
