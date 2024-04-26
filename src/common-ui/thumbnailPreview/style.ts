import { theme } from '@/constants/theme';
import { Card, Typography } from '@mui/material';
import styled from 'styled-components';

export const ErrorPreviewCard = styled(Card)`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${theme.colorSchemes.light.palette.common.gray};
    padding: 9% 0;
  }
`;

export const ErrorText = styled(Typography)`
  && {
    font-size: 0.7rem;
    font-size: 'Roboto';
    font-weight: 500;
    color: ${theme.colorSchemes.light.palette.common.white};
  }
`;
