import { theme } from '@/constants/theme';
import { Divider, Grid, Link, Stack, Button } from '@mui/material';
import styled from 'styled-components';

export const PrimaryLink = styled(Link)`
  color: #2f2f2f !important;
  text-decoration: none !important;
  font-size: 16px !important;
  font-weight: 400 !important;
`;
export const GridRowCenter = styled(Grid)`
  display: flex;
  justify-content: center;
  width: 100%;
`;
export const GridColCenter = styled(Grid)`
  display: flex;
  align-items: center;
`;
export const GridJustify = styled(Grid)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const GridRowEven = styled(Grid)`
  display: flex;
  justify-content: space-evenly;
  padding-top: 0px !important;
`;
export const StackColCenter = styled(Stack)`
  display: flex;
  align-items: center;
`;
export const CustomDivider = styled(Divider)`
  margin: 0% 20% !important;
  @media only screen and (max-width: 768px) {
    margin: 0% 10% !important;
  }
`;
export const InfoContainer = styled.div`
  width: 60%;
  @media only screen and (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
export const PrimaryText = styled.span`
  color: ${theme.colorSchemes.light.palette.common.lightGrey};
  font-weight: 700;
`;
export const CommonLink = styled.p`
  text-decoration: none;
  cursor: pointer;
  margin: 5% 0%;
  color: #004fba;
  display: flex;
  justify-content: flex-end;
  font-size: 110%;
`;
export const CustomButton = styled(Button)`
  padding: 12px !important;
  border-radius: 6px !important;
  font-size: 14px !important;
  width: 200px;
`;
export const CustomOutlinedButton = styled(Button)`
  border: 2px solid ${theme.colorSchemes.light.palette.primary.main} !important;
  background-color: ${theme.colorSchemes.light.palette.common.white};
`;
