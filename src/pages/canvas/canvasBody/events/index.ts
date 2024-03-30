import React from 'react';
import { fabric } from 'fabric';
import {
    useBulletOrNumberedText,
    useCustomSelectionIcons,
    useDelAndCopy,
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



const useCanvasEvents = () => {
    const dispatch = useAppDispatch();
    const { themeCode, themeName } = useAppSelector(state => state.slideTheme)
    const { canvasJS } = useAppSelector(state => state.canvas)
  const { renderBulletOrNumTextLine } = useBulletOrNumberedText();
  const { handleObjectMoving } = useObjectMovingEvent();
  const { handleObjectScaling } = useObjectScalingEvent();
  const { handleSelectionCreated } = useSelectionCreatedEvent();
  const { textExitedEvent, textEnteringEvent, removePlaceholderText } = useTextEvents();
  const { setElementPositionsAfterMoving } = useObjectModified();
  const { CanvasClick } = useCanvasClickEvent();
  const { getElementsData } = useCanvasData();
  const { customFabricProperties, updateCanvasSlideData, handleElementBarSelection } = useCanvasComponent();

  const onTextChangedEvent = (event: IEvent, canvas: fabric.Canvas) => {
    getElementsData(
      canvas.toObject(customFabricProperties)?.objects,
      themeCode,
      themeName
    );
  };


  const onDoubleClickEvent = (event: IEvent<MouseEvent>, canvas: fabric.Canvas) => {
    if (event.target) {
      // removePlaceholderText(canvas, event.target)
    }
    CanvasClick(canvas, event);
  };

  const onTextEditingExitedEvent = (
    event: IEvent,
    canvas: fabric.Canvas
  ) => {
    textExitedEvent(canvas, event.target as fabric.Text);
    updateCanvasSlideData(canvas, canvasJS.id);
  };

  const onTextEditingEnteredEvent = (
    event: IEvent,
    canvas: fabric.Canvas
  ) => {
    if (event.target) {
      textEnteringEvent(canvas, event.target);
    }
    updateCanvasSlideData(canvas, canvasJS.id);
  };

  const onSelectionCreatedEvent = (
    event: fabric.IEvent<MouseEvent>,
    canvas: fabric.Canvas
  ) => {
    handleSelectionCreated(canvas, event);
  };

  const onObjectAddedEvent = (
    event: IEvent,
    canvas: fabric.Canvas
  ) => {
    updateCanvasSlideData(canvas, canvasJS.id);
    getElementsData(
      canvas.toObject(customFabricProperties)?.objects,
      themeCode,
      themeName
    );
    if (canvas.toObject()?.objects.length >= 1) {
      dispatch(toggleRegenerateButton(false));
    } else {
      dispatch(toggleRegenerateButton(true));
    }
  };

  const onObjectRemovedEvent = (
    event: IEvent,
    canvas: fabric.Canvas
  ) => {
    updateCanvasSlideData(canvas, canvasJS.id);
    getElementsData(
      canvas.toObject(customFabricProperties)?.objects,
      themeCode,
      themeName
    );
    if (canvas.toObject()?.objects.length >= 1) {
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
      themeCode,
      themeName
    );
  };

  const onSelectionClearedEvent = (
    event: IEvent,
    canvas: fabric.Canvas
  ) => {
    updateCanvasSlideData(canvas, canvasJS.id);
    getElementsData(
      canvas.toObject(customFabricProperties)?.objects,
      themeCode,
      themeName
    );
  };

  const onObjectMovingEvent = (options: IEvent<MouseEvent>, canvas: fabric.Canvas) => {
    handleObjectMoving(options, canvas);
  };

  const onObjectScalingEvent = (
    options: IEvent<MouseEvent>,
    canvas: fabric.Canvas
  ) => {
    handleObjectScaling(options, canvas);
  };

  const onMouseDownEvent = (
    options: IEvent,
    canvas: fabric.Canvas,
  ) => {
    const pointer: any = canvas.getPointer(options.e);

    const objectsAtPointer = canvas.getObjects().filter(obj => {
      return obj.containsPoint(pointer);
    });

    const textboxFound = objectsAtPointer.some(
      obj => obj.type === 'textbox' || obj.type === 'text'
    );

    if (textboxFound) {
      const textBox = objectsAtPointer.find(
        obj => obj.type === 'textbox' || obj.type === 'text'
      );
      console.log({ textBox });
      if (textBox) {
        canvas.setActiveObject(textBox);
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
    onTextEditingExitedEvent
  };
};

export default useCanvasEvents;
