import { theme } from '@/constants/theme';
import { ThumbUpAltRounded } from '@mui/icons-material';
import { Button, Card } from '@mui/material';
import styled from 'styled-components';

export const BodyContainer = styled.div`
  background-color: ${theme.colorSchemes.light.palette.common.background};
  height: 85vh;
`;

export const SlideCountContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const SingleSliderContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;
export const EditSlideContainer = styled.div`
  padding: 2% 0% 3% 5%;
`;
export const ListSlideCard = styled(Card)`
  height: fit-content;
  width: 100%;
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
  color: 'grey';
`;
export const LikeButton = styled(ThumbUpAltRounded)``;
