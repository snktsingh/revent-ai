import { theme } from "@/constants/theme";
import { Grid, TextField } from "@mui/material";
import styled from "styled-components";

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

export const Title = styled.h1`
  font-size: 40px;
  text-align: center;
  margin: 0px;
  width: 35vw;
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

  img{
    margin: 0px;
  }
`;
export const TextInput = styled(TextField)`
  margin: 3% 0% !important;
`;
export const SubTitle = styled.span`
  font-size: 14px;
  text-align: center;
  width: 25vw;
  color: #696969;
`;