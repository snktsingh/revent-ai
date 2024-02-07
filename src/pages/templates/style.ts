import { Card } from '@mui/material';
import styled from 'styled-components';

export const TemplateContainer = styled.div`
  padding: 3%;
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
  margin-bottom: 5%;
  cursor: pointer;
`;
export const ThemeCardTitle = styled.span`
  margin-bottom: 40px;
  font-weight: 500;
`;
export const ThemeCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
