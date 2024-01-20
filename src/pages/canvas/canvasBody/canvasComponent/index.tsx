import { Canvas_Arrow } from '@/constants/media';
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
  ShapesData,
  colorChange,
  elementData,
} from '../elementData';
import useAllElements from '../elements';
import {
  useCustomSelectionIcons,
  useCycleElement,
  useDelAndCopy,
  useFunnelElement,
  useImageElement,
  useListElement,
  useProcessElement,
  usePyramidElement,
  useTableElement,
  useTimelineElement,
} from '../elements/elementExports';
import {
  useCanvasClickEvent,
  useObjectMovingEvent,
  useSelectionCreatedEvent,
  useTextEvents,
} from '../events/eventExports';
import useAllShapes from '../shapes';
import { useCanvasComponent } from './container';
import FullscreenCanvas from './fullscreenCanvas';
import { CanvasContainer } from './style';

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const FabricRef = useRef<fabric.Canvas | null>(null);
  const Container = useRef<HTMLDivElement | null>(null);

  
  const { handleAddCustomIcon } = useCustomSelectionIcons();
  const { addTable } = useTableElement();
  const { addProcess } = useProcessElement();
  const { addPyramid } = usePyramidElement();
  const { addFunnel } = useFunnelElement();
  const { addCycle } = useCycleElement();
  const { addTimeline } = useTimelineElement();
  const { addListElement } = useListElement();
  const { imageUploader } = useImageElement();
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
    addRectangle,
    addCircle,
    addTriangle,
    addRightArrow,
    addStar,
    addLine,
    addLeftArrow,
    addHexagon,
    addPolygon,
  } = useAllShapes();

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

  

  // elementData[1].onClick = () => {
  //   canvasRef.current?.add(title);
  //   title.selectAll();
  //   canvasRef.current?.setActiveObject(title);
  //   canvasRef.current?.renderAll();
  // };

  elementData[2].onClick = () => {
    canvasRef.current?.add(subtitle);
    subtitle.selectAll();
    canvasRef.current?.setActiveObject(subtitle);
    canvasRef.current?.renderAll();
  };

  // elementData[3].onClick = () => {
  //   canvasRef.current?.add(heading);
  //   heading.selectAll();
  //   canvasRef.current?.setActiveObject(heading);
  //   canvasRef.current?.renderAll();
  // };

  elementData[3].onClick = () => {
    canvasRef.current?.add(paragraph);
    paragraph.selectAll();
    canvasRef.current?.setActiveObject(paragraph);
    canvasRef.current?.renderAll();
  };

  elementData[4].onClick = () => {
    canvasRef.current?.add(BulletText);
  };

  elementData[5].onClick = () => {
    imageUploader(canvas);
  };
  elementData[7].onClick = () => {
    let text = addQuotes();
    canvasRef.current?.add(text);
    canvasRef.current?.setActiveObject(text);
    text?.enterEditing();
    canvas?.renderAll();
  };
  elementData[8].onClick = () => {
    addListElement(canvas, 33, 23);
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

  ShapesData[0].onClick = () => {
    if (canvasRef.current) {
      canvasRef.current.add(addRectangle);
      canvasRef.current.renderAll();
    }
  };
  ShapesData[1].onClick = () => {
    if (canvasRef.current) {
      fabric.loadSVGFromString(Canvas_Arrow, (objects, options) => {
        const obj = fabric.util.groupSVGElements(objects, options);
        obj.top = 100;
        obj.left = 120;
        canvasRef.current?.add(obj);
        canvasRef.current?.renderAll();
      });
    }
  };

  ShapesData[2].onClick = () => {
    if (canvasRef.current) {
      canvasRef.current.add(addLine);
      canvasRef.current.renderAll();
    }
  };

  ShapesData[3].onClick = () => {
    if (canvasRef.current) {
      canvasRef.current.add(addCircle);
      canvasRef.current.renderAll();
    }
  };

  ShapesData[4].onClick = () => {
    if (canvasRef.current) {
      canvasRef.current.add(addTriangle);
      canvasRef.current.renderAll();
    }
  };
  ShapesData[5].onClick = () => {
    if (canvasRef.current) {
      canvasRef.current.add(addStar);
      canvasRef.current.renderAll();
    }
  };

  ShapesData[6].onClick = () => {
    if (canvasRef.current) {
      canvasRef.current.add(addRightArrow);
      canvasRef.current.renderAll();
    }
  };

  ShapesData[7].onClick = () => {
    if (canvasRef.current) {
      canvasRef.current.add(addLeftArrow);
      canvasRef.current.renderAll();
    }
  };

  ShapesData[8].onClick = () => {
    if (canvasRef.current) {
      canvasRef.current?.add(addHexagon);
    }
  };
  ShapesData[9].onClick = () => {
    if (canvasRef.current) {
      canvasRef.current?.add(addPolygon);
    }
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

  //fabric table
  const canvas = canvasRef.current;
  ContentElements.handleOpenTable = (
    rows: number,
    cols: number,
    cellWidth: number,
    cellHeight: number
  ) => {
    addTable(rows, cols, cellWidth, cellHeight, canvas);
  };

  //fabric Funnel
  ContentElements.handleFunnel = () => {
    addFunnel(canvas);
  };

  //fabric Pyramid
  ContentElements.handlePyramid = () => {
    addPyramid(canvas);
  };
  //addCycle
  ContentElements.handleCycle = (levels: number) => {
    addCycle(canvas);
  };
  //addTimeline
  ContentElements.handleTimeline = () => {
    addTimeline(canvas);
  };
  //addProcess
  ContentElements.handleProcess = () => {
    addProcess(canvas);
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
