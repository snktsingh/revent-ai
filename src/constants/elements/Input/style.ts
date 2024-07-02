import { customStyles, theme } from '@/constants/theme';
import { TextField } from '@mui/material';
import styled from 'styled-components';

export const CanvasHeaderInput = styled.input`
  border: none;
  font-family: ${customStyles.fonts.robotoSansSerif};
  color: ${theme.colorSchemes.light.palette.primary.main};
  font-size: 16px;
  padding: 8px 12px;
  background: none;
  &:focus {
    background: none;
    border: 1px solid grey;
    outline: none;
    border-radius: 5px;
  }
  &:hover {
    background: none;
    border: 1px solid grey;
    outline: none;
    border-radius: 5px;
  }
  &::selection {
    background-color: white;
    color: ${theme.colorSchemes.light.palette.primary.main};
  }
`;
