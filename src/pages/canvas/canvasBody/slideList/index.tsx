import SvgViewer from '@/components/canvasSvgViewer';
import { Paper, Skeleton, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { ListSlideCard, SingleSliderContainer } from '../style';
import useSlideList from './container';
import { Dot, LoaderContainer, SlideContainer } from './style';
import { DndContext, closestCorners } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CanvasItem } from '@/interface/storeTypes';
import { CSS } from '@dnd-kit/utilities';
import {
  setActiveSlideId,
  setVariantImageAsMain,
  updateCanvasList,
} from '@/redux/reducers/canvas';
import { useAppSelector } from '@/redux/store';
import { setEditPptIndex } from '@/redux/thunk/thunk';
import { useSearchParams } from 'react-router-dom';
interface SingleSlideComponentProps extends CanvasItem {
  index: number;
}

export default function SlideList() {
  const {
    handleKeyDown,
    svgURLs,
    canvasList,
    activeSlideID,
    handleSlideCardClick,
    loadSvgs,
    handleDragStart,
    handleDragOver,
    handleDrop,
    dispatch,
    canvasJS
  } = useSlideList();

  const { pptDetails, isLoading } = useAppSelector(state => state.thunk);

  useEffect(() => {
    dispatch(setActiveSlideId(1));
  } , [])
  

  useEffect(() => {
    loadSvgs();
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [canvasList]);

  const getSlideId = (id: number) =>
    canvasList.findIndex(slide => slide.id === id);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id === over.id) return;

    const updateCanvasListArray = () => {
      const originalPos = getSlideId(active.id);
      const newPos = getSlideId(over.id);
      return arrayMove(canvasList, originalPos, newPos);
    };

    dispatch(updateCanvasList(updateCanvasListArray()));
  };

  const SingleSlideComponent: React.FC<SingleSlideComponentProps> = ({
    index,
    ...props
  }) => {
    const canvas = props;

    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: canvas.id });

    const styles = {
      transition,
      transform: CSS.Transform.toString(transform),
    };

    

    return (
      <>
        {
          !svgURLs[index] ?
            <SingleSliderContainer>
              <ListSlideCard>
                  <LoaderContainer>
                    <Dot />
                    <Dot />
                    <Dot />
                    <Dot />
                    <Dot />
                  </LoaderContainer>
              </ListSlideCard>
            </SingleSliderContainer>
            :
            <div
              ref={setNodeRef}
              {...attributes}
              onPointerDown={event => {
                {!isLoading && handleSlideCardClick(canvas)};
                if (listeners?.onPointerDown) {
                  listeners.onPointerDown(event);
                }
              }}
              onKeyDown={event => {
                if (listeners?.onKeyDown) {
                  listeners.onKeyDown(event);
                }
              }}
              style={styles}
            >
              <SingleSliderContainer>
                <Stack direction="row" spacing={1}>
                  <p>{index + 1}</p>
                  <ListSlideCard
                    className={activeSlideID == canvas.id ? 'clicked-card' : ''}
                  >
                    <SvgViewer svgContent={svgURLs[index]} />
                  </ListSlideCard>
                </Stack>
              </SingleSliderContainer>
              <br />
            </div>
        }
      </>
    );
  };


  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
      <SlideContainer>
        <SortableContext
          items={canvasList}
          strategy={verticalListSortingStrategy}
        >
          {canvasList.map((canvas, index) => {
            return (
              <SingleSlideComponent key={index} {...canvas} index={index} />
            );
          })}
        </SortableContext>
        <br />
      </SlideContainer>
    </DndContext>
  );
}
