import { theme } from '@/constants/theme';
import styled, { keyframes } from 'styled-components';

export const SlideContainer = styled.div`
  background-color: ${theme.colorSchemes.light.palette.common.white};
  height: 85vh;
  border-right: 1px solid ${theme.colorSchemes.light.palette.common.border};
  padding: 6%;
  overflow-y: scroll;
`;


const pulseAnimation = keyframes`
  0% {
    transform: scale(0.8);
    background-color: #b3d4fc;
    box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
  }
  50% {
    transform: scale(1.2);
    background-color: #6793fb;
    box-shadow: 0 0 0 10px rgba(178, 212, 252, 0);
  }
  100% {
    transform: scale(0.8);
    background-color: #b3d4fc;
    box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
  }
`;

export const LoaderContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 15vh;
  width: 100%;
  background-color: #f7f7f7;
`;

export const Dot = styled.div`
  height: 10px;
  width: 10px;
  margin-right: 10px;
  border-radius: 10px;
  background-color: #b3d4fc;
  animation: ${pulseAnimation} 1.5s infinite ease-in-out;

  &:last-child {
    margin-right: 0;
  }

  &:nth-child(1) {
    animation-delay: -0.3s;
  }

  &:nth-child(2) {
    animation-delay: -0.1s;
  }

  &:nth-child(3) {
    animation-delay: 0.1s;
  }
`;