import { theme } from '@/constants/theme';
import { Box } from '@mui/material';
import styled from 'styled-components';

export const MainToolContainer = styled.div`
  height: 6vh;
  padding: 1.7% 0.4%;
  border-bottom: 1px solid ${theme.colorSchemes.light.palette.common.border};
  display: flex;
  align-items: center;
`;
export const FontTool = styled.span`
  font-size: 25px;
  display: flex;
  align-items: center;
`;
export const ShapesCard = styled.div`
  width: 3vw;
  height: 4.5vh;
  border-radius: 5px;
  margin-left: 1%;
  border: 1px solid #dfdfdf;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  img {
    width: 70%;
    height: 70%;
  }
`;
export const IconsContainer = styled.div`
  margin: auto;
  width: 13vw;
  height: 10vh;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.2%;
  padding: 0% 0 0% 2%;
  margin-top: -5%;
  margin-bottom: -1%;
`;
export const ShapeItem = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;

  img {
    width: 80%;
    height: 80%;
  }
`;

export const ColorMenuContainer = styled.div`
  margin: -1vh 0 0 0.1vw;
  padding: 10px;
  width: 15vw;
  border-radius: 10px;
`;

export const ColorSection = styled.div`
  margin-bottom: 10px;
`;

export const SectionTitle = styled.h2`
  font-size: 0.7rem;
  color: ${theme.colorSchemes.light.palette.common.darkGrey};

  font-family: 'Roboto';
  margin: 0.1rem 0.1rem;
  margin-bottom: 5px;
`;

export const ColorGrid = styled.div`
  display: grid;
  flex-direction: column;
  grid-template-columns: repeat(8, 1fr);
  gap: 5px;
`;

export const ColorItem = styled.div`
  width: 13px;
  height: 13px;
  margin-bottom: 2px;
  border-radius: 2px;
  border: 1px solid ${theme.colorSchemes.light.palette.common.border};
  cursor: pointer;
`;

export const AddColorButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  font-size: 1em;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
`;

export const TransparentButton = styled.button`
  background-color: transparent;
  border: 2px solid #043199;
  color: #043199;
  padding: 8px 16px;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;
  margin: auto;
`;

export const ButtonContainer = styled.div``;
export const AddColorIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #043199;
  color: #fff;
  font-size: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding-left: 10px;
`;

export const ColorDiv = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;

  div {
    width: 40%;
    height: 0.3rem;
    border-radius: 50%;
    margin: auto;
  }
  svg {
    width: 80%;
    margin: auto;
  }
`;
export const BorderColorDiv = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  height: min-content;
  padding-top: 2%;
  div {
    width: 40%;
    height: 0.3rem;
    border-radius: 50%;
    margin: auto;
  }
  svg {
    width: 80%;
    margin: auto;
    margin-top: 4%;
  }
`;
