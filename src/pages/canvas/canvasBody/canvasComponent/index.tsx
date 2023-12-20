import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  ContentElements,
  ShapesData,
  colorChange,
  elementData,
  variantsFunction,
} from '../elementData';
import { CanvasContainer } from './style';
import useAllShapes from '../shapes';
import useAllElements from '../elements';
import { theme } from '@/constants/theme';
import {
  setActiveCanvas,
  setCanvas,
  setRequest,
  setShapeName,
  setTempData,
  updateCanvasInList,
} from '@/redux/reducers/canvas';
import WebFont from 'webfontloader';

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const Container = useRef<HTMLDivElement | null>(null);
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });

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
    ImageUploader,
    CustomBorderIcons,
    ColorFillForObjects,
    ColorForText,
    ColorForBorder,
    handleBold,
    handleItalic,
    handleUnderLine,
    addTable,
    addFunnel,
    addPyramid,
    addCycle,
    addTimeline,
    addProcess,
    addList,
    handleObjectMoving,
    handleAddCustomIcon,
    handleSelectionCreated,
    CanvasClick,
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
  } = useAppSelector(state => state.canvas);

  const { pptUrl, imageUrl } = useAppSelector(state => state.thunk);

  const { itemKey } = useAppSelector(state => state.element);

  useEffect(() => {
    for (let i = 0; i < tempData.length; i++) {
      if (tempData[i].type === 'textbox' || tempData[i].type === 'i-text') {
        if (
          itemKey == 1 ||
          itemKey == 2 ||
          itemKey == 3 ||
          itemKey == 4 ||
          itemKey == 5
        ) {
          dispatch(setRequest([...requestData, { text: tempData[i].text }]));
        } else if (itemKey == 15) {
          dispatch(setShapeName('Pyramid'));
          dispatch(setRequest([...requestData, { text: tempData[i].text }]));
        } else if (itemKey == 14) {
          dispatch(setShapeName('Funnel'));
          dispatch(setRequest([...requestData, { text: tempData[i].text }]));
        } else if (itemKey == 13) {
          dispatch(setShapeName('Timeline'));
          dispatch(setRequest([...requestData, { text: tempData[i].text }]));
        } else if (itemKey == 12) {
          dispatch(setShapeName('Process'));
          dispatch(setRequest([...requestData, { text: tempData[i].text }]));
        } else if (itemKey == 11) {
          dispatch(setShapeName('Cycle'));
          dispatch(setRequest([...requestData, { text: tempData[i].text }]));
        }
      }
    }
  }, [tempData]);

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
    const canvasWidthPercentage = 65;
    const canvasHeightPercentage = 65;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

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
    console.log(canvasList);
    console.log(newCanvas.toObject());
    newCanvas.loadFromJSON(
      canvasJS.canvas,
      () => {
        canvasRef.current = newCanvas;
        const aspectRatio = 16 / 9;
        newCanvas.setDimensions({
          width: 800,
          height: 800/aspectRatio,
        });
        newCanvas.setBackgroundColor(
          `${theme.colorSchemes.light.palette.common.white}`,
          newCanvas.renderAll.bind(newCanvas)
        );

        newCanvas.selectionColor = 'transparent';
        newCanvas.selectionBorderColor = `${theme.colorSchemes.light.palette.primary.main}`;
        newCanvas.selectionLineWidth = 1;

        CustomBorderIcons(newCanvas);

        newCanvas.on('mouse:up', event => {
          CanvasClick(newCanvas, event);
        });
        newCanvas.on('mouse:up', event => {
          CanvasClick(newCanvas, event);
        });

        newCanvas.on('selection:created', function (event) {
          handleSelectionCreated(canvas, event);
        });
        updateCanvasDimensions();

        window.addEventListener('resize', updateCanvasDimensions);

        newCanvas.on('object:added', e => {
          const updatedCanvas = newCanvas?.toObject([
            'listType',
            'listBullet',
            'listCounter',
            'name',
            'className',
          ]);
          const id = canvasJS.id;
          dispatch(setTempData(newCanvas.toObject(['name']).objects));
          console.log(newCanvas.toObject(['name']).objects);
          // dispatch(setRequest(newCanvas.toObject(['name']).objects));
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
          console.log(newCanvas.toObject());
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
          dispatch(updateCanvasInList({ id, updatedCanvas }));
        });
        // newCanvas.on('object:moving', handleAllElements);
        // newCanvas.on('object:moving', function (options) {
        //   handleObjectMoving(options, newCanvas);
        // });

        handleAddCustomIcon(newCanvas);
        newCanvas.renderAll();

        canvasRef.current = newCanvas;
      },
      (error: Error) => {
        console.error('Error loading canvas:', error);
      }
    );

    const canvas = canvasRef.current!;

    // const base64 = canvas.toDataURL({ format: 'jpeg', quality: 0.8 });
    // fabric.Image.fromURL(base64, img => {
    //   canvas.add(img);
    // });

    const setResImage = (img: string) => {
      if (canvasRef.current) {
        canvasRef.current.clear();
      }
      fabric.Image.fromURL(`${img}`, img => {
        newCanvas.add(img);
      });
    };

    if (imageUrl !== '') {
      setResImage(imageUrl);
    }

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
      newCanvas.dispose();
      window.removeEventListener('resize', () => {});
    };
  }, [canvasJS, imageUrl]);

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

  elementData[1].onClick = () => {
    canvasRef.current?.add(title);
  };

  elementData[2].onClick = () => {
    canvasRef.current?.add(subtitle);
  };

  elementData[3].onClick = () => {
    canvasRef.current?.add(heading);
  };

  elementData[4].onClick = () => {
    canvasRef.current?.add(paragraph);
  };

  elementData[5].onClick = () => {
    canvasRef.current?.add(BulletText);
  };

  elementData[6].onClick = () => {
    ImageUploader(canvas);
  };
  elementData[8].onClick = () => {
    let text = addQuotes();
    canvasRef.current?.add(text);
    canvasRef.current?.setActiveObject(text);
    text?.enterEditing();
    canvas?.renderAll();
  };
  elementData[9].onClick = () => {
    addList(canvas);
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
    }
  };
  ShapesData[1].onClick = () => {
    if (canvasRef.current) {
      // canvasRef.current.add(addLine);
    }
  };

  ShapesData[2].onClick = () => {
    if (canvasRef.current) {
      canvasRef.current.add(addLine);
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

  //FULLSCREEN
  ContentElements.openFullScreen = () => {
    const element = document.getElementById('canvas');
    const handleKeyDown = (event: any) => {
      if (!document.fullscreenElement) return;

      if (event.keyCode === 37 && currentCanvasIndex > 0) {
        // Left arrow key
        console.log('left');

        currentCanvasIndex--;
        dispatch(setCanvas(canvasList[currentCanvasIndex]));
        dispatch(setActiveCanvas(canvasList[currentCanvasIndex].id));
      } else if (
        event.keyCode === 39 &&
        currentCanvasIndex < canvasList.length - 1
      ) {
        // Right arrow key
        console.log('right');
        currentCanvasIndex++;
        dispatch(setCanvas(canvasList[currentCanvasIndex]));
        dispatch(setActiveCanvas(canvasList[currentCanvasIndex].id));
      }
    };

    let currentCanvasIndex = 0;
    dispatch(setCanvas(canvasList[currentCanvasIndex]));

    const enterFullScreen = () => {
      element?.requestFullscreen();
      window.addEventListener('keydown', handleKeyDown);
    };

    const exitFullScreen = () => {
      document.exitFullscreen();
      window.removeEventListener('keydown', handleKeyDown);
    };

    const fullscreenChange = () => {
      if (!document.fullscreenElement) {
        window.removeEventListener('keydown', handleKeyDown);
      } else {
        window.addEventListener('keydown', handleKeyDown);
      }
    };

    if (!document.fullscreenElement) {
      enterFullScreen();
    } else {
      exitFullScreen();
    }

    document.addEventListener('fullscreenchange', fullscreenChange);
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

  variantsFunction.addVariantsCanvas = (url:string) => {
    canvasRef.current?.clear();
    
    fabric.Image.fromURL(url, (img) => {
      // Adjust the image properties as needed
      img.set({
        left: 0, // Set the left position of the image
        top: 0, // Set the top position of the image
        scaleX: 0.55, // Set scale factor if needed
        scaleY: 0.55,
        hasControls: false,
        selectable:false
        // Other properties like width, height, etc.
        
      });
    
      canvasRef.current?.add(img); // Add the image to the canvas
    });
    canvasRef.current?.renderAll();
    console.log(canvasRef.current?.toObject())
  }

  return (
    <CanvasContainer ref={Container}>
      {/* <button
          id="but"
          onClick={() => {
            // console.log('temp', tempData);
            // console.log('request', requestData);
            console.log(canvasRef.current?.toJSON())
          }}
        >
          GET DETAILS
        </button> */}
      <canvas id="canvas"></canvas>
    </CanvasContainer>
  );
};

export default CanvasComponent;
