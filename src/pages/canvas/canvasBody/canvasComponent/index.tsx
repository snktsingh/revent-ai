import React, { useRef, useEffect } from 'react';
import { fabric } from 'fabric';
import { useAppSelector } from '@/redux/store';
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

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const Container = useRef<HTMLDivElement | null>(null);
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
    addCycle
  } = useAllElements();

  const { color, textColor, borderColor } = useAppSelector(
    state => state.canvas
  );

  useEffect(() => {
    const canvas = new fabric.Canvas('canvas', {
      width: Container.current?.clientWidth || 0,
      height: Container.current?.clientHeight || 0,
      backgroundColor: `${theme.colorSchemes.light.palette.common.white}`,
    });
    canvas.selectionColor = 'transparent';
    canvas.selectionBorderColor = `${theme.colorSchemes.light.palette.primary.main}`;
    canvas.selectionLineWidth = 1;
    fabric.Object.prototype.cornerColor = `${theme.colorSchemes.light.palette.primary.main}`;
    fabric.Object.prototype.borderColor = `${theme.colorSchemes.light.palette.primary.main}`;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' && canvas.getActiveObject()) {
        canvas.remove(canvas.getActiveObject()!);
        canvas.discardActiveObject();
        canvas.renderAll();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    window.addEventListener('resize', () => {
      canvas.setDimensions({
        width: Container.current?.clientWidth || 0,
        height: Container.current?.clientHeight || 0,
      });
    });
    canvasRef.current = canvas;

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

    CustomBorderIcons(canvas);
    return () => {
      canvas.dispose();
      window.removeEventListener('resize', () => { });
    };
  }, []);

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



  return (
    <CanvasContainer ref={Container}>
      <canvas id="canvas"></canvas>
    </CanvasContainer>
  );
};

export default CanvasComponent;
