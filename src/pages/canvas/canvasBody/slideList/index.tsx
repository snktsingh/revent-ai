import SvgViewer from '@/components/canvasSvgViewer';
import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { ListSlideCard, SingleSliderContainer } from '../style';
import useSlideList from './container';
import { SlideContainer } from './style';

export default function SlideList() {

  const {
    handleKeyDown,
    svgURLs,
    canvasList,
    activeCanvasID,
    handleSlideCardClick,
    loadSvgs,
    handleDragStart,
    handleDragOver,
    handleDrop
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
              draggable
              onDragStart={e => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={e => handleDrop(e, index)}
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
