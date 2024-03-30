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
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const ContainerRef = useRef<HTMLDivElement | null>(null);

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
    addCanvasEventListeners,
    handleCanvasRenders,
    handleKeyDown,
    handleWindowResize
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

  //   canvas.loadFromJSON(
  //     canvasJS.canvas,
  //     () => {
  //       canvasRef.current = canvas;
  //       updateCanvasDimensions(canvas);

  //       canvas.setBackgroundColor(
  //         `${theme.colorSchemes.light.palette.common.white}`,
  //         canvas.renderAll.bind(canvas)
  //       );

  //       canvas.enableRetinaScaling = true;
  //       canvas.selectionColor = 'transparent';
  //       canvas.selectionBorderColor =
  //         theme.colorSchemes.light.palette.common.steelBlue;
  //       canvas.selectionLineWidth = 0.5;
  //       handleCanvasRenders(canvas);

  //       addCanvasEventListeners(canvas);
  //     },
  //     (error: Error) => {
  //       console.error('Error loading canvas:', error);
  //     }
  //   );

  //   window.addEventListener('keydown', (e) => handleKeyDown(e,canvas));
  //   window.addEventListener('resize', (e) => handleWindowResize(ContainerRef.current));
  //   return () => {
  //     window.removeEventListener('keydown',  (e) => handleKeyDown(e,canvas));
  //     // window.removeEventListener('click', handleClickOutsideCanvas);
  //     window.removeEventListener('resize', () => { });
  //     canvas.dispose();
  //   };
    
  // }, [canvasJS.canvas, selectedOriginalCanvas])

  useEffect(() => {
    setShowOptions(false);
    const canvas = new fabric.Canvas('canvas');
    canvas.clear();
    fabric.Object.prototype.set({
      cornerStyle: 'circle',
      transparentCorners: false,
      cornerSize: 8,
      cornerColor: 'white',
      borderColor: 'grey',
      cornerStrokeColor: 'grey',
    });
    fabric.Object.prototype.objectCaching = false;
    canvas.loadFromJSON(
      canvasJS.canvas,
      () => {
        updateCanvasDimensions(canvas);
        canvasRef.current = canvas;
        canvas.setBackgroundColor(
          `${theme.colorSchemes.light.palette.common.white}`,
          canvas.renderAll.bind(canvas)
        );

        canvas.enableRetinaScaling = true;
        canvas.selectionColor = 'transparent';
        canvas.selectionBorderColor =
          theme.colorSchemes.light.palette.common.steelBlue;
        canvas.selectionLineWidth = 0.5;
        getElementsData(
          canvas.toObject(customFabricProperties)?.objects,
          themeCode, themeName
        );
        // CustomBorderIcons(canvas);

        canvas.on('text:changed', function (options) {
          console.log('thinnava')
          getElementsData(
            canvas.toObject(customFabricProperties)?.objects,
            themeCode, themeName
          );
        });

        canvas.forEachObject(obj => {
          if (obj) {
            if ((obj as IExtendedTextBoxOptions)?.listType == 'bullet') {
              (obj as IExtendedTextBoxOptions)._renderTextLine =
                renderBulletOrNumTextLine;
            }
          }
        });
        canvas.on('mouse:dblclick', event => {
          if (event.target) {
            // removePlaceholderText(canvas, event.target)
          }
          CanvasClick(canvas, event);
        });
        canvas.on('text:editing:exited', event => {
          textExitedEvent(canvas, event.target as fabric.Text);
          updateCanvasSlideData(canvas, canvasJS.id);
        });
        canvas.on('text:editing:entered', event => {
          if (event.target) {
            textEnteringEvent(canvas, event.target);
          }
          updateCanvasSlideData(canvas, canvasJS.id);
        });
        canvas.on('selection:created', function (event) {
          handleSelectionCreated(canvas, event);
        });
        window.addEventListener('resize', () =>
          updateCanvasDimensions(canvas)
        );
        if (canvas.toObject(customFabricProperties)?.objects.length >= 1) {
          dispatch(toggleRegenerateButton(false));
        } else {
          dispatch(toggleRegenerateButton(true));
        }
        canvas.on('object:added', e => {
          // console.log(canvas.toJSON());
          updateCanvasSlideData(canvas, canvasJS.id);
          getElementsData(
            canvas.toObject(customFabricProperties)?.objects,
            themeCode, themeName
          );
          // console.log(canvas.toObject(customFabricProperties)?.objects);

          if (canvas.toObject()?.objects.length >= 1) {
            dispatch(toggleRegenerateButton(false));
          } else {
            dispatch(toggleRegenerateButton(true));
          }
        });
        canvas.on('object:removed', e => {
          updateCanvasSlideData(canvas, canvasJS.id);
          getElementsData(
            canvas.toObject(customFabricProperties)?.objects,
            themeCode, themeName
          );
          if (canvas.toObject()?.objects.length >= 1) {
            dispatch(toggleRegenerateButton(false));
          } else {
            dispatch(toggleRegenerateButton(true));
          }
        });

        canvas.on('object:modified', e => {
          if (canvas && e.target) {
            setElementPositionsAfterMoving(e.target, canvas);
          }
          updateCanvasSlideData(canvas, canvasJS.id);
          getElementsData(
            canvas.toObject(customFabricProperties)?.objects,
            themeCode, themeName
          );
        });

        canvas.on('selection:cleared', e => {
          updateCanvasSlideData(canvas, canvasJS.id);
          getElementsData(
            canvas.toObject(customFabricProperties)?.objects,
            themeCode, themeName
          );
        });
        // canvas.on('object:moving', (event: fabric.IEvent) => handleAllElements(event,canvas));
        canvas.on('object:moving', function (options) {
          // console.log(canvas.toJSON());
          handleObjectMoving(options, canvas);
        });
        canvas.on('object:scaling', function (options) {
          handleObjectScaling(options, canvas);
        });
        updateCanvasSlideData(canvas, canvasJS.id);
        // handleAddCustomIcon(canvas);
        canvas.renderAll();
      },
      (error: Error) => {
        console.error('Error loading canvas:', error);
      }
    );

    // const canvas = canvasRef.current!;

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
      canvas.dispose();
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
