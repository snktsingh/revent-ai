import { theme } from '@/constants/theme';
import { Card, TextField } from '@mui/material';
import styled from 'styled-components';

export const MainContainer = styled.div`
  background-color: #f3f8ff;
  height: 100vh;
  padding: 6%;
`;
export const Title = styled.p`
  color: ${theme.colorSchemes.light.palette.primary.main};
  font-size: 25px;
`;
export const CardContainer = styled.div`
  width: 100%;
`;
export const Subtitle = styled.p`
  color: ${theme.colorSchemes.light.palette.primary.main};
  font-size: 16px;
  display: flex;
  justify-content: flex-end;
`;
export const TextInput = styled(TextField)`
  background-color: #fff;
`;
