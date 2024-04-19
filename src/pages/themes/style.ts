import { Card } from '@mui/material';
import styled from 'styled-components';

export const TemplateContainer = styled.div`
  padding: 3%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;
export const TemplateTitle = styled.span`
  display: flex;
`;
export const Title = styled.b`
  margin: 3px 15px;
  font-size: 22px;
`;
export const ButtonContainer = styled.span`
  display: flex;
  justify-content: flex-end;
`;
export const ThemeCard = styled(Card)`
  width: 246px;
  height: 140px;
  cursor: pointer;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;
export const ThemeCardTitle = styled.span`
  margin-bottom: 40px;
  font-weight: 500;
  margin-right: 20px;
`;
export const ThemeCardContainer = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
`;
export const ThemeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const AddThemeCard = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
`;