import React, { useEffect, useRef, useState } from 'react';
import SvgViewer from '@/components/canvasSvgViewer';
import { Paper, Skeleton, Stack } from '@mui/material';
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
import SlidesContextMenu from '@/common-ui/slidesContextMenu';
import { ListSlideCard, SingleSliderContainer } from '../../style';
import { Dot, LoaderContainer } from '../style';

interface SingleSlideComponentProps extends CanvasItem {
  index: number;
  svgURLs: string[];
  activeSlideID: number;
  isLoading: boolean;
  handleSlideCardClick: (canvas: CanvasItem) => void;
  handleContextMenu: (event: React.MouseEvent, slide: CanvasItem) => void;
}

export const SingleSlideComponent: React.FC<SingleSlideComponentProps> = ({
  index,
  svgURLs,
  activeSlideID,
  isLoading,
  handleSlideCardClick,
  handleContextMenu,
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
              { !isLoading && handleSlideCardClick(canvas) };
              if (listeners?.onPointerDown) {
                listeners.onPointerDown(event);
              }
            }}
            onKeyDown={event => {
              if (listeners?.onKeyDown) {
                listeners.onKeyDown(event);
              }
            }}
            style={{ ...styles }}
          >
            <SingleSliderContainer onContextMenu={(event) => handleContextMenu(event, canvas)}  >
              <Stack direction="row" spacing={1}>
              <p style={{ fontSize: `${0.9 / String(index + 1).length}rem` }}>
                {index + 1}
              </p>

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

