import { setActiveCanvas, setCanvas } from '@/redux/reducers/canvas';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { ListSlideCard, SingleSliderContainer } from '../style';
import { SlideContainer } from './style';
import SvgViewer from '@/components/canvasSvgViewer';
import { useCanvasComponent } from '../canvasComponent/container';
import { toggleSelectingSlide } from '@/redux/reducers/slide';
import useSlideList from './container';

export default function SlideList() {

  const {
    handleKeyDown,
    svgURLs,
    canvasList,
    activeCanvasID,
    handleSlideCardClick,
    loadSvgs
  } = useSlideList();



  useEffect(() => {
    loadSvgs();
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [canvasList]);

  return (
    <SlideContainer>
      {canvasList.map((canvas, index) => {
        return (
          <div key={canvas.id}>
            <SingleSliderContainer
              onClick={() => handleSlideCardClick(canvas)}
            >
              <Stack direction="row" spacing={1}>
                <p>{index + 1}</p>
                <ListSlideCard
                  className={activeCanvasID == canvas.id ? 'clicked-card' : ''}
                >
                  {/* <img
                    src={svgURLs[index] || 'placeholder-for-error'}
                    alt={`canvas-${index}`}
                    style={{
                      width: '100%',
                      objectFit: 'contain',
                      height: '100%',
                    }}
                  /> */}
                  <SvgViewer svgContent={svgURLs[index]} />
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
