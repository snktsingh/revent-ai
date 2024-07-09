import { theme } from '@/constants/theme';
import { Button } from '@mui/material';
import styled from 'styled-components';

export const ButtonName = styled.p`
  color: ${theme.colorSchemes.light.palette.common.white};
  display: flex;
  align-items: center;
  font-size: 1.8vh;
`;
export const MainIconButton = styled(Button)`
  background-color: transparent !important;
  transition: background-color 0.5s !important;
  &:hover {
    background-color: ${theme.colorSchemes.light.palette.common
      .buttonHover} !important;
  }
`;
