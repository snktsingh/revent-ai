import { theme } from '@/constants/theme';
import { toggleRegenerateButton } from '@/redux/reducers/slide';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fabric } from 'fabric';
import React, { useEffect, useRef } from 'react';
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

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const FabricRef = useRef<fabric.Canvas | null>(null);
  const Container = useRef<HTMLDivElement | null>(null);

  const ElementFunctions = useElementFunctions(canvasRef.current);

  const { handleAddCustomIcon } = useCustomSelectionIcons();
  const { CustomBorderIcons } = useDelAndCopy();
  const { renderBulletOrNumTextLine } = useBulletOrNumberedText();
  const { handleObjectMoving } = useObjectMovingEvent();
  const { handleSelectionCreated } = useSelectionCreatedEvent();
  const { textExitedEvent, textEnteringEvent } = useTextEvents();
  const { CanvasClick } = useCanvasClickEvent();
  const { jsonData, themeCode, themeName } = useAppSelector(state => state.slideTheme);
  const {
    updateCanvasDimensions,
    updateCanvasSlideData,
    getElementsData,
    customFabricProperties,
    extractTableData,
  } = useCanvasComponent();

  const dispatch = useAppDispatch();

  const { canvasJS, variantImage, selectedOriginalCanvas } = useAppSelector(state => state.canvas);

  const { pptUrl, imageUrl, variants } = useAppSelector(state => state.thunk);

  // useEffect(() => {
  //   if (canvasRef.current) {
  //     canvasRef.current.clear();
  //     console.log(jsonData);
  //     // canvasRef.current.loadFromJSON(
  //     //   {
  //     //     left: 34.27,
  //     //     top: 2.83,
  //     //     width: 450.15,
  //     //     height: 63.11,
  //     //     borderColor: '#000',
  //     //     borderWidth: 0,
  //     //     borderType: 'solid',
  //     //     borderStrokeDasharray: '0',
  //     //     fillColor: '',
  //     //     isFlipV: false,
  //     //     isFlipH: false,
  //     //     rotate: 0,
  //     //     vAlign: 'up',
  //     //     name: 'TextBox 18',
  //     //     type: 'text',
  //     //     isVertical: false,
  //     //   },
  //     //   () => {
  //     //     canvasRef.current?.renderAll();
  //     //   }
  //     // );
  //   }
  // }, [jsonData]);

  useEffect(() => {
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
        console.log('main canvas loaded');
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
        
        newCanvas.forEachObject(obj => {
          if (obj) {
            if ((obj as IExtendedTextBoxOptions)?.listType == 'bullet') {
              (obj as IExtendedTextBoxOptions)._renderTextLine =
                renderBulletOrNumTextLine;
            }
          }
        });
        newCanvas.on('mouse:up', event => {
          CanvasClick(newCanvas, event);
        });
        newCanvas.on('text:editing:exited', event => {
          textExitedEvent(newCanvas, event.target as fabric.Text);
          updateCanvasSlideData(newCanvas, canvasJS.id);
        });
        newCanvas.on('text:editing:entered', event => {
          textEnteringEvent(newCanvas, event.target as fabric.Text);
          updateCanvasSlideData(newCanvas, canvasJS.id);
        });
        newCanvas.on('selection:created', function (event) {
          handleSelectionCreated(canvas, event);
        });
        updateCanvasDimensions(newCanvas);
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
          updateCanvasSlideData(newCanvas, canvasJS.id);
          getElementsData(
            newCanvas.toObject(customFabricProperties)?.objects,
            themeCode, themeName
          );
          extractTableData(newCanvas);
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
        updateCanvasSlideData(newCanvas, canvasJS.id);
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
      window.removeEventListener('resize', () => {});
      newCanvas.dispose();
    };
  }, [canvasJS.canvas, selectedOriginalCanvas]);

  useEffect(() => {
    console.log('variant image loaded')
    if (variantImage) {
      // Clear the canvas and set its background color to white
      canvasRef.current?.clear();
      canvasRef.current?.setBackgroundColor(
        `${theme.colorSchemes.light.palette.common.white}`,
        canvasRef.current.renderAll.bind(canvasRef.current)
      );
  
      // Load the image and adjust its size to fit the canvas
      fabric.Image.fromURL(variantImage, img => {
        const canvasWidth = canvasRef.current?.width || 0;
        const canvasHeight = canvasRef.current?.height || 0;
        const scaleWidth = canvasWidth / img.width!;
        const scaleHeight = canvasHeight / img.height!;
        const scale = Math.max(scaleWidth, scaleHeight);
  
        // Set image properties and add it to the canvas
        img.set({
          left: 0,
          top: 0,
          scaleX: scale,
          scaleY: scale,
        });
        canvasRef.current?.add(img);
        canvasRef.current?.renderAll();
      });
    }
  }, [variantImage]);

  return (
    <CanvasContainer ref={Container}>
      {/* <ConversionToJson /> */}
      <canvas id="canvas"></canvas>
      <div style={{ position: 'absolute', left: -10000 }}>
        <FullscreenCanvas />
      </div>
    </CanvasContainer>
  );
};

export default CanvasComponent;
