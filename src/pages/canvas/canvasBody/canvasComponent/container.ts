import {
  CYCLE_ARROW,
  CYCLE_CIRCLE,
  CYCLE_TEXT,
  FUNNEL_TEXT,
  HUB_AND_SPOKE_BOX,
  HUB_AND_SPOKE_BOX_HEADING,
  HUB_AND_SPOKE_BOX_TEXT,
  HUB_AND_SPOKE_CIRCLE,
  HUB_AND_SPOKE_MAIN_TEXT,
  HUB_AND_SPOKE_TEXT_BOX,
  IMAGE,
  LIST_TEXT,
  PROCESS_ARROW,
  PROCESS_BOX,
  PROCESS_TEXT,
  PYRAMID_TEXT,
  QUOTE,
  QUOTE_AUTHOR,
  QUOTE_IMG,
  QUOTE_TEXT,
  STATISTICS_BOX,
  STATISTICS_TEXT,
  STATISTICS_TITLE_TEXT,
  SWOT_BOX,
  SWOT_TEXT,
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
import { SWOTIcon } from '@/constants/media';
import { CustomTextbox } from '@/utils/fabric-utils/renderBullet';
import { useDebounce } from '@/hooks/useDebounce';
import { createSlideJSONData } from '@/redux/thunk/thunk';
import { regenerateMode } from '@/data/data';

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
  const { isRegenerating } = useAppSelector(
    state => state.thunk
  );

  const customFabricProperties = [
    'listType',
    'listBullet',
    'listCounter',
    'name',
    'className',
    'level',
  ];
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });
  const dispatch = useAppDispatch();
  const { canvasJS, canvasList, isVariantSelected } = useAppSelector(state => state.canvas);
  const { presentationId } = useAppSelector(state => state.thunk);
  const updateSlideJSONOnDB = useDebounce((pptId : number, slideJSON: any, slideId : number) => {
    if(isRegenerating) {
      return;
    }
    dispatch(
      createSlideJSONData({ pptId, slideId, slideJSON, notes: canvasJS.notes!})
    ).then((res) => {
      console.log('Slide JSON updated successfully',res.payload);
    });
  }, 1500)


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
    const canvasWidthPercentage = 60;
    const canvasHeightPercentage = 60 / aspectRatio;

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
    console.log('hello world')
    const updatedCanvas = canvas?.toObject(customFabricProperties);
    if((updatedCanvas as any).objects.length === 0) {
        return;
    }

    dispatch(updateCanvasInList({ id, updatedCanvas }));
    const hasVariants = (updatedCanvas as any).objects.some(
      (obj: any) => obj.name === 'VariantImage'
    );
    console.log({isRegenerating})
    
    if(presentationId && !hasVariants && !regenerateMode ) {
      console.log('Updating slide JSON on Db', {updatedCanvas})
      updateSlideJSONOnDB(presentationId, updatedCanvas, canvasJS.slideId);
    }
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
      elementName.startsWith(LIST_TEXT) ||
      elementName.startsWith(SWOTIcon) ||
      elementName.startsWith(SWOT_TEXT) ||
      elementName.startsWith(SWOT_BOX) ||
      elementName.startsWith(HUB_AND_SPOKE_BOX) ||
      elementName.startsWith(HUB_AND_SPOKE_BOX_HEADING) ||
      elementName.startsWith(HUB_AND_SPOKE_BOX_TEXT) ||
      elementName.startsWith(HUB_AND_SPOKE_CIRCLE) ||
      elementName.startsWith(HUB_AND_SPOKE_TEXT_BOX) ||
      elementName.startsWith(HUB_AND_SPOKE_MAIN_TEXT) ||
      elementName.startsWith(STATISTICS_BOX) ||
      elementName.startsWith(STATISTICS_TITLE_TEXT) ||
      elementName.startsWith(STATISTICS_TEXT) 
      
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

  const handleBulletIndent = (event: KeyboardEvent, canvas: fabric.Canvas) => {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (!activeObject || !(activeObject instanceof CustomTextbox)) return;

    const text = activeObject as CustomTextbox;
    if (event.key === 'Enter') {
      text.insertNewline();
      event.preventDefault();
    } else if (event.key === 'Tab') {
      text.insertIndent();
      event.preventDefault();
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
  };

  const forEachCanvasObject = (canvas: fabric.Canvas) => {
    canvas.forEachObject(obj => {
      if (obj && (obj as IExtendedTextBoxOptions)?.listType === 'bullet') {
        (obj as IExtendedTextBoxOptions)._renderTextLine =
          renderBulletOrNumTextLine;
      } else if (obj.name && obj.name == 'VariantImage') {
        const canvasWidth = canvas?.width || 0;
        const canvasHeight = canvas?.height || 0;
        const scaleWidth = canvasWidth / obj.width!;
        const scaleHeight = canvasHeight / obj.height!;
        const scale = Math.max(scaleWidth, scaleHeight);

        obj.set({
          left: 0,
          top: 0,
          scaleX: scale,
          scaleY: scale,
          selectable: false,
          lockMovementX: true,
          lockScalingY: true,
          moveCursor: 'pointer',
          name: 'VariantImage',
        });
      }
    });
  };

  const handleClickOutsideCanvas = (
    event: MouseEvent,
    canvas: fabric.Canvas
  ) => {
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
    updateCanvasStyle,
    handleBulletIndent,
  };
};
