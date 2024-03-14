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
  width: 230px;
  height: 140px;
  cursor: pointer;
  overflow: hidden;
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
