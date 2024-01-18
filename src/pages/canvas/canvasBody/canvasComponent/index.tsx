import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  ContentElements,
  ShapesData,
  colorChange,
  elementData,
} from '../elementData';
import { CanvasContainer } from './style';
import useAllShapes from '../shapes';
import useAllElements from '../elements';
import { theme } from '@/constants/theme';
import {
  setActiveCanvas,
  setCanvas,
  setCanvasImageUrl,
  setRequestData,
  setShapeName,
  setTempData,
  updateCanvasInList,
} from '@/redux/reducers/canvas';
import WebFont from 'webfontloader';
import FullscreenCanvas from './fullscreenCanvas';
import { Canvas_Arrow } from '@/constants/media';
import { toggleRegenerateButton } from '@/redux/reducers/slide';
import {
  useTableElement,
  useProcessElement,
  usePyramidElement,
  useCustomSelectionIcons,
  useFunnelElement,
  useCycleElement,
  useTimelineElement,
  useListElement,
  useImageElement,
  useDelAndCopy,
} from '../elements/elementExports';
import {
  useCanvasClickEvent,
  useObjectMovingEvent,
  useSelectionCreatedEvent,
  useTextEvents,
} from '../events/eventExports';

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const FabricRef = useRef<fabric.Canvas | null>(null);
  const Container = useRef<HTMLDivElement | null>(null);

  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });
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

  const handleAllElements = (event: fabric.IEvent) => {
    const { target } = event;
    const canvas = canvasRef.current;

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

  const updateCanvasDimensions = () => {
    const aspectRatio = 16 / 9;
    const canvasWidthPercentage = 62;
    const canvasHeightPercentage = 62 / aspectRatio;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerWidth;

    const canvasWidth = (canvasWidthPercentage / 100) * windowWidth;
    const canvasHeight = (canvasHeightPercentage / 100) * windowHeight;

    setCanvasDimensions({ width: canvasWidth, height: canvasHeight });

    if (canvasRef.current) {
      canvasRef.current.setDimensions({
        width: canvasWidth,
        height: canvasHeight,
      });
      canvasRef.current.renderAll();
    }
  };

  useEffect(() => {
    const newCanvas = new fabric.Canvas('canvas');

    newCanvas.clear();
    fabric.Object.prototype.set({
      cornerStyle: 'circle',
      padding: 5,
      transparentCorners: false,
      cornerSize: 10,
    });
    // fabric.Object.prototype.objectCaching = false;
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
          textExitedEvent(canvas, event.target as fabric.Text);
          const updatedCanvas = newCanvas?.toObject([
            'listType',
            'listBullet',
            'listCounter',
            'name',
            'className',
          ]);
          const id = canvasJS.id;
          dispatch(updateCanvasInList({ id, updatedCanvas }));
        });

        newCanvas.on('selection:created', function (event) {
          handleSelectionCreated(canvas, event);
        });
        updateCanvasDimensions();

        window.addEventListener('resize', updateCanvasDimensions);

        if (newCanvas.toObject()?.objects.length > 1) {
          dispatch(toggleRegenerateButton(false));
        } else {
          dispatch(toggleRegenerateButton(true));
        }
        newCanvas.on('object:added', e => {
          const updatedCanvas = newCanvas?.toObject([
            'listType',
            'listBullet',
            'listCounter',
            'name',
            'className',
          ]);
          const id = canvasJS.id;
          getElementsData(updatedCanvas?.objects);
          console.log({ updatedCanvas });
          if (updatedCanvas?.objects.length > 1) {
            dispatch(toggleRegenerateButton(false));
          } else {
            dispatch(toggleRegenerateButton(true));
          }
          dispatch(updateCanvasInList({ id, updatedCanvas }));
        });

        newCanvas.on('object:removed', e => {
          const updatedCanvas = newCanvas?.toObject([
            'listType',
            'listBullet',
            'listCounter',
            'name',
            'className',
          ]);
          const id = canvasJS.id;
          getElementsData(updatedCanvas?.objects);
          if (updatedCanvas?.objects.length > 1) {
            dispatch(toggleRegenerateButton(false));
          } else {
            dispatch(toggleRegenerateButton(true));
          }
          dispatch(updateCanvasInList({ id, updatedCanvas }));
        });

        newCanvas.on('object:modified', e => {
          const updatedCanvas = newCanvas?.toObject([
            'listType',
            'listBullet',
            'listCounter',
            'name',
            'className',
          ]);
          const id = canvasJS.id;
          getElementsData(updatedCanvas?.objects);
          dispatch(updateCanvasInList({ id, updatedCanvas }));
        });

        newCanvas.on('selection:cleared', e => {
          const updatedCanvas = newCanvas?.toObject([
            'listType',
            'listBullet',
            'listCounter',
            'name',
            'className',
          ]);
          const id = canvasJS.id;
          getElementsData(updatedCanvas?.objects);
          dispatch(updateCanvasInList({ id, updatedCanvas }));
        });
        // newCanvas.on('object:moving', handleAllElements);
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
      img.set({
        left: 0,
        top: 0,
        scaleX: 0.93,
        scaleY: 0.93,
      });
      canvasRef.current?.add(img);
    });
    canvasRef.current?.renderAll();
  }, [canvasImage, imageUrl]);

  ContentElements.handleFontSize = () => {
    const element = canvasRef.current?.getActiveObject();

    if (element?.type == 'text' || element?.type == 'textbox') {
      (element as any).set('fontSize', size);
    }
    canvasRef.current?.renderAll();
    const updatedCanvas = canvasRef.current?.toObject([
      'listType',
      'listBullet',
      'listCounter',
      'name',
      'className',
    ]);
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
          const updatedCanvas = canvasRef.current?.toObject([
            'listType',
            'listBullet',
            'listCounter',
            'name',
            'className',
          ]);
          const id = canvasJS.id;
          dispatch(updateCanvasInList({ id, updatedCanvas }));
        }
      },
    });
  };

  function getElementsData(canvasData: any[]) {
    console.log({ canvasData });
    let data: any[] = [];
    let name: string = '';
    let title: string = '';
    let subTitle: string = '';
    let timelineContent: any[] = [];
    canvasData.forEach(obj => {
      if (obj.name === 'title') {
        dispatch(setShapeName('Cover'));
        name = 'Cover';
        title = obj.text;
      }
      if (obj.name === 'subTitle') {
        dispatch(setShapeName('Cover'));
        name = 'Cover';
        subTitle = obj.text;
      }

      if (obj.name === 'pyramidTextbox') {
        dispatch(setShapeName('Cover'));
        name = 'Pyramid';
        data.push({ text: obj.text });
      }

      if (obj.name === 'Funnel_Text') {
        dispatch(setShapeName('Funnel'));
        name = 'Funnel';
        data.push({ text: obj.text });
      }

      if (obj.name === 'Cycle_Text') {
        dispatch(setShapeName('Cycle'));
        name = 'Cycle';
        data.push({ text: obj.text });
      }

      if (obj.name === 'ProcessText') {
        dispatch(setShapeName('Process'));
        name = 'Process';
        data.push({ text: obj.text });
      }

      if (obj.name === 'TimeLineHeading') {
        dispatch(setShapeName('Timeline'));
        name = 'Timeline';
        timelineContent.push(obj);
      }
      if (obj.name === 'TimeLineText') {
        dispatch(setShapeName('Timeline'));
        name = 'Timeline';
        timelineContent.push(obj);
      }

      if (obj.name === 'bullet') {
        dispatch(setShapeName('Bullet point'));
        name = 'BulletPoint';
        let text = obj.text.split('\n');
        text.forEach((element: string) => {
          data.push({ text: element });
        });
      }
    });
    if (timelineContent.length > 0) {
      data = timelineContent.reduce((acc, obj, index, arr) => {
        if (obj.name === 'TimeLineHeading') {
          const nextObj = arr[index + 1]; // Get the next object
          if (nextObj && nextObj.name === 'TimeLineText') {
            acc.push({ heading: obj.text, text: nextObj.text });
          }
        }
        return acc;
      }, []);
    }

    dispatch(
      setRequestData({
        companyName: 'Revent',
        shape: name,
        data: data,
        title: title,
        subTitle: subTitle,
      })
    );
  }

  elementData[1].onClick = () => {
    canvasRef.current?.add(title);
    title.selectAll();
    canvasRef.current?.setActiveObject(title);
    canvasRef.current?.renderAll();
  };

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
    const updatedCanvas = canvasRef.current?.toObject([
      'listType',
      'listBullet',
      'listCounter',
      'name',
      'className',
    ]);
    const id = canvasJS.id;
    dispatch(updateCanvasInList({ id, updatedCanvas }));
  };

  colorChange.colorTextChange = () => {
    const selectedObject = canvasRef.current?.getActiveObject();
    const canvas = canvasRef.current;
    ColorForText(selectedObject, canvas, textColor);
    const updatedCanvas = canvasRef.current?.toObject([
      'listType',
      'listBullet',
      'listCounter',
      'name',
      'className',
    ]);
    const id = canvasJS.id;
    dispatch(updateCanvasInList({ id, updatedCanvas }));
  };

  colorChange.colorBorderChange = () => {
    const selectedObject = canvasRef.current?.getActiveObject();
    const canvas = canvasRef.current;
    ColorForBorder(selectedObject, canvas, borderColor);
    const updatedCanvas = canvasRef.current?.toObject([
      'listType',
      'listBullet',
      'listCounter',
      'name',
      'className',
    ]);
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
