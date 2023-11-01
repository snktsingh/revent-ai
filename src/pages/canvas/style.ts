import { theme } from '@/constants/theme';
import { Button, MenuItem, Select } from '@mui/material';
import styled from 'styled-components';

export const ToolOutlinedButton = styled(Button)`
  border: 1px solid ${theme.colorSchemes.light.palette.common.border} !important;
  font-size: 0.7rem !important;
  height: 4.5vh;
  padding: 5px !important;
  color: ${theme.colorSchemes.light.palette.common.lightGrey} !important;
`;

export const ToolOutlinedSelect = styled(Select)`
  height: 4.5vh;
  display: flex;
  font-size: 0.7rem !important;
`;
export const SelectMenuItem = styled(MenuItem)`
  font-size: 0.7rem !important;
`;
