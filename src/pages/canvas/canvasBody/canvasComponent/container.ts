import {
  CYCLE_ARROW,
  CYCLE_CIRCLE,
  CYCLE_TEXT,
  FUNNEL_TEXT,
  LIST_TEXT,
  PROCESS_ARROW,
  PROCESS_BOX,
  PROCESS_TEXT,
  PYRAMID_TEXT,
  QUOTE,
  QUOTE_AUTHOR,
  QUOTE_IMG,
  QUOTE_TEXT,
  TABLE,
  TABLE_HEADER,
  TABLE_TEXT,
  TIMELINE_CIRCLE,
  TIMELINE_DIRECTION,
  TIMELINE_HEADING,
  TIMELINE_TEXT,
} from '@/constants/elementNames';
import { theme } from '@/constants/theme';
import { IExtendedTextBoxOptions } from '@/interface/fabricTypes';
import { updateCanvasInList } from '@/redux/reducers/canvas';
import {
  toggleRegenerateButton,
  toggleSelectingSlide,
} from '@/redux/reducers/slide';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fabric } from 'fabric';
import { useRef, useState } from 'react';
import {
  useCanvasClickEvent,
  useObjectMovingEvent,
  useSelectionCreatedEvent,
  useTextEvents,
  useObjectModified,
  useObjectScalingEvent,
} from '../events/eventExports';
import { useBulletOrNumberedText } from '../elements/BulletOrNumberElement';
import useCanvasData from './canvasDataExtractor';

export const useCanvasComponent = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedElementPosition, setSelectedElementPosition] = useState({
    top: 0,
    left: 0,
  });

  // const { handleAddCustomIcon } = useCustomSelectionIcons();
  // const { CustomBorderIcons } = useDelAndCopy();
  const { renderBulletOrNumTextLine } = useBulletOrNumberedText();
  const { handleObjectMoving } = useObjectMovingEvent();
  const { handleObjectScaling } = useObjectScalingEvent();
  const { handleSelectionCreated } = useSelectionCreatedEvent();
  const { textExitedEvent, textEnteringEvent, removePlaceholderText } =
    useTextEvents();
  const { setElementPositionsAfterMoving } = useObjectModified();
  const { CanvasClick } = useCanvasClickEvent();
  const { getElementsData } = useCanvasData();
  const { jsonData, themeCode, themeId } = useAppSelector(
    state => state.slideTheme
  );

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
      
      setShowOptions(true);
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
      elementName.startsWith(TABLE_TEXT) ||
      elementName.startsWith(TABLE_HEADER) || 
      elementName.startsWith(QUOTE_AUTHOR) ||
      elementName.startsWith(QUOTE_TEXT) ||
      elementName.startsWith(LIST_TEXT) 
    ) {
      return true;
    }
    return false;
  }

  const canvasClickEvent = () => {
    dispatch(toggleSelectingSlide(false));
  };

 
  const handleKeyDown = (e: KeyboardEvent, canvas: fabric.Canvas) => {
    if (e.key === 'Delete' && canvas.getActiveObject()) {
      canvas.remove(canvas.getActiveObject()!);
      const groupObjects = (
        canvas.getActiveObject() as fabric.Group
      )?.getObjects();

      groupObjects.forEach((obj: any) => {
        canvas.remove(obj);
      });

      canvas.discardActiveObject();
      canvas.renderAll();
    }
  };

  const handleWindowResize = (container: any) => {
    if (container) {
      const aspectRatio = 16 / 9;
      const canvasWidthPercentage = 58;
      const canvasHeightPercentage = 58 / aspectRatio;

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const canvasWidth = (canvasWidthPercentage / 100) * windowWidth;
      const canvasHeight = (canvasHeightPercentage / 100) * windowHeight;

      const { top, left } = selectedElementPosition;
      const rect = container.getBoundingClientRect();
      const scaleFactorX = rect.width / canvasWidth;
      const scaleFactorY = rect.height / canvasHeight;
      setSelectedElementPosition({
        top: top * scaleFactorY,
        left: left * scaleFactorX,
      });
    }
  };

  const updateCanvasStyle = (canvas: fabric.Canvas) => {
    canvas.setBackgroundColor(
      `${theme.colorSchemes.light.palette.common.white}`,
      canvas.renderAll.bind(canvas)
    );

    canvas.enableRetinaScaling = true;
    canvas.selectionColor = 'transparent';
    canvas.selectionBorderColor =
      theme.colorSchemes.light.palette.common.steelBlue;
    canvas.selectionLineWidth = 0.5;
  }


  const forEachCanvasObject = (canvas: fabric.Canvas) => {
    canvas.forEachObject(obj => {
      if (obj && (obj as IExtendedTextBoxOptions)?.listType === 'bullet') {
        (obj as IExtendedTextBoxOptions)._renderTextLine =
          renderBulletOrNumTextLine;
      }
    });
  };


  const handleClickOutsideCanvas = (event: MouseEvent, canvas : fabric.Canvas) => {
    if (
      canvas &&
      canvas.getActiveObject() &&
      !isClickWithinCanvas(event, canvas)
    ) {
      canvas.discardActiveObject().renderAll();
    }
  };

  const isClickWithinCanvas = (event: MouseEvent, canvas: fabric.Canvas) => {
    const canvasBoundary = canvas.getElement().getBoundingClientRect();
    const clickX = event.clientX;
    const clickY = event.clientY;
    return (
      clickX >= canvasBoundary.left &&
      clickX <= canvasBoundary.right &&
      clickY >= canvasBoundary.top &&
      clickY <= canvasBoundary.bottom
    );
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
    handleKeyDown,
    handleWindowResize,
    forEachCanvasObject,
    updateCanvasStyle
  };
};
