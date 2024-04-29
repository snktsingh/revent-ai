import { theme } from '@/constants/theme';
import styled from 'styled-components';

export const SlideContainer = styled.div`
  background-color: ${theme.colorSchemes.light.palette.common.white};
  height: 85vh;
  border-right: 1px solid ${theme.colorSchemes.light.palette.common.border};
  padding: 6%;
  overflow-y: scroll;
`;