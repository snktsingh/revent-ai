import { theme } from '@/constants/theme';
import { Input, InputBase } from '@mui/material';
import styled from 'styled-components';

export const CanvasHeaderInput = styled(InputBase)`
  color: ${theme.colorSchemes.light.palette.common.white} !important;
  border: 0px;
  font-size: 2vh !important;
  transition: border 0.5s !important;

  &:hover {
    border: 1px solid ${theme.colorSchemes.light.palette.common.white} !important;
    border-radius: 10px;
  }
`;
