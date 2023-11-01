import { theme } from '@/constants/theme';
import { Button } from '@mui/material';
import styled from 'styled-components';

export const CustomToolButton = styled(Button)`
  border: 1px solid ${theme.colorSchemes.light.palette.common.border} !important;
  padding: 5px !important;
  border-radius: 5px !important;
`;
export const ToolTitle = styled.p`
  color: ${theme.colorSchemes.light.palette.common.darkGrey};
  display: flex;
  font-weight: 500;
  align-items: center;
  font-size: 0.7rem;
`;
