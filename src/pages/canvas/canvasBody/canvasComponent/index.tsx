import { theme } from '@/constants/theme';
import {
  updateCanvasInList
} from '@/redux/reducers/canvas';
import { toggleRegenerateButton } from '@/redux/reducers/slide';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fabric } from 'fabric';
import React, { useEffect, useRef } from 'react';
import WebFont from 'webfontloader';
import {
  ContentElements,
  colorChange
} from '../elementData';
import useAllElements from '../elements';
import {
  useCustomSelectionIcons,
  useDelAndCopy
} from '../elements/elementExports';
import {
  useCanvasClickEvent,
  useObjectMovingEvent,
  useSelectionCreatedEvent,
  useTextEvents,
} from '../events/eventExports';
import { useCanvasComponent } from './container';
import { useElementFunctions } from './elementFunctions';
import FullscreenCanvas from './fullscreenCanvas';
import { CanvasContainer } from './style';

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const FabricRef = useRef<fabric.Canvas | null>(null);
  const Container = useRef<HTMLDivElement | null>(null);

  const ElementFunctions = useElementFunctions(canvasRef.current);

  const { handleAddCustomIcon } = useCustomSelectionIcons();
  const { CustomBorderIcons } = useDelAndCopy();

  const { handleObjectMoving } = useObjectMovingEvent();
  const { handleSelectionCreated } = useSelectionCreatedEvent();
  const { textExitedEvent } = useTextEvents();
  const { CanvasClick } = useCanvasClickEvent();

  const { 
    handleAllElements, 
    updateCanvasDimensions,
    updateCanvasSlideData,
    getElementsData,
    customFabricProperties
   } = useCanvasComponent();

  const dispatch = useAppDispatch();
  

  const {
    title,
    subtitle,
    heading,
    paragraph,
    BulletText,
    addQuotes,
    ColorFillForObjects,
    ColorForText,
    ColorForBorder,
    handleBold,
    handleItalic,
    handleUnderLine,
  } = useAllElements();

  const {
    color,
    textColor,
    borderColor,
    canvasJS,
    canvasList,
    size,
    requestData,
    tempData,
    canvasImage,
  } = useAppSelector(state => state.canvas);

  const { pptUrl, imageUrl, variants } = useAppSelector(state => state.thunk);

  const { itemKey } = useAppSelector(state => state.element);

  // useEffect(() => {

  //   for (let i = 0; i < tempData.length; i++) {
  //     if (tempData[i].type === 'textbox' || tempData[i].type === 'i-text') {
  //       if (
  //         itemKey == 1 ||
  //         itemKey == 2 ||
  //         itemKey == 3 ||
  //         itemKey == 4 ||
  //         itemKey == 5
  //       ) {

  //         dispatch(setRequest([...requestData, { text: tempData[i].text }]));
  //       } else if (itemKey == 15) {

  //         dispatch(setShapeName('Pyramid'));
  //         dispatch(setRequest([...requestData, { text: tempData[i].text }]));
  //       } else if (itemKey == 14) {
  //         dispatch(setShapeName('Funnel'));
  //         dispatch(setRequest([...requestData, { text: tempData[i].text }]));
  //       } else if (itemKey == 13) {
  //         dispatch(setShapeName('Timeline'));
  //         dispatch(setRequest([...requestData, { text: tempData[i].text }]));
  //       } else if (itemKey == 12) {
  //         dispatch(setShapeName('Process'));
  //         dispatch(setRequest([...requestData, { text: tempData[i].text }]));
  //       } else if (itemKey == 11) {
  //         dispatch(setShapeName('Cycle'));
  //         dispatch(setRequest([...requestData, { text: tempData[i].text }]));
  //       }

  //     }
  //   }
  // }, [tempData]);

 

 

  useEffect(() => {
    const newCanvas = new fabric.Canvas('canvas');

    newCanvas.clear();
    fabric.Object.prototype.set({
      cornerStyle: 'circle',
      padding: 5,
      transparentCorners: false,
      cornerSize: 10,
    });
    fabric.Object.prototype.objectCaching = false;
    newCanvas.loadFromJSON(
      canvasJS.canvas,
      () => {
        canvasRef.current = newCanvas;
        newCanvas.setBackgroundColor(
          `${theme.colorSchemes.light.palette.common.white}`,
          newCanvas.renderAll.bind(newCanvas)
        );

        newCanvas.enableRetinaScaling = true;
        newCanvas.selectionColor = 'transparent';
        newCanvas.selectionBorderColor =
          theme.colorSchemes.light.palette.common.steelBlue;
        newCanvas.selectionLineWidth = 0.5;

        CustomBorderIcons(newCanvas);

        newCanvas.on('mouse:up', event => {
          CanvasClick(newCanvas, event);
        });

        newCanvas.on('text:editing:exited', event => {
          textExitedEvent(newCanvas, event.target as fabric.Text);
          updateCanvasSlideData(newCanvas, canvasJS.id);
        });

        newCanvas.on('selection:created', function (event) {
          handleSelectionCreated(canvas, event);
        });
        updateCanvasDimensions(newCanvas);

        window.addEventListener('resize', () => updateCanvasDimensions(newCanvas));

        if (newCanvas.toObject(customFabricProperties)?.objects.length > 1) {
          dispatch(toggleRegenerateButton(false));
        } else {
          dispatch(toggleRegenerateButton(true));
        }
        newCanvas.on('object:added', e => {
          updateCanvasSlideData(newCanvas, canvasJS.id);
          getElementsData(newCanvas.toObject(customFabricProperties)?.objects);
          if (newCanvas.toObject()?.objects.length > 1) {
            dispatch(toggleRegenerateButton(false));
          } else {
            dispatch(toggleRegenerateButton(true));
          }
        });

        newCanvas.on('object:removed', e => {
          updateCanvasSlideData(newCanvas, canvasJS.id);
          getElementsData(newCanvas.toObject(customFabricProperties)?.objects);
          if (newCanvas.toObject()?.objects.length > 1) {
            dispatch(toggleRegenerateButton(false));
          } else {
            dispatch(toggleRegenerateButton(true));
          }
        });

        newCanvas.on('object:modified', e => {
          updateCanvasSlideData(newCanvas, canvasJS.id);
          getElementsData(newCanvas.toObject(customFabricProperties)?.objects);
        });

        newCanvas.on('selection:cleared', e => {
          updateCanvasSlideData(newCanvas, canvasJS.id);
          getElementsData(newCanvas.toObject(customFabricProperties)?.objects);
        });
        // newCanvas.on('object:moving', (event: fabric.IEvent) => handleAllElements(event,newCanvas));
        newCanvas.on('object:moving', function (options) {
          handleObjectMoving(options, newCanvas);
        });

        handleAddCustomIcon(newCanvas);
        newCanvas.renderAll();
      },
      (error: Error) => {
        console.error('Error loading canvas:', error);
      }
    );

    const canvas = canvasRef.current!;

    const handleKeyDown = (e: KeyboardEvent) => {
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

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', () => {});
      newCanvas.dispose();
    };
  }, [canvasJS]);

  useEffect(() => {
    canvasRef.current?.clear();
    canvasRef.current?.setBackgroundColor(
      `${theme.colorSchemes.light.palette.common.white}`,
      canvasRef.current.renderAll.bind(canvasRef.current)
    );
    fabric.Image.fromURL(canvasImage || imageUrl, img => {
      const canvasWidth = canvasRef.current?.width || 0;
      const canvasHeight = canvasRef.current?.height || 0;
      const scaleWidth = canvasWidth / img.width!;
      const scaleHeight = canvasHeight / img.height!;
      const scale = Math.max(scaleWidth, scaleHeight);
      img.set({
        left: 0,
        top: 0,
        scaleX: scale,
        scaleY: scale,
      });
      canvasRef.current?.add(img);
      canvasRef.current?.renderAll();
    });
  }, [
    canvasImage,
    imageUrl,
    canvasRef.current?.width,
    canvasRef.current?.height,
  ]);

  ContentElements.handleFontSize = () => {
    const element = canvasRef.current?.getActiveObject();

    if (element?.type == 'text' || element?.type == 'textbox') {
      (element as any).set('fontSize', size);
    }
    canvasRef.current?.renderAll();
    const updatedCanvas = canvasRef.current?.toObject(customFabricProperties);
    const id = canvasJS.id;
    dispatch(updateCanvasInList({ id, updatedCanvas }));
  };

  ContentElements.handleFontFamily = (fontFamily: string) => {
    WebFont.load({
      google: {
        families: [fontFamily],
      },
      active: () => {
        if (canvasRef.current) {
          const element = canvasRef.current?.getActiveObject();
          if (element?.type == 'text' || element?.type == 'textbox') {
            (element as any).set('fontFamily', fontFamily);
          }
          canvasRef.current?.renderAll();
          const updatedCanvas = canvasRef.current?.toObject(customFabricProperties);
          const id = canvasJS.id;
          dispatch(updateCanvasInList({ id, updatedCanvas }));
        }
      },
    });
  };

  

  colorChange.colorFillChange = () => {
    const selectedObject = canvasRef.current?.getActiveObject();
    const canvas = canvasRef.current;
    ColorFillForObjects(selectedObject, canvas, color);
    const updatedCanvas = canvasRef.current?.toObject(customFabricProperties);
    const id = canvasJS.id;
    dispatch(updateCanvasInList({ id, updatedCanvas }));
  };

  colorChange.colorTextChange = () => {
    const selectedObject = canvasRef.current?.getActiveObject();
    const canvas = canvasRef.current;
    ColorForText(selectedObject, canvas, textColor);
    const updatedCanvas = canvasRef.current?.toObject(customFabricProperties);
    const id = canvasJS.id;
    dispatch(updateCanvasInList({ id, updatedCanvas }));
  };

  colorChange.colorBorderChange = () => {
    const selectedObject = canvasRef.current?.getActiveObject();
    const canvas = canvasRef.current;
    ColorForBorder(selectedObject, canvas, borderColor);
    const updatedCanvas = canvasRef.current?.toObject(customFabricProperties);
    const id = canvasJS.id;
    dispatch(updateCanvasInList({ id, updatedCanvas }));
  };

  
  ContentElements.handleBold = () => {
    let activeObj = canvasRef.current?.getActiveObjects() as any;
    const canvas = canvasRef.current;
    handleBold(activeObj, canvas);
  };
  ContentElements.handleItalic = () => {
    let activeObj = canvasRef.current?.getActiveObjects() as any;
    const canvas = canvasRef.current;
    handleItalic(activeObj, canvas);
  };
  ContentElements.handleUnderlIne = () => {
    let activeObj = canvasRef.current?.getActiveObjects() as any;
    const canvas = canvasRef.current;
    handleUnderLine(activeObj, canvas);
  };

 

  return (
    <CanvasContainer ref={Container}>
      <canvas id="canvas"></canvas>
      <div style={{ position: 'absolute', left: -10000 }}>
        <FullscreenCanvas />
      </div>
    </CanvasContainer>
  );
};

export default CanvasComponent;
