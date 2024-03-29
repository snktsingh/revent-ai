import { theme } from '@/constants/theme';
import { Card, Link, TextField } from '@mui/material';
import styled from 'styled-components';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from '@mui/material';

export const MainContainer = styled.div`
  background-color: #f3f8ff;
  height: 100vh;
  width: 100vw;
  padding: 4%;
`;
export const Title = styled.p`
  color: ${theme.colorSchemes.light.palette.primary.main};
  font-size: 25px;
`;
export const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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
export const PreviewCard = styled(Card)`
  width: 14vw;
  height: 15vh;
  margin-bottom: 5%;
`;
export const CardTitle = styled.span`
  margin-bottom: 20px;
  cursor: pointer;
`;
export const CardLink = styled(Link)`
  text-decoration: none !important;
`;
export const CustomAccordion = styled(Accordion)`
  .css-56gxwb-MuiPaper-root-MuiAccordion-root {
    background-color: transparent;
  }
`;
