import SvgViewer from '@/components/canvasSvgViewer';
import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { ListSlideCard, SingleSliderContainer } from '../style';
import useSlideList from './container';
import { SlideContainer } from './style';
import Draggable from 'react-draggable';
import { CanvasItem } from '@/interface/storeTypes';
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

  const handleDragStop = (e, data, index, canvas) => {
    const newIndex = Math.round(data.y / data.node.clientHeight);
    if (newIndex >= 0 && newIndex < canvasList.length && newIndex !== index) {
      handleDrop(null, newIndex, canvas);
    }
  };

  return (
    <SlideContainer>
      {canvasList.map((canvas, index) => {
        return (
          <Draggable
          axis="y"
          bounds="parent"
          onStop={(e, data) => handleDragStop(e, data, index, canvas)}
          key={canvas.id}
          >
            <div key={canvas.id}>
              <SingleSliderContainer
                onClick={() => handleSlideCardClick(canvas)}
                // draggable
                // onDragStart={e => handleDragStart(e, index, canvas)}
                // onDragOver={handleDragOver}
                // onDrop={e => handleDrop(e, index, canvas)}
                isDragging={canvas.id === activeCanvasID}
              >
                <Stack direction="row" spacing={1}>
                  <p>{index + 1}</p>
                  <ListSlideCard
                    className={activeCanvasID == canvas.id ? 'clicked-card' : ''}
                  >
                    <SvgViewer svgContent={svgURLs[index]} />
                  </ListSlideCard>
                </Stack>
              </SingleSliderContainer>
              <br />
            </div>
          </Draggable>
        );
      })}
      <br />
    </SlideContainer>
  );
}
