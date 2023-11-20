import React, { useRef, useEffect } from 'react';
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
import { updateCanvasInList } from '@/redux/reducers/canvas';

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const Container = useRef<HTMLDivElement | null>(null);
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
    addList
  } = useAllElements();

  const { color, textColor, borderColor, canvasJS } = useAppSelector(
    state => state.canvas
  );

  let c = {
    "version": "4.3.0",
    "objects": [
        {
            "type": "image",
            "version": "5.3.0",
            "originX": "left",
            "originY": "top",
            "left": 276.89,
            "top": 123,
            "width": 700,
            "height": 374,
            "fill": "rgb(0,0,0)",
            "stroke": null,
            "strokeWidth": 0,
            "strokeDashArray": null,
            "strokeLineCap": "butt",
            "strokeDashOffset": 0,
            "strokeLineJoin": "miter",
            "strokeUniform": false,
            "strokeMiterLimit": 4,
            "scaleX": 0.5,
            "scaleY": 0.5,
            "angle": 0,
            "flipX": false,
            "flipY": false,
            "opacity": 1,
            "shadow": null,
            "visible": true,
            "backgroundColor": "",
            "fillRule": "nonzero",
            "paintFirst": "fill",
            "globalCompositeOperation": "source-over",
            "skewX": 0,
            "skewY": 0,
            "cropX": 0,
            "cropY": 0,
            "src": "https://www.yttags.com/blog/wp-content/uploads/2023/02/image-urls-for-testing.webp",
            "crossOrigin": null,
            "filters": []
        }
    ],
    "background": "#fff"
};


  

  useEffect(() => {
    
     const newCanvas = new fabric.Canvas('canvas');
      newCanvas.clear()
    
    newCanvas.loadFromJSON(canvasJS.canvas,()=>{
      canvasRef.current = newCanvas;
      
      newCanvas.renderAll();

    }, (error:Error) => {
      console.error('Error loading canvas:', error);
    });

     const canvas = canvasRef.current!;


    // const canvas = new fabric.Canvas('canvas', {
    //   width: Container.current?.clientWidth || 0,
    //   height: Container.current?.clientHeight || 0,
    //   backgroundColor: `${theme.colorSchemes.light.palette.common.white}`,
    // });


    canvas.setDimensions({ 
      width: 970, 
      height: 500,    
    });
    canvas.setBackgroundColor(`${theme.colorSchemes.light.palette.common.white}`, canvas.renderAll.bind(canvas));

    canvas.selectionColor = 'transparent';
    canvas.selectionBorderColor = `${theme.colorSchemes.light.palette.primary.main}`;
    canvas.selectionLineWidth = 1;
    fabric.Object.prototype.cornerColor = `${theme.colorSchemes.light.palette.primary.main}`;
    fabric.Object.prototype.borderColor = `${theme.colorSchemes.light.palette.primary.main}`;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' && canvas.getActiveObject()) { 
        canvas.remove(canvas.getActiveObject()!);
        const groupObjects = (canvas.getActiveObject()  as fabric.Group)?.getObjects();

        groupObjects.forEach((obj:any) => {
          canvas.remove(obj);
        });
     
        canvas.discardActiveObject();
        canvas.renderAll();
      }           
    };
    window.addEventListener('keydown', handleKeyDown);

    // window.addEventListener('resize', () => {
    //   canvas.setDimensions({
    //     width: Container.current?.clientWidth || 0,
    //     height: Container.current?.clientHeight || 0,
    //   });
    // });
    // canvasRef.current = canvas;

    CustomBorderIcons(canvas);
    return () => {
      canvas.dispose();
      window.removeEventListener('resize', () => { });
    };
  }, [canvasJS]);

  

  useEffect(()=>{
    if (canvasRef.current) {
      const onObjectModified = () => {
        const updatedCanvas = canvasRef.current?.toObject();
        const id = canvasJS.id;
        console.log(updatedCanvas)
        dispatch(updateCanvasInList({id,updatedCanvas}));
      };

      canvasRef.current?.on('object:modified', onObjectModified);

      return () => {
        canvasRef.current?.off('object:modified', onObjectModified);
      };
    }
  },[canvasJS]);

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
    let text= addQuotes()
    canvasRef.current?.add(text);
    canvasRef.current?.setActiveObject(text);
    text?.enterEditing()
    canvas?.renderAll();
  };
  elementData[9].onClick = () => {
    addList(canvas);
  };

  colorChange.colorFillChange = () => {
    const selectedObject = canvasRef.current?.getActiveObject();
    const canvas = canvasRef.current;
    ColorFillForObjects(selectedObject,canvas,color);
  };

  colorChange.colorTextChange = () => {
    const selectedObject = canvasRef.current?.getActiveObject();
    const canvas = canvasRef.current;
    ColorForText(selectedObject,canvas,textColor);
  };

  colorChange.colorBorderChange = () => {
    const selectedObject = canvasRef.current?.getActiveObject();
    const canvas = canvasRef.current;
    ColorForBorder(selectedObject,canvas,borderColor);
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

  ContentElements.openFullScreen = () => {
    const element = document.getElementById('canvas');
    canvasRef.current?.discardActiveObject();
    if (element) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        element.requestFullscreen();
      }
    }
  };

  ContentElements.handleBold = () => {
    let activeObj = canvasRef.current?.getActiveObjects() as any;
    const canvas = canvasRef.current;
    handleBold(activeObj,canvas)
  };
  ContentElements.handleItalic = () => {
    let activeObj = canvasRef.current?.getActiveObjects() as any;
    const canvas = canvasRef.current;
    handleItalic(activeObj,canvas)
  };
  ContentElements.handleUnderlIne = () => {
    let activeObj = canvasRef.current?.getActiveObjects() as any;
    const canvas = canvasRef.current;
    handleUnderLine(activeObj,canvas)
  }

  //fabric table
  const canvas = canvasRef.current;
  ContentElements.handleOpenTable = (rows: number, cols: number, cellWidth: number, cellHeight: number) => {
    addTable(rows, cols, cellWidth, cellHeight, canvas);
  };

 //fabric Funnel
  ContentElements.handleFunnel = (lev:number,size:number)=>{
    addFunnel(lev,size,canvas);
  };

  //fabric Pyramid
  ContentElements.handlePyramid = (lev:number,size:number)=>{
    addPyramid(lev,size,canvas);
  }

  ContentElements.handleCycle = (levels:number) => {
    addCycle(levels,canvas);
  }

  ContentElements.handleTimeline = (steps: number) => {
    addTimeline(steps,canvas);
  }

  ContentElements.handleProcess = (steps : number) => {
    addProcess(steps,canvas);
  }

  // const addImage = ()=>{
  //   fabric.Image.fromURL('https://www.yttags.com/blog/wp-content/uploads/2023/02/image-urls-for-testing.webp', (img) => {
  //     // Add the image onto the canvas
  //     img.set({
  //       left: 5,
  //       top: 5,
  //       scaleX: 0.5,
  //       scaleY: 0.5,
  //     });

  //     canvas?.add(img);
  //     canvas?.renderAll();
  //   });
  // }

  return (
    <CanvasContainer ref={Container}>
      {/* <button onClick={()=> console.log(canvasRef.current?.getActiveObject())}>GET DETAILS</button> */}
      {/* <button onClick={()=> addImage()}>Add image</button> */}
      <canvas id="canvas"></canvas>
    </CanvasContainer>
  );
};

export default CanvasComponent;

