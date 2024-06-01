import ElementEditBar from '@/components/ElementEditBar';
import { theme } from '@/constants/theme';
import { toggleRegenerateButton } from '@/redux/reducers/slide';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fabric } from 'fabric';
import React, { useEffect, useRef } from 'react';
import useCanvasEvents from '../events';
import useCanvasData from './canvasDataExtractor';
import { useCanvasComponent } from './container';
import { useElementFunctions } from './elementFunctions';
import FullscreenCanvas from './fullscreenCanvas';
import { CanvasContainer } from './style';

const CanvasComponent: React.FC = () => {
  const FabricRef = useRef<fabric.Canvas | null>(null);
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const ContainerRef = useRef<HTMLDivElement | null>(null);

  var multiply = fabric.util.multiplyTransformMatrices;
  var invert = fabric.util.invertTransform;

  const {
    updateCanvasDimensions,
    updateCanvasSlideData,
    customFabricProperties,
    handleElementBarSelection,
    showOptions,
    setShowOptions,
    selectedElementPosition,
    canvasClickEvent,
    handleKeyDown,
    handleWindowResize,
    forEachCanvasObject,
    updateCanvasStyle,
  } = useCanvasComponent();

  const ElementFunctions = useElementFunctions(canvasRef.current);

  const { getElementsData } = useCanvasData();
  const {
    onDoubleClickEvent,
    onMouseDownEvent,
    onObjectAddedEvent,
    onObjectModifiedEvent,
    onObjectMovingEvent,
    onObjectRemovedEvent,
    onObjectScalingEvent,
    onSelectionClearedEvent,
    onSelectionCreatedEvent,
    onTextChangedEvent,
    onTextEditingEnteredEvent,
    onTextEditingExitedEvent,
  } = useCanvasEvents();
  const { themeCode, themeId } = useAppSelector(state => state.slideTheme);
  const { isPresentationLoading } = useAppSelector(state => state.element);

  const dispatch = useAppDispatch();

  const {
    canvasJS,
    variantImage,
    selectedOriginalCanvas,
    isVariantSelected,
    canvasList,
    activeSlideID
  } = useAppSelector(state => state.canvas);

  useEffect(() => {

    setShowOptions(false);
    const canvasElement = document.getElementById('canvas');
    if (!canvasElement) {
      console.error('Canvas element not found');
      return;
    }

    const canvas = new fabric.Canvas('canvas', { preserveObjectStacking: true });
    if (!canvas) {
      console.error('Failed to initialize Fabric canvas');
      return;
    }
    updateCanvasDimensions(canvas);
    canvas.clear();
    updateCanvasStyle(canvas);
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
        canvasRef.current = canvas;
        // console.log('Loading canvas JSON data:', canvasJS.canvas);

        if (canvas) {
          updateCanvasStyle(canvas);
          updateCanvasDimensions(canvas);
        }

        if (canvas.toObject(customFabricProperties)?.objects) {
          getElementsData(
            canvas.toObject(customFabricProperties)?.objects,
            themeId
          ).catch(error => {
            console.error('An error occurred:', error);
          });;
        }

        if (
          canvas.toObject(customFabricProperties)?.objects &&
          canvas.toObject(customFabricProperties)?.objects.length >= 1
        ) {
          dispatch(toggleRegenerateButton(false));
        } else {
          dispatch(toggleRegenerateButton(true));
        }




        updateCanvasSlideData(canvas, canvasJS.id);
        forEachCanvasObject(canvas);
        // canvas Events
        canvas.on('selection:created', handleElementBarSelection);
        canvas.on('selection:updated', handleElementBarSelection);

        canvas.on('selection:cleared', () => {
          setShowOptions(false);
        });
        canvas.on('text:changed', options =>
          onTextChangedEvent(options, canvas)
        );
        canvas.on('mouse:dblclick', event => onDoubleClickEvent(event, canvas));
        canvas.on('text:editing:exited', event =>
          onTextEditingExitedEvent(event, canvas)
        );
        canvas.on('text:editing:entered', event =>
          onTextEditingEnteredEvent(event, canvas)
        );
        canvas.on('selection:created', event =>
          onSelectionCreatedEvent(event, canvas)
        );

        canvas.on('object:added', e => onObjectAddedEvent(e, canvas));
        canvas.on('object:removed', e => onObjectRemovedEvent(e, canvas));
        canvas.on('object:modified', e => onObjectModifiedEvent(e, canvas));
        canvas.on('selection:cleared', e => onSelectionClearedEvent(e, canvas));
        canvas.on('object:moving', options =>
          onObjectMovingEvent(options, canvas)
        );
        canvas.on('object:scaling', options =>
          onObjectScalingEvent(options, canvas)
        );
        canvas.on('mouse:down', options => onMouseDownEvent(options, canvas));


        canvas.renderAll();
      },
      (error: Error) => {
        console.error('Error loading canvas:', error);
      }
    );
    window.addEventListener('resize', () => updateCanvasDimensions(canvas));
    window.addEventListener('keydown', e => handleKeyDown(e, canvas));
    return () => {
      window.removeEventListener('keydown', e => handleKeyDown(e, canvas));
      window.removeEventListener('resize', () => { });
      canvas.dispose();
    };
  }, [canvasJS.canvas, selectedOriginalCanvas]);

  useEffect(() => {
    const slide = canvasList.find((slide) => slide.id === activeSlideID);
    setShowOptions(false);

    console.log(canvasRef)
    if (variantImage && canvasRef.current && slide && slide.variants && slide.variants.length > 0) {
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
          name: 'VariantImage',
        });

        canvasRef.current?.add(img);
      });
      canvasRef.current?.renderAll();
    }
  }, [variantImage, isVariantSelected]);

  useEffect(() => { }, [selectedElementPosition, showOptions]);

  return (
    <CanvasContainer onContextMenu={e => e.preventDefault()}>
      <div
        style={{ position: 'relative' }}
        ref={ContainerRef}
        onClick={canvasClickEvent}
      >
        <canvas id="canvas"></canvas>
        {showOptions && (
          <ElementEditBar
            left={selectedElementPosition.left}
            top={selectedElementPosition.top}
            canvas={canvasRef.current}
          />
        )}
      </div>
      <div style={{ position: 'absolute', left: -10000 }}>
        <FullscreenCanvas />
      </div>
    </CanvasContainer>
  );
};

export default CanvasComponent;