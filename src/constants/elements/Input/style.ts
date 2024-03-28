import { theme } from '@/constants/theme';
import { TextField } from '@mui/material';
import styled from 'styled-components';

export const CanvasHeaderInput = styled.input`
  border: none;
  font-family: 'Roboto', sans-serif;
  color: ${theme.colorSchemes.light.palette.common.white} !important;
  font-size: 16px;
  padding: 8px 12px;
  background: none;
  &:hover {
    background: none;
    outline: none;
  }
  &:focus {
    background: none;
    border: 0px solid none;
    outline: none;
  }

  &::placeholder {
    color: ${theme.colorSchemes.light.palette.common.white};
  }
`;
