import React, { useRef, useEffect } from 'react';
import { fabric } from 'fabric';
import { useAppSelector } from '@/redux/store';
import {
  ContentElements,
  ShapesData,
  colorChange,
  deleteIcon,
  elementData,
} from '../elementData';
import { CanvasContainer } from './style';
import { Copy } from '@/constants/media';
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

  const { title, subtitle, heading, paragraph, BulletText } = useAllElements();

  const { color, textColor, borderColor } = useAppSelector(
    state => state.canvas
  );

  useEffect(() => {
    const canvas = new fabric.Canvas('canvas', {
      width: Container.current?.clientWidth || 0,
      height: Container.current?.clientHeight || 0,
      backgroundColor: `${theme.colorSchemes.light.palette.common.white}`,
    });
    canvas.selectionColor = '#cfd6e7';
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
    console.log(canvas);

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
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/**';
      fileInput.click();

      fileInput.addEventListener('change', e => {
        let reader = new FileReader();
        const file = (e.target as HTMLInputElement)?.files?.[0];
        if (file) {
          reader.onload = () => {
            if (canvasRef.current) {
              const canvas = canvasRef.current;

              fabric.Image.fromURL(reader.result as string, img => {
                img.set({
                  left: 5,
                  top: 5,
                  scaleX: 0.5,
                  scaleY: 0.5,
                });

                canvas.add(img);
                canvas.renderAll();
              });
            }
          };
          reader.readAsDataURL(file);
        }
      });
    };

    elementData[7].onClick = () => {};
    var img = new Image();
    img.src = deleteIcon;
    var cloneImg = new Image();
    cloneImg.src = Copy;
    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: 'pointer',
      mouseUpHandler: deleteObject,
      render: renderIcon,
    });

    fabric.Object.prototype.controls.clone = new fabric.Control({
      x: -0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: -16,
      cursorStyle: 'pointer',
      mouseUpHandler: cloneObject,
      render: renderCloneIcon,
    });

    function deleteObject(
      eventData: MouseEvent,
      transformData: fabric.Transform,
      x: number,
      y: number
    ): boolean {
      var target = transformData.target;

      var canvas = target.canvas;
      canvas?.remove(target);
      canvas?.requestRenderAll();

      return true;
    }

    function cloneObject(
      eventData: MouseEvent,
      transformData: fabric.Transform,
      x: number,
      y: number
    ): boolean {
      var target = transformData.target;
      var canvas = target.canvas;
      target.clone(function (cloned: fabric.Object) {
        cloned.left! += 10;
        cloned.top! += 10;
        canvas?.add(cloned);
      });
      return true;
    }

    function renderIcon(
      ctx: CanvasRenderingContext2D,
      left: number,
      top: number,
      styleOverride: any,
      fabricObject: fabric.Object
    ) {
      var size = 24;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle || 0));
      ctx.drawImage(img, -size / 2, -size / 2, size, size);
      ctx.restore();
    }

    function renderCloneIcon(
      ctx: CanvasRenderingContext2D,
      left: number,
      top: number,
      fabricObject: fabric.Object
    ) {
      var size = 24;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle || 0));
      ctx.drawImage(cloneImg, -size / 2, -size / 2, size, size);
      ctx.restore();
    }

    return () => {
      canvas.dispose();
      window.removeEventListener('resize', () => {});
    };
  }, []);

  colorChange.colorFillChange = () => {
    const selectedObject = canvasRef.current?.getActiveObject();
    if (selectedObject?.type == 'shape') {
      console.log();

      selectedObject.set('fill', color);
      canvasRef.current?.renderAll();
    } else if (selectedObject?.type == 'text') {
      selectedObject.set('backgroundColor', color);
      canvasRef.current?.renderAll();
    }
  };

  colorChange.colorTextChange = () => {
    const selectedObject = canvasRef.current?.getActiveObject();
    if (selectedObject?.type == 'text') {
      selectedObject.set('fill', textColor);
      canvasRef.current?.renderAll();
    }
  };

  colorChange.colorBorderChange = () => {
    const selectedObject = canvasRef.current?.getActiveObject();
    if (selectedObject) {
      selectedObject.set('stroke', borderColor);
      canvasRef.current?.renderAll();
    }
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
    if (activeObj && activeObj[0]?.type === 'text') {
      activeObj[0].setSelectionStyles(
        { fontWeight: 'bold' },
        activeObj[0].selectionStart,
        activeObj[0].selectionEnd
      );
      canvasRef.current?.renderAll();
    }
  };
  ContentElements.handleItalic = () => {
    let activeObj = canvasRef.current?.getActiveObjects() as any;
    if (activeObj && activeObj[0]?.type === 'text') {
      activeObj[0].setSelectionStyles(
        { fontStyle: 'italic' },
        activeObj[0].selectionStart,
        activeObj[0].selectionEnd
      );
      canvasRef.current?.renderAll();
    }
  };
  ContentElements.handleUnderlIne = () => {
    let activeObj = canvasRef.current?.getActiveObjects() as any;
    if (activeObj && activeObj[0]?.type === 'text') {
      const selectedText = activeObj[0]?.text.slice(
        activeObj[0].selectionStart,
        activeObj[0].selectionEnd
      );
      activeObj[0].setSelectionStyles(
        { underline: true },
        activeObj[0].selectionStart,
        activeObj[0].selectionEnd
      );
      canvasRef.current?.renderAll();
    }
  };

  return (
    <CanvasContainer ref={Container}>
      <canvas id="canvas"></canvas>
    </CanvasContainer>
  );
};

export default CanvasComponent;
