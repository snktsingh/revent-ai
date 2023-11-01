import { theme } from '@/constants/theme';
import styled from 'styled-components';

export const CanvasContainer = styled.div`
  width: 100%;
  height: 65vh;
  margin-top: 1%;
  canvas {
    border-radius: 5px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 4px 8px;
  }
`;
export const ElementContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ElementTitle = styled.span`
  font-size: 0.8rem;
`;
export const ElementSubtitle = styled.span`
  font-size: 0.6rem;
  font-weight: 300;
  color: ${theme.colorSchemes.light.palette.common.subtitle};
`;
export const SearchInputContainer = styled.div`
  position: relative;
  top: 6vh;
  left: 0;
  z-index: 200;
`;
