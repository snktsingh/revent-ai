import { theme } from '@/constants/theme';
import { ThumbUpAltRounded } from '@mui/icons-material';
import { Button, Card, InputBase } from '@mui/material';
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
  height: 7.22rem;
  width: 100%;
  margin-bottom: 1.8vh;
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
  color: ${theme.colorSchemes.light.palette.common.subtext};
`;
export const ElementSearchInput = styled(InputBase)`
  && {
    padding: 5px 0 5px 20px;
  }
`;
export const LikeButton = styled(ThumbUpAltRounded)``;
