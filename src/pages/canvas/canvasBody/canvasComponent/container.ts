import { Subtitle } from './../../../dashboard/style';
import {
  BULLET_POINTS,
  CONCLUSION_SLIDE_SUBTITLE,
  CONCLUSION_SLIDE_TITLE,
  COVER_SLIDE_SUBTITLE,
  COVER_SLIDE_TITLE,
  CYCLE_ARROW,
  CYCLE_CIRCLE,
  CYCLE_TEXT,
  FUNNEL_TEXT,
  PARAGRAPH,
  PROCESS_ARROW,
  PROCESS_BOX,
  PROCESS_TEXT,
  PYRAMID_TEXT,
  SECTION_SLIDE_SUBTITLE,
  SECTION_SLIDE_TITLE,
  SUBTITLE,
  TABLE,
  TABLE_HEADER,
  TABLE_TEXT,
  TIMELINE_CIRCLE,
  TIMELINE_DIRECTION,
  TIMELINE_HEADING,
  TIMELINE_TEXT,
  TITLE,
} from '@/constants/elementNames';
import {
  BulletPointsFunctionType,
  TimelineDataType,
} from '@/interface/elDataTypes';
import {
  APIRequest,
  DataRequestType,
  ElementBaseType,
  TableDataType,
} from '@/interface/storeTypes';
import { setRequestData } from '@/redux/reducers/apiData';
import { setCanvas, updateCanvasInList } from '@/redux/reducers/canvas';
import { toggleSelectingSlide } from '@/redux/reducers/slide';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fabric } from 'fabric';
import { head } from 'lodash';
import { useState } from 'react';

export const useCanvasComponent = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedElementPosition, setSelectedElementPosition] = useState({
    top: 0,
    left: 0,
  });

  const customFabricProperties = [
    'listType',
    'listBullet',
    'listCounter',
    'name',
    'className',
  ];
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });
  const dispatch = useAppDispatch();
  const { canvasJS } = useAppSelector(state => state.canvas);
  const { presentationId } = useAppSelector(state => state.thunk);
  const handleAllElements = (event: fabric.IEvent, canvas: fabric.Canvas) => {
    const { target } = event;

    if (!canvas || !target) return;

    // Define canvas boundaries
    const canvasWidth = canvas.width || 0;
    const canvasHeight = canvas.height || 0;

    // Prevent objects from going beyond the canvas boundaries
    target.setCoords();
    if (target.left! < 0) {
      target.left! = 0;
    } else if (target.left! + target.width! > canvasWidth) {
      target.left! = canvasWidth - target.width!;
    }

    if (target.top! < 0) {
      target.top! = 0;
    } else if (target.top! + target.height! > canvasHeight) {
      target.top! = canvasHeight - target.height!;
    }
  };

  const updateCanvasDimensions = (canvas: fabric.Canvas) => {
    const aspectRatio = 16 / 9;
    const canvasWidthPercentage = 58;
    const canvasHeightPercentage = 58 / aspectRatio;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerWidth;

    const canvasWidth = (canvasWidthPercentage / 100) * windowWidth;
    const canvasHeight = (canvasHeightPercentage / 100) * windowHeight;

    setCanvasDimensions({ width: canvasWidth, height: canvasHeight });

    if (canvas) {
      canvas.setDimensions({
        width: canvasWidth,
        height: canvasHeight,
      });
      canvas.renderAll();
    }
  };

  const updateCanvasSlideData = (canvas: fabric.Canvas, id: number) => {
    const updatedCanvas = canvas?.toObject(customFabricProperties);
    dispatch(updateCanvasInList({ id, updatedCanvas }));
  };

  

  const handleElementBarSelection = (event: fabric.IEvent) => {
    if (event.selected && event.selected.length > 0) {
      const selectedObject = event.selected[0];
      if (
        selectedObject &&
        selectedObject.name &&
        checkElementsForEditBar(selectedObject.name)
      ) {
        setShowOptions(false);
        return;
      }

      const boundingRect = selectedObject.getBoundingRect();
      const { left, top, width, height } = boundingRect;

      let positionTop = top - 35;
      let positionLeft = left + (width - 140) / 2;

      if (
        selectedObject &&
        selectedObject.name &&
        selectedObject.name.startsWith(TABLE)
      ) {
        positionTop = top - 35;
        positionLeft = left + (width - 275) / 2;

        const updateTablePosition = () => {
          const boundingRect = selectedObject.getBoundingRect();
          const { left, top, width, height } = boundingRect;
          const newPositionTop = top - 35;
          const newPositionLeft = left + (width - 275) / 2;
          setSelectedElementPosition({
            top: newPositionTop,
            left: newPositionLeft,
          });
        };

        selectedObject.on('moving', updateTablePosition);
      } else {
        const updatePosition = () => {
          const boundingRect = selectedObject.getBoundingRect();
          const { left, top, width, height } = boundingRect;
          const newPositionTop = top - 35;
          const newPositionLeft = left + (width - 140) / 2;
          setSelectedElementPosition({
            top: newPositionTop,
            left: newPositionLeft,
          });
        };

        selectedObject.on('moving', updatePosition);
      }

      setSelectedElementPosition({ top: positionTop, left: positionLeft });
      setShowOptions(true);
    }
  };

  function checkElementsForEditBar(elementName: string): boolean {
    if (
      elementName.startsWith(PYRAMID_TEXT) ||
      elementName.startsWith(FUNNEL_TEXT) ||
      elementName.startsWith(PROCESS_TEXT) ||
      elementName.startsWith(PROCESS_ARROW) ||
      elementName.startsWith(PROCESS_BOX) ||
      elementName.startsWith(CYCLE_TEXT) ||
      elementName.startsWith(CYCLE_ARROW) ||
      elementName.startsWith(CYCLE_CIRCLE) ||
      elementName.startsWith(TIMELINE_HEADING) ||
      elementName.startsWith(TIMELINE_TEXT) ||
      elementName.startsWith(TIMELINE_CIRCLE) ||
      elementName.startsWith(TIMELINE_DIRECTION) ||
      elementName.startsWith(TABLE_TEXT)
    ) {
      return true;
    }
    return false;
  }

  const canvasClickEvent = () => {
    dispatch(toggleSelectingSlide(false));
  };

  return {
    handleAllElements,
    updateCanvasDimensions,
    updateCanvasSlideData,
    customFabricProperties,
    handleElementBarSelection,
    showOptions,
    setShowOptions,
    selectedElementPosition,
    setSelectedElementPosition,
    canvasClickEvent,
  };
};
