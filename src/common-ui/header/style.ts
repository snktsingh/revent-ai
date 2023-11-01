import { theme } from '@/constants/theme';
import { Grid, Link } from '@mui/material';
import styled from 'styled-components';

export const HeaderContainer = styled.div`
  position: fixed;
  width: 100%;
  background-color: ${theme.colorSchemes.light.palette.common.white};
  height: 10vh;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  z-index: 999;
`;
export const GridContainer = styled(Grid)`
  margin: 0px !important;
  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;
