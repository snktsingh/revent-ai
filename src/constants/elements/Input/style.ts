import { theme } from '@/constants/theme';
import { TextField } from '@mui/material';
import styled from 'styled-components';

export const CanvasHeaderInput = styled(TextField)`
  & .MuiInputBase-input {
    color: ${theme.colorSchemes.light.palette.common.white} !important;
    font-size: 2vh !important;
    transition: border 0.5s !important;
    height: 10px;
  }
`;
