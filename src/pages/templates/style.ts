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
  width: 14vw;
  height: 15vh;
  margin: 5%;
  cursor: pointer;
`;
export const ThemeCardTitle = styled.span`
  margin-bottom: 40px;
  font-weight: 500;
  margin-right: 20px;
`;
export const ThemeCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
