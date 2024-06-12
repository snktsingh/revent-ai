import { useAppSelector } from '@/redux/store';
import useSlideList from './container';
import { useEffect, useRef, useState } from 'react';
import { setActiveSlideId, updateCanvasList } from '@/redux/reducers/canvas';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CanvasItem } from '@/interface/storeTypes';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { SlideContainer } from './style';
import { SingleSlideComponent } from './singleSlideComponent';
import SlidesContextMenu from '@/common-ui/slidesContextMenu';
import { reorderSlidesApi } from '@/redux/thunk/slides';

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
    canvasJS,
  } = useSlideList();
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [currentSlide, setCurrentSlide] = useState<CanvasItem | null>(null);

  const { pptDetails, isLoading } = useAppSelector(state => state.thunk);
  const { userDetails } = useAppSelector(state => state.manageUser);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(setActiveSlideId(1));

    function handleClick(e: any) {
      if (contextMenuRef.current) {
        if (!contextMenuRef.current.contains(e.target)) {
          setContextMenu(null);
        }
      }
    }

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

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
    let reorderArray = updateCanvasListArray();
    const reorderedSlides = reorderArray.map((slide, i) => {
      return {
        slideId: slide.slideId,
        slideNumber: i + 1
      }
    });
    let req = {
      presentationId: reorderArray[0].presentationId,
      slides: reorderedSlides
    }
    dispatch(reorderSlidesApi(req)).then((res) => {
      dispatch(updateCanvasList(updateCanvasListArray()));
    })
  };

  const handleContextMenu = (event: React.MouseEvent, slide: CanvasItem) => {
    setCurrentSlide(slide);
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY });
    // setContextMenu(contextMenu === null ? { x: event.clientX, y: event.clientY } : null);
  };

  const handleClose = () => {
    setContextMenu(null);
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
              <SingleSlideComponent
                key={canvas.id}
                {...canvas}
                index={index}
                svgURLs={svgURLs}
                activeSlideID={activeSlideID}
                isLoading={isLoading}
                handleSlideCardClick={handleSlideCardClick}
                handleContextMenu={handleContextMenu}
              />
            );
          })}
        </SortableContext>
        <br />
        <SlidesContextMenu
          anchorPoint={contextMenu || { x: 0, y: 0 }}
          isOpen={contextMenu !== null}
          onClose={handleClose}
          slide={currentSlide!}
          contextMenuRef={contextMenuRef}
        />
      </SlideContainer>
    </DndContext>
  );
}
