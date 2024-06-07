import { theme } from '@/constants/theme';
import { Card, Grid, Link, TextField } from '@mui/material';
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
  padding: 4% 2% 4% 4%;
`;
export const Title = styled.p`
  color: ${theme.colorSchemes.light.palette.primary.main};
  font-size: 20px;
`;
export const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 2.5%;
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
  width: 190px;
  height: 115px;
  margin-bottom: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export const CardTitle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  grid-auto-rows: auto;
  margin-bottom: 20px;
  gap: 2%;
  padding-right: 10px;
  padding-left: 5px;
  padding-top: 2px;
`;
export const CardLink = styled(Link)`
  text-decoration: none !important;
`;
export const CustomAccordion = styled(Accordion)`
  .css-56gxwb-MuiPaper-root-MuiAccordion-root {
    background-color: transparent;
  }
`;
export const Loader = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 8%;
`;
export const LoaderText = styled.p`
  font-size: 16px;
  background: linear-gradient(45deg, blue, red);
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;
export const BlankImageCard = styled(Card)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PPTCard = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const ThumbnailCard = styled(Card)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 0.2rem;
  /* box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px; */
`;

export const TitleCard = styled.div`
  width: 100%;
  padding-left: 2px;
`;

export const PPTTitle = styled.p`
  max-width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${theme.colorSchemes.light.palette.primary.main};
`;

export const NewPPTCard = styled.div`
  display: flex;
  flex-direction: column;
  
`;