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
  background-color: #000;
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
  /* grid-auto-rows: 5fr; */
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
  padding-top: 18%;
`;
export const LoaderText = styled.p`
  font-size: 16px;
  background: linear-gradient(45deg, blue, red);
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;
export const BlankImageCard = styled.div`
  width: 100%;
  height: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PPTCard = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ThumbnailCard = styled(Card)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;

export const TitleCard = styled.div`
  width: 100%;
  margin: 0px;
  display: flex;
  justify-content: space-between;
`;

export const PPTTitle = styled.p`
  width: 145px;
  margin: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${theme.colorSchemes.light.palette.common.black};
`;

export const NewPPTCard = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardSpan = styled.span`
  position: absolute;
  overflow: hidden;
  width: 90px;
  height: 100px;
  top: 100px;
  left: -4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: 'Beta Access';
    position: absolute;
    width: 150%;
    height: 20px;
    background-image: linear-gradient(
      45deg,
      #004fba 0%,
      #1a79ff 51%,
      #004fba 100%
    );
    transform: rotate(-45deg) translateY(-20px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-size: 0.4rem;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.23);
  }

  &::after {
    content: '';
    position: absolute;
    width: 10px;
    bottom: 0;
    left: 0;
    height: 10px;
    z-index: -1;
    box-shadow: 140px -140px #0060e6;
    background-image: linear-gradient(
      45deg,
      #004fba 0%,
      #1a79ff 51%,
      #004fba 100%
    );
  }
`;
