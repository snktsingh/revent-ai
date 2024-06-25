import { customStyles } from '@/constants/theme';
import styled from 'styled-components';

export const FeedbackContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1200;
  font-family: ${customStyles.fonts.robotoSansSerif};
  font-weight: bold;
`;
