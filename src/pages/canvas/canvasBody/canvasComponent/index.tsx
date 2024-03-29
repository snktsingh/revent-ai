import { theme } from '@/constants/theme';
import { toggleRegenerateButton } from '@/redux/reducers/slide';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fabric } from 'fabric';
import React, { useEffect, useRef, useState } from 'react';
import {
  useBulletOrNumberedText,
  useCustomSelectionIcons,
  useDelAndCopy,
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
import { IExtendedTextBoxOptions } from '@/interface/fabricTypes';
import ConversionToJson from '@/components/pptToJson';
import { setVariantImageAsMain } from '@/redux/reducers/canvas';
import axios from 'axios';
import ElementEditBar from '@/components/ElementEditBar';
import { useObjectScalingEvent } from '../events/objectScalingEvent';
import useObjectModified from '../events/objectModifiedEvent';
import useCanvasData from './canvasDataExtractor';

const CanvasComponent: React.FC = () => {
  const FabricRef = useRef<fabric.Canvas | null>(null);

  
  const {
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
    windowsRemoveEventListeners,
    windowsAddEventListeners,
    canvasRef,
    ContainerRef
  } = useCanvasComponent();

  const ElementFunctions = useElementFunctions(canvasRef.current);

  const { handleAddCustomIcon } = useCustomSelectionIcons();
  const { CustomBorderIcons } = useDelAndCopy();
  const { renderBulletOrNumTextLine } = useBulletOrNumberedText();
  const { handleObjectMoving } = useObjectMovingEvent();
  const { handleObjectScaling } = useObjectScalingEvent();
  const { handleSelectionCreated } = useSelectionCreatedEvent();
  const { textExitedEvent, textEnteringEvent, removePlaceholderText } = useTextEvents();
  const { setElementPositionsAfterMoving } = useObjectModified();
  const { CanvasClick } = useCanvasClickEvent();
  const { getElementsData } = useCanvasData();
  const { jsonData, themeCode, themeName } = useAppSelector(state => state.slideTheme);

  const dispatch = useAppDispatch();

  const { canvasJS, variantImage, selectedOriginalCanvas } = useAppSelector(state => state.canvas);

  const { pptUrl, imageUrl, variants } = useAppSelector(state => state.thunk);


  // useEffect(() => {
  //   setShowOptions(false);
  //   const canvas = new fabric.Canvas('canvas');
  //   canvas.clear();
  //   fabric.Object.prototype.set({
  //     cornerStyle: 'circle',
  //     transparentCorners: false,
  //     cornerSize: 8,
  //     cornerColor: 'white',
  //     borderColor: 'grey',
  //     cornerStrokeColor: 'grey',
  //   });
  //   fabric.Object.prototype.objectCaching = false;
  //   loadCanvasFromJSON(canvas);
  //   windowsAddEventListeners();
  //   return () => {
  //     windowsRemoveEventListeners();
  //     canvas.dispose();
  //   }
  // }, [canvasJS.canvas, selectedOriginalCanvas]);

  useEffect(() => {
    setShowOptions(false);
    const newCanvas = new fabric.Canvas('canvas');
    newCanvas.clear();
    fabric.Object.prototype.set({
      cornerStyle: 'circle',
      transparentCorners: false,
      cornerSize: 8,
      cornerColor: 'white',
      borderColor: 'grey',
      cornerStrokeColor: 'grey',
    });
    fabric.Object.prototype.objectCaching = false;
    newCanvas.loadFromJSON(
      canvasJS.canvas,
      () => {
        updateCanvasDimensions(newCanvas);
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
        getElementsData(
          newCanvas.toObject(customFabricProperties)?.objects,
          themeCode, themeName
        );
        // CustomBorderIcons(newCanvas);

        newCanvas.on('text:changed', function (options) {
          getElementsData(
            newCanvas.toObject(customFabricProperties)?.objects,
            themeCode, themeName
          );
        });

        newCanvas.forEachObject(obj => {
          if (obj) {
            if ((obj as IExtendedTextBoxOptions)?.listType == 'bullet') {
              (obj as IExtendedTextBoxOptions)._renderTextLine =
                renderBulletOrNumTextLine;
            }
          }
        });
        newCanvas.on('mouse:dblclick', event => {
          if (event.target) {
            // removePlaceholderText(canvas, event.target)
          }
          CanvasClick(newCanvas, event);
        });
        newCanvas.on('text:editing:exited', event => {
          textExitedEvent(newCanvas, event.target as fabric.Text);
          updateCanvasSlideData(newCanvas, canvasJS.id);
        });
        newCanvas.on('text:editing:entered', event => {
          if (event.target) {
            textEnteringEvent(canvas, event.target);
          }
          updateCanvasSlideData(newCanvas, canvasJS.id);
        });
        newCanvas.on('selection:created', function (event) {
          handleSelectionCreated(canvas, event);
        });
        window.addEventListener('resize', () =>
          updateCanvasDimensions(newCanvas)
        );
        if (newCanvas.toObject(customFabricProperties)?.objects.length >= 1) {
          dispatch(toggleRegenerateButton(false));
        } else {
          dispatch(toggleRegenerateButton(true));
        }
        newCanvas.on('object:added', e => {
          // console.log(newCanvas.toJSON());
          updateCanvasSlideData(newCanvas, canvasJS.id);
          getElementsData(
            newCanvas.toObject(customFabricProperties)?.objects,
            themeCode, themeName
          );
          // console.log(newCanvas.toObject(customFabricProperties)?.objects);

          if (newCanvas.toObject()?.objects.length >= 1) {
            dispatch(toggleRegenerateButton(false));
          } else {
            dispatch(toggleRegenerateButton(true));
          }
        });
        newCanvas.on('object:removed', e => {
          updateCanvasSlideData(newCanvas, canvasJS.id);
          getElementsData(
            newCanvas.toObject(customFabricProperties)?.objects,
            themeCode, themeName
          );
          if (newCanvas.toObject()?.objects.length >= 1) {
            dispatch(toggleRegenerateButton(false));
          } else {
            dispatch(toggleRegenerateButton(true));
          }
        });

        newCanvas.on('object:modified', e => {
          if (newCanvas && e.target) {
            setElementPositionsAfterMoving(e.target, newCanvas);
          }
          updateCanvasSlideData(newCanvas, canvasJS.id);
          getElementsData(
            newCanvas.toObject(customFabricProperties)?.objects,
            themeCode, themeName
          );
        });

        newCanvas.on('selection:cleared', e => {
          updateCanvasSlideData(newCanvas, canvasJS.id);
          getElementsData(
            newCanvas.toObject(customFabricProperties)?.objects,
            themeCode, themeName
          );
        });
        // newCanvas.on('object:moving', (event: fabric.IEvent) => handleAllElements(event,newCanvas));
        newCanvas.on('object:moving', function (options) {
          // console.log(newCanvas.toJSON());
          handleObjectMoving(options, newCanvas);
        });
        newCanvas.on('object:scaling', function (options) {
          handleObjectScaling(options, newCanvas);
        });
        updateCanvasSlideData(newCanvas, canvasJS.id);
        // handleAddCustomIcon(newCanvas);
        newCanvas.renderAll();
      },
      (error: Error) => {
        console.error('Error loading canvas:', error);
      }
    );

    const canvas = canvasRef.current!;

    canvas.on('mouse:down', function (options) {
      const pointer: any = canvas.getPointer(options.e);

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
    });

    canvas.on('selection:created', handleElementBarSelection);
    canvas.on('selection:updated', handleElementBarSelection);

    // Event listener for mouse out from Fabric.js canvas objects
    canvas.on('selection:cleared', () => {
      setShowOptions(false);
    });

    window.addEventListener('resize', () => {
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
        const scaleFactorX = rect.width / canvasWidth; // Assuming canvas width is 400
        const scaleFactorY = rect.height / canvasHeight; // Assuming canvas height is 400
        setSelectedElementPosition({ top: top * scaleFactorY, left: left * scaleFactorX });
      }
    })

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

    const handleClickOutsideCanvas = (event: MouseEvent) => {
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

    // window.addEventListener('click', handleClickOutsideCanvas);

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // window.removeEventListener('click', handleClickOutsideCanvas);
      window.removeEventListener('resize', () => { });
      newCanvas.dispose();
    };
  }, [canvasJS.canvas, selectedOriginalCanvas]);

  useEffect(() => {
    setShowOptions(false);
    if (variantImage) {
      canvasRef.current?.clear();
      canvasRef.current?.setBackgroundColor(
        `${theme.colorSchemes.light.palette.common.white}`,
        canvasRef.current.renderAll.bind(canvasRef.current)
      );

      fabric.Image.fromURL(variantImage, img => {
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
          selectable: false,
          lockMovementX: true,
          lockScalingY: true,
          moveCursor: 'pointer',
        });
        canvasRef.current?.add(img);
        canvasRef.current?.renderAll();
      });
    }
  }, [variantImage]);



  useEffect(() => {
  }, [selectedElementPosition, showOptions])

  return (
    <CanvasContainer >
      <div style={{ position: 'relative' }} ref={ContainerRef} onClick={canvasClickEvent} >
        <canvas id="canvas"></canvas>
        {showOptions && <ElementEditBar left={selectedElementPosition.left} top={selectedElementPosition.top} canvas={canvasRef.current} />}
      </div>
      <div style={{ position: 'absolute', left: -10000 }}>
        <FullscreenCanvas />
      </div>
    </CanvasContainer>
  );
};

export default CanvasComponent;
