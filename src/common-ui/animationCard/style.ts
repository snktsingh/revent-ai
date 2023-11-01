import { theme } from '@/constants/theme';
import styled from 'styled-components';

export const FlipCard = styled.div`
  background-color: transparent;
  width: 300px;
  height: 300px;
  perspective: 1000px;
  :hover {
    transform: rotateY(180deg);
  }
`;
export const FlipCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;
export const FlipCardFront = styled.div`
  background-color: #bbb;
  color: black;
`;
export const FlipCardBack = styled.div`
  background-color: #2980b9;
  color: white;
  transform: rotateY(180deg);
`;
export const CardTextColor = styled.span`
  font-size: 3.5;
  font-weight: 600;
  color: ${theme.colorSchemes.light.palette.primary.main};
`;
export const CardHeading = styled.span`
  font-size: 2.5rem;
  font-weight: 300;
  @media only screen and (max-width: 768px) {
    font-size: 1.8rem;
  }
`;
