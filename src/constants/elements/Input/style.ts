import { theme } from '@/constants/theme';
import { TextField } from '@mui/material';
import styled from 'styled-components';

export const CanvasHeaderInput = styled.input`
  border: none;
  font-family: 'Roboto', sans-serif;
  color: ${theme.colorSchemes.light.palette.common.white};
  font-size: 16px;
  padding: 8px 12px;
  background: none;
  &:focus {
    background: none;
    border: 1px solid white;
    outline: none;
    border-radius: 5px;
  }
`;
