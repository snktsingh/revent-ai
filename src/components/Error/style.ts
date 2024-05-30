import { Button, Container } from '@mui/material';
import styled from 'styled-components';

export const StyledContainer = styled.div`
  height: 100vh;
  width: 100%;
  /* display: flex;
  justify-content: center;
  align-items: center; */
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  text-align: center;
  height: fit-content;
  margin: 10% auto 0 auto;

`;

export const ErrorMessage = styled.div`
  margin-bottom: 20px;
`;

export const HomeButton = styled(Button)`
  margin-top: 20px;
`;
