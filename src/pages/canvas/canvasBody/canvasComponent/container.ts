import {
  CYCLE_ARROW,
  CYCLE_CIRCLE,
  CYCLE_TEXT,
  FUNNEL_TEXT,
  PROCESS_ARROW,
  PROCESS_BOX,
  PROCESS_TEXT,
  PYRAMID_TEXT,
  TABLE,
  TABLE_TEXT,
  TIMELINE_CIRCLE,
  TIMELINE_DIRECTION,
  TIMELINE_HEADING,
  TIMELINE_TEXT,
} from '@/constants/elementNames';
import { theme } from '@/constants/theme';
import { IExtendedTextBoxOptions } from '@/interface/fabricTypes';
import { updateCanvasInList } from '@/redux/reducers/canvas';
import { toggleRegenerateButton, toggleSelectingSlide } from '@/redux/reducers/slide';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fabric } from 'fabric';
import { useRef, useState } from 'react';
import {
  useCanvasClickEvent,
  useObjectMovingEvent,
  useSelectionCreatedEvent,
  useTextEvents,
  useObjectModified,
  useObjectScalingEvent
} from '../events/eventExports';
import { useBulletOrNumberedText } from '../elements/BulletOrNumberElement';
import useCanvasData from './canvasDataExtractor';

export const useCanvasComponent = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedElementPosition, setSelectedElementPosition] = useState({
    top: 0,
    left: 0,
  });
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const ContainerRef = useRef<HTMLDivElement | null>(null);

  // const { handleAddCustomIcon } = useCustomSelectionIcons();
  // const { CustomBorderIcons } = useDelAndCopy();
  const { renderBulletOrNumTextLine } = useBulletOrNumberedText();
  const { handleObjectMoving } = useObjectMovingEvent();
  const { handleObjectScaling } = useObjectScalingEvent();
  const { handleSelectionCreated } = useSelectionCreatedEvent();
  const { textExitedEvent, textEnteringEvent, removePlaceholderText } = useTextEvents();
  const { setElementPositionsAfterMoving } = useObjectModified();
  const { CanvasClick } = useCanvasClickEvent();
  const { getElementsData } = useCanvasData();
  const { jsonData, themeCode, themeName } = useAppSelector(state => state.slideTheme);

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

  const loadCanvasFromJSON = (canvas: fabric.Canvas) => {
    canvas.loadFromJSON(
      canvasJS.canvas,
      () => {
        updateCanvasDimensions(canvas);
        addCanvasEventListeners(canvas);
        handleCanvasRenders(canvas);
      },
      (error: Error) => {
        console.error('Error loading canvas:', error);
      }
    );
  };

  const handleCanvasRenders = (canvas : fabric.Canvas) => {
    renderBulletPoints(canvas);
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

  const renderBulletPoints = (canvas : fabric.Canvas) => {
    canvas.forEachObject(obj => {
      if (obj) {
        if ((obj as IExtendedTextBoxOptions)?.listType == 'bullet') {
          (obj as IExtendedTextBoxOptions)._renderTextLine =
            renderBulletOrNumTextLine;
        }
      }
    });
  };

  const addCanvasEventListeners = (canvas: fabric.Canvas) => {
    canvas.on('text:changed', handleTextChangeEvent);
    canvas.on('mouse:dblclick', handleMouseDoubleClickEvent);
    canvas.on('text:editing:exited', handleTextEditingExitedEvent);
    canvas.on('text:editing:entered', handleTextEditingEnteredEvent);
    canvas.on('object:added', handleObjectAddedEvent);
    canvas.on('object:removed', handleObjectRemovedEvent);
    canvas.on('object:modified', handleObjectModifiedEvent);
    canvas.on('object:moving', handleObjectMovingEvent);
    canvas.on('object:scaling', handleObjectScalingEvent);
    canvas.on('selection:created', handleElementBarSelection);
    canvas.on('selection:updated', handleElementBarSelection);
    canvas.on('selection:cleared', () => {
      setShowOptions(false);
    });
    // canvas.on('mouse:down',handleMouseDownEvent);
  };

  const updateCanvasInStore = (canvas: fabric.Canvas) => {
    updateCanvasSlideData(canvas, canvasJS.id);
    getElementsData(
      canvas.toObject(customFabricProperties)?.objects,
      themeCode,
      themeName
    );
  };

  const handleTextChangeEvent = (options: fabric.IEvent) => {
    const canvas = canvasRef.current! as fabric.Canvas;
    updateCanvasInStore(canvas)
  };

  const handleMouseDoubleClickEvent = (event: fabric.IEvent<MouseEvent>) => {
    const canvas = canvasRef.current! as fabric.Canvas;
    CanvasClick(canvas, event);
  };
  
  const handleTextEditingExitedEvent = (event: fabric.IEvent) => {
    const canvas = canvasRef.current! as fabric.Canvas;
    textExitedEvent(canvas, event.target as fabric.Text);
    updateCanvasInStore(canvas)
  };

  const handleTextEditingEnteredEvent = (event: fabric.IEvent) => {
    const canvas = canvasRef.current! as fabric.Canvas;
    if (event.target) {
      textEnteringEvent(canvas, event.target as fabric.Text);
    }
    updateCanvasInStore(canvas)
  };
  
  const handleObjectAddedEvent = (event: fabric.IEvent) => {
    const canvas = canvasRef.current! as fabric.Canvas;
    updateCanvasInStore(canvas);
    checkRegenerateButtonVisibility(canvas);
  };
  
  const handleObjectRemovedEvent = (event: fabric.IEvent) => {
    const canvas = canvasRef.current! as fabric.Canvas;
    updateCanvasInStore(canvas);
    checkRegenerateButtonVisibility(canvas);
  };
  
  const handleObjectModifiedEvent = (event: fabric.IEvent) => {
    const canvas = canvasRef.current! as fabric.Canvas;
    if (canvas && event.target) {
      setElementPositionsAfterMoving(event.target, canvas);
    }
    updateCanvasInStore(canvas);
  };

  const handleObjectMovingEvent = (options: fabric.IEvent<MouseEvent>) => {
    const canvas = canvasRef.current! as fabric.Canvas;
    updateCanvasInStore(canvas)
    handleObjectMoving(options, canvas);
  };

  const handleObjectScalingEvent = (options: fabric.IEvent) => {
    const canvas = canvasRef.current! as fabric.Canvas;
    // handleObjectScaling(options, canvas);
  };

  const handleMouseDownEvent = (event: fabric.IEvent) => {
    const canvas = canvasRef.current! as fabric.Canvas;
    const pointer: any = canvas.getPointer(event.e);

      const objectsAtPointer = canvas.getObjects().filter(obj => {
        return obj.containsPoint(pointer);
      });

      const textboxFound = objectsAtPointer.some(obj => obj.type === 'textbox' || obj.type === 'text');

      if (textboxFound) {
        const textBox = objectsAtPointer.find(obj => obj.type === 'textbox' || obj.type === 'text');
        console.log({ textBox });
        if (textBox) {
          canvas.setActiveObject(textBox);
        }
        canvas.requestRenderAll();
      }
  };



  const checkRegenerateButtonVisibility = (canvas: fabric.Canvas) => {
    if (canvas.toObject(customFabricProperties)?.objects.length >= 1) {
      dispatch(toggleRegenerateButton(false));
    } else {
      dispatch(toggleRegenerateButton(true));
    }
  };


  const windowsAddEventListeners = () => {
    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('keydown', handleKeyDown);
  };

  const windowsRemoveEventListeners = () => {
    window.removeEventListener('resize', handleWindowResize);
    window.removeEventListener('keydown', handleKeyDown);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const canvas = canvasRef.current! as fabric.Canvas;
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

  const handleWindowResize = () => {
    const container = ContainerRef.current;
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
      setSelectedElementPosition({ top: top * scaleFactorY, left: left * scaleFactorX });
    }
  }

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
    loadCanvasFromJSON,
    windowsAddEventListeners,
    windowsRemoveEventListeners,
    canvasRef,
    ContainerRef
  };
};
