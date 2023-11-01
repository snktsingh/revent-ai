import styled from 'styled-components';
import { Grid } from '@mui/material';

export const FooterContainer = styled.div`
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  padding: 4% 0% 1% 0%;
  @media only screen and (max-width: 768px) {
    padding: 10%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }
`;
export const GridLeft = styled(Grid)`
  text-align: left;
`;
export const CopyRight = styled.span`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  color: #2f2f2f !important;
`;
