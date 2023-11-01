import styled from 'styled-components';
import { Grid, TextField } from '@mui/material';
import { theme } from '@/constants/theme';
export const LeftContainer = styled(Grid)`
  background-color: #f3f8ff;
  padding: 10%;
  height: 100vh;
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export const ImageContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const Image2Container = styled.span`
  display: flex;
  rotate: 180deg;
  justify-content: flex-end;
`;
export const Title = styled.h1`
  font-size: 40px;
  text-align: center;
  margin: 0px;
  line-height: 1.3;
  color: ${theme.colorSchemes.light.palette.primary.main};
`;
export const Description = styled.p`
  font-size: 16px;
  text-align: center;
  color: ${theme.colorSchemes.light.palette.primary.main};
`;
export const ChildContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15%;
`;
export const SubTitle = styled.span`
  font-size: 18px;
  color: #696969;
`;
export const TextInput = styled(TextField)`
  margin: 3% 0% !important;
`;
export const SignUp = styled.span`
  text-decoration: none;
  cursor: pointer;
  margin: 10% 0%;
  color: #004fba;
  display: flex;
  justify-content: center;
  font-size: 110%;
`;
