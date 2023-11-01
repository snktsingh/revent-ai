import React, { useState } from 'react';
import { SlideContainer } from './style';
import { Stack } from '@mui/material';
import { ListSlideCard, SingleSliderContainer } from '../style';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getSlidekey } from '@/redux/reducers/slide';

export default function SlideList() {
  const dispatch = useAppDispatch();
  const slide = useAppSelector(state => state.slide);
  const [isClicked, setIsClicked] = useState<number | null>(0);
  const handleCardClick = (index: number) => {
    setIsClicked(index);
  };

  return (
    <SlideContainer>
      {slide.listOfSlides.map((data, index) => {
        return (
          <div key={index}>
            <SingleSliderContainer
              onClick={() => {
                dispatch(getSlidekey(data.key)), handleCardClick(index);
              }}
            >
              <Stack direction="row" spacing={1}>
                <p>{index + 1}</p>
                <ListSlideCard
                  className={isClicked === index ? 'clicked-card' : ''}
                >
                  {data.name}
                </ListSlideCard>
              </Stack>
            </SingleSliderContainer>
            <br />
          </div>
        );
      })}
      <br />
    </SlideContainer>
  );
}
