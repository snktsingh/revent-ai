import React from 'react';
import { fabric } from 'fabric';
import {
  useBulletOrNumberedText,
  useCustomSelectionIcons,
  useDelAndCopy,
  useListElement,
  useQuoteElement,
} from '../elements/elementExports';
import {
  useCanvasClickEvent,
  useObjectModified,
  useObjectMovingEvent,
  useObjectScalingEvent,
  useSelectionCreatedEvent,
  useTextEvents,
} from '../events/eventExports';
import useCanvasData from '../canvasComponent/canvasDataExtractor';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useCanvasComponent } from '../canvasComponent/container';
import { IExtendedTextBoxOptions } from '@/interface/fabricTypes';
import { IEvent } from 'fabric/fabric-impl';
import { toggleRegenerateButton } from '@/redux/reducers/slide';
import { QUOTE_IMG } from '@/constants/elementNames';
import { useCanvasSingleClickEvent } from './canvasSingleClickEvent';
import { toggleIsRegenerating } from '@/redux/thunk/thunk';

const useCanvasEvents = () => {
  const dispatch = useAppDispatch();
  const { themeCode, themeId } = useAppSelector(state => state.slideTheme);
  const { isRegenerating } = useAppSelector(state => state.thunk);
  const { canvasJS, isVariantSelected } = useAppSelector(state => state.canvas);
  
  const { renderBulletOrNumTextLine } = useBulletOrNumberedText();
  const { handleObjectMoving } = useObjectMovingEvent();
  const { handleObjectScaling } = useObjectScalingEvent();
  const { handleSelectionCreated } = useSelectionCreatedEvent();
  const { textExitedEvent, textEnteringEvent, removePlaceholderText } =
    useTextEvents();
  const { setElementPositionsAfterMoving } = useObjectModified();
  const { CanvasClick } = useCanvasClickEvent();
  const { CanvasSingleClick } = useCanvasSingleClickEvent();
  const { getElementsData } = useCanvasData();
  const {
    customFabricProperties,
    updateCanvasSlideData,
    handleElementBarSelection,
  } = useCanvasComponent();
  
  const onTextChangedEvent = (event: IEvent, canvas: fabric.Canvas) => {
    updateCanvasSlideData(canvas, canvasJS.id);
    getElementsData(
      canvas.toObject(customFabricProperties)?.objects,
      themeId
    ).catch(error => {
      console.error('An error occurred:', error);
    });
  };

  const onDoubleClickEvent = (
    event: IEvent<MouseEvent>,
    canvas: fabric.Canvas
  ) => {
    if (event.target) {
      // removePlaceholderText(canvas, event.target)
    }
    CanvasClick(canvas, event);
  };

  const onTextEditingExitedEvent = (event: IEvent, canvas: fabric.Canvas) => {
    textExitedEvent(canvas, event.target as fabric.Text);
    updateCanvasSlideData(canvas, canvasJS.id);
  };

  const onTextEditingEnteredEvent = (event: IEvent, canvas: fabric.Canvas) => {
    if (event.target) {
      // textEnteringEvent(canvas, event.target);
    }
    updateCanvasSlideData(canvas, canvasJS.id);
  };

  const onSelectionCreatedEvent = (
    event: fabric.IEvent<MouseEvent>,
    canvas: fabric.Canvas
  ) => {
    handleSelectionCreated(canvas, event);
  };

  const onObjectAddedEvent = (event: IEvent, canvas: fabric.Canvas) => {
    updateCanvasSlideData(canvas, canvasJS.id);
    const elementsDataPromise = new Promise((resolve, reject) => {
      const elementsData = getElementsData(
        canvas.toObject(customFabricProperties)?.objects,
        themeId
      ).catch(error => {
        console.error('An error occurred:', error);
      });
      resolve(elementsData); 
    });
  
    const elementsData = elementsDataPromise;


    if (canvas.toObject()?.objects && canvas.toObject()?.objects.length >= 1) {
      dispatch(toggleRegenerateButton(false));
    } else {
      dispatch(toggleRegenerateButton(true));
    }
    canvas.renderAll()
  };

  const onObjectRemovedEvent = (event: IEvent, canvas: fabric.Canvas) => {
    console.log({isRegenerating})
    updateCanvasSlideData(canvas, canvasJS.id);
    getElementsData(
      canvas.toObject(customFabricProperties)?.objects,
      themeId
    ).catch(error => {
      console.error('An error occurred:', error);
    });
    if (canvas.toObject()?.objects && canvas.toObject()?.objects.length >= 1) {
      dispatch(toggleRegenerateButton(false));
    } else {
      dispatch(toggleRegenerateButton(true));
    }
  };

  const onObjectModifiedEvent = (event: IEvent, canvas: fabric.Canvas) => {
    if (canvas && event.target) {
      setElementPositionsAfterMoving(event.target, canvas);
    }
    updateCanvasSlideData(canvas, canvasJS.id);
    getElementsData(
      canvas.toObject(customFabricProperties)?.objects,
      themeId
    ).catch(error => {
      console.error('An error occurred:', error);
    });
  };

  const onSelectionClearedEvent = (event: IEvent, canvas: fabric.Canvas) => {
    if(event.deselected){
      textExitedEvent(canvas, event.deselected[0]);
    }
    // updateCanvasSlideData(canvas, canvasJS.id);
    getElementsData(
      canvas.toObject(customFabricProperties)?.objects,
      themeId
    ).catch(error => {
      console.error('An error occurred:', error);
    });
  };

  const onObjectMovingEvent = (
    options: IEvent<MouseEvent>,
    canvas: fabric.Canvas
  ) => {
    handleObjectMoving(options, canvas);
  };

  const onObjectScalingEvent = (
    options: IEvent<MouseEvent>,
    canvas: fabric.Canvas
  ) => {
    handleObjectScaling(options, canvas);
  };

  const onMouseDownEvent = (options: IEvent, canvas: fabric.Canvas) => {
    if(options.target) {
      removePlaceholderText(canvas,options.target);
      CanvasSingleClick(canvas, options);
    }

    const pointer: any = canvas.getPointer(options.e);

    const objectsAtPointer = canvas.getObjects().filter(obj => {
      return obj.containsPoint(pointer);
    });
    
    const textboxFound = objectsAtPointer.some(
      obj => obj.type === 'textbox' || obj.type === 'text'
    );

    const quoteImgQnt = objectsAtPointer.some(
      obj => obj.name?.startsWith(QUOTE_IMG)
    );

    if (textboxFound) {
      const textBox = objectsAtPointer.find(
        obj => obj.type === 'textbox' || obj.type === 'text'
      );
      if (textBox) {
        canvas.setActiveObject(textBox);
      }
      canvas.requestRenderAll();
    }

    if(quoteImgQnt) {
      const imgContainer = objectsAtPointer.find(
        obj => obj.name?.startsWith(QUOTE_IMG)
      );
      if(imgContainer) {
        canvas.setActiveObject(imgContainer)
      }
      canvas.requestRenderAll();
    }

  };

  return {
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
  };
};

export default useCanvasEvents;
