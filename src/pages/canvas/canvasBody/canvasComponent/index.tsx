import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setCanvas } from '@/redux/reducers/canvas';
import {
  ContentElements,
  ShapesData,
  colorChange,
  deleteIcon,
  elementData,
} from '../elementData';
import { CanvasContainer, SearchInputContainer } from './style';
import { Card, InputBase, MenuItem, Stack } from '@mui/material';
import { searchElement } from '@/redux/reducers/slide';
import { ElementContainer, ElementSubtitle, ElementTitle } from '../style';
import { CanvasLine, CanvasOutlinedArrow, Copy } from '@/constants/media';

interface CustomControl extends fabric.Control {
  cornerSize?: number;
}

interface IExtendedTextboxOptions extends fabric.ITextboxOptions {
  listType?: string;
  listBullet?: string;
  listCounter?: number;
}

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const Container = useRef<HTMLDivElement | null>(null);
  const canvasData = useAppSelector(state => state.canvas.canvasData);
  const slide = useAppSelector(state => state.slide);
  const { color, textColor, borderColor } = useAppSelector(
    state => state.canvas
  );
  const dispatch = useAppDispatch();
  const [filteredList, setFilteredList] = useState(elementData);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const filterData = (searchValue: string) => {
    const filtered = elementData.filter(item =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredList(filtered);
  };

 
    

  useEffect(() => {
    const canvas = new fabric.Canvas('canvas', {
      width: Container.current?.clientWidth || 0,
      height: Container.current?.clientHeight || 0,
      backgroundColor: 'white',
    });

    canvas.selectionColor = '#cfd6e7'; // Color of the selection border
    canvas.selectionBorderColor = '#043199'; // Border color when an object is selected
    canvas.selectionLineWidth = 1;
    fabric.Object.prototype.cornerColor = '#043199';
    fabric.Object.prototype.borderColor = '#043199';

    window.addEventListener('resize', () => {
      canvas.setDimensions({
        width: Container.current?.clientWidth || 0,
        height: Container.current?.clientHeight || 0,
      });
    });
    canvasRef.current = canvas;
    console.log(canvas);
    dispatch(setCanvas(canvas.toDatalessJSON()));

    // const handleSaveCanvasData = () => {
    //   const canvas = new fabric.Canvas;
    //   canvas.loadFromJSON(canvasData, () => {
    //     // Do something with the loaded canvas data
    //     console.log('Canvas data loaded:', canvas);
    //   });
    // };
    elementData[1].onClick = () => {
      const canvas = canvasRef.current;
      const title = new fabric.IText('Click to Edit', {
        left: 50,
        top: 50,
        width: 600,
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Arial',
        type: 'text',
      });

      canvas?.add(title);
    };

    elementData[2].onClick = () => {
      const canvas = canvasRef.current;
      const subtitle = new fabric.IText('This is the subtitle', {
        left: 100,
        top: 100,
        width: 200,
        fontSize: 20,
        fontFamily: 'Arial',
        type: 'text',
      });

      canvas?.add(subtitle);
    };

    elementData[3].onClick = () => {
      const canvas = canvasRef.current;
      const heading = new fabric.IText('This is the heading', {
        left: 100,
        top: 50,
        width: 300,
        fontSize: 30,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        type: 'text',
      });

      canvas?.add(heading);
    };

    elementData[4].onClick = () => {
      const canvas = canvasRef.current;
      const paragraph = new fabric.Textbox(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        {
          left: 100,
          top: 150, // Adjust the position as needed
          width: 600, // Adjust the width as needed
          lineHeight: 1.5,
          fontSize: 16, // Adjust the font size as needed
          fontFamily: 'Arial',
          type: 'text',
        }
      );

      paragraph.setControlsVisibility({
        tl: true,
        tr: true,
        br: true,
        bl: true,
        mt: true,
        mb: true,
        ml: true,
        mr: true,
      });

      paragraph.on('scaling', function (this: fabric.Textbox) {
        const scaleX = this.scaleX;
        const scaleY = this.scaleY;
        const newFontSize = (this.fontSize! * (scaleX! + scaleY!)) / 2;
        this.fontSize = newFontSize;
      });

      canvas?.add(paragraph);
    };
    const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Integer nec odio.`;

    
    const renderTextLine = function (
      this: any,
      method:any,
      ctx:any,
      line:any,
      left:any,
      top:any,
      lineIndex:any,
    ) {
      const style0 = this.getCompleteStyleDeclaration(lineIndex, 0);
    
      // Determine the list type
      const bullet = this.listType === 'numbered'
        ? [this.listCounter + '.']
        : [this.listBullet];
    
      const bulletLeft = left - style0.fontSize - 2;
    
      if (line.length) {
        if (!this.isWrapping) {
          this._renderChars(method, ctx, bullet, bulletLeft, top, lineIndex);
          this.isWrapping = !this.isEndOfWrapping(lineIndex);
          if (!this.isWrapping) {
            if (this.listType === 'numbered') {
              this.listCounter++;
            }
          }
        } else if (this.isEndOfWrapping(lineIndex)) {
          this.isWrapping = false;
          if (this.listType === 'numbered') {
            this.listCounter++;
          }
        }
      }
    
      if (lineIndex === this.textLines.length - 1) {
        this.isWrapping = false;
        this.listCounter = 1;
      }
    
      this._renderChars(method, ctx, line, left, top, lineIndex);
    };

   
    elementData[5].onClick = () => {
      const canvas = canvasRef.current;
      const BulletText = new fabric.Textbox(text, {
        fontFamily: 'sans-serif',
        lineHeight: 1.40,
        left: 50,
        top: 50,
        width: 450,
        fontSize:20,
        objectCaching: false,
        isWrapping: false,
        listType: 'bullet',
        listBullet: '\u2022',
        listCounter: 0
      } as IExtendedTextboxOptions);
      BulletText._renderTextLine = renderTextLine;
      canvas?.add(BulletText)
    };

    elementData[6].onClick = ()=> {
      const canvas = canvasRef.current;
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept ="image/**"
      fileInput.click();
      
      fileInput.addEventListener('change', (e)=>{
        let reader = new FileReader();
        const file = (e.target as HTMLInputElement)?.files?.[0];
        if (file) {
          reader.onload = () => {
            if (canvasRef.current) {
              const canvas = canvasRef.current;
      
              fabric.Image.fromURL(reader.result as string, (img) => {
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
        
      })
    }
   

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
      styleOverride: any,
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
      
      const rect = new fabric.Rect({
        width: 100,
        height: 100,
        fill: 'transparent',
        stroke: '#043199',
        top: 100,
        left: 100,
        type: 'shape',
      });

      canvasRef.current.add(rect);
      
    }
  };

  ShapesData[1].onClick = () => {
    if (canvasRef.current) {
      fabric.loadSVGFromURL(CanvasOutlinedArrow, (objects) => {
        const svgObject = objects[0];
        svgObject.fill = '#004FBA';
        canvasRef.current?.add(svgObject);
        canvasRef.current?.renderAll();
      });
    }
  };

  ShapesData[2].onClick = () => {
    if (canvasRef.current) {
      fabric.loadSVGFromURL(CanvasLine, (objects) => {
        const svgObject = objects[0];
        svgObject.fill = '#004FBA';
        canvasRef.current?.add(svgObject);
        canvasRef.current?.renderAll();
      });
    }
  };

  ShapesData[3].onClick = () => {
    if (canvasRef.current) {
      const circle = new fabric.Circle({
        radius: 50,
        fill: 'transparent',
        stroke: '#043199',
        top: 100,
        left: 100,
        type: 'shape',
      });

      canvasRef.current.add(circle);
      canvasRef.current.renderAll();
    }
  };

  ShapesData[4].onClick = () => {
    if (canvasRef.current) {
      const triangle = new fabric.Triangle({
        width: 100,
        height: 100,
        fill: 'transparent',
        stroke: '#043199',
        top: 100,
        left: 100,
        type: 'shape',
      });
      canvasRef.current.add(triangle);
      canvasRef.current.renderAll();
    }
  };
  ShapesData[5].onClick = () => {
    if (canvasRef.current) {
      const centerX = 100; // X coordinate of the center of the star
      const centerY = 100; // Y coordinate of the center of the star
      const numPoints = 5; // Number of points on the star
      const outerRadius = 50; // Outer radius of the star
      const innerRadius = 20; // Inner radius of the star

      const starPoints = [];

      for (let i = 0; i < numPoints * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (Math.PI / numPoints) * i;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        starPoints.push({ x, y });
      }

      const star = new fabric.Polygon(starPoints, {
        fill: 'transparent',
        stroke: '#043199',
        left: 50,
        top: 50,
        type: 'shape',
      });

      canvasRef.current.add(star);
      canvasRef.current.renderAll();
    }
  };

  ShapesData[6].onClick = () => {
    if (canvasRef.current) {
      const arrowPoints = [
        { x: 100, y: 100 },
        { x: 150, y: 100 },
        { x: 150, y: 75 },
        { x: 200, y: 125 },
        { x: 150, y: 175 },
        { x: 150, y: 150 },
        { x: 100, y: 150 },
      ];

      const arrow = new fabric.Polygon(arrowPoints, {
        fill: '#043199',
        left: 50,
        top: 50,
        type: 'shape',
      });

      canvasRef.current.add(arrow);
      canvasRef.current.renderAll();
    }
  };

  ShapesData[7].onClick = () => {
    if (canvasRef.current) {
      const arrowPoints = [
        { x: 100, y: 150 },
        { x: 150, y: 150 },
        { x: 150, y: 175 },
        { x: 200, y: 125 },
        { x: 150, y: 75 },
        { x: 150, y: 100 },
        { x: 100, y: 100 },
      ];

      const arrow = new fabric.Polygon(arrowPoints, {
        fill: '#043199',
        left: 50,
        top: 50,
        type: 'shape',
      });

      canvasRef.current.add(arrow);
      canvasRef.current.renderAll();
    }
  };


  ShapesData[8].onClick = () => {
    if (canvasRef.current) {
      const hexagon = new fabric.Polygon([
        { x: 50, y: 0 },
        { x: 150, y: 0 },
        { x: 200, y: 100 },
        { x: 150, y: 200 },
        { x: 50, y: 200 },
        { x: 0, y: 100 },
      ], {
        fill: 'transparent',
        stroke: '#043199',
        strokeWidth: 1,
        left: 100,
        top: 100,
        type: 'shape'
      });
      canvasRef.current?.add(hexagon);
    }
  };
  ShapesData[9].onClick = () => {
    if (canvasRef.current) {
      const polygon = new fabric.Polygon([
        { x: 50, y: 0 },
        { x: 100, y: 50 },
        { x: 50, y: 100 },
        { x: 0, y: 50 },
      ], {
        stroke: '#043199',
        fill: 'transparent',
        left: 200,
        top: 100,
        type: 'shape'
      });
      canvasRef.current?.add(polygon);
    }
  };

  const handleElementSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchElement(e.target.value));
    filterData(slide.listSearch);
  };

  const handleSlideListClose = () => {
    dispatch(searchElement(''));
    setFilteredList(elementData);
    setAnchorEl(null);
  };

  ContentElements.openFullScreen = () => {
    const element = document.getElementById('canvas'); // Replace with your canvas element ID
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
      activeObj[0].setSelectionStyles({ fontWeight: 'bold' }, activeObj[0].selectionStart, activeObj[0].selectionEnd);
      canvasRef.current?.renderAll();
    }
  }
  ContentElements.handleItalic = () => {
    let activeObj = canvasRef.current?.getActiveObjects() as any;
    if (activeObj && activeObj[0]?.type === 'text') {
      activeObj[0].setSelectionStyles({ fontStyle: 'italic' }, activeObj[0].selectionStart, activeObj[0].selectionEnd);
      canvasRef.current?.renderAll();
    }
  }
  ContentElements.handleUnderlIne = () => {
    let activeObj = canvasRef.current?.getActiveObjects() as any;
    if (activeObj && activeObj[0]?.type === 'text') {
      const selectedText = activeObj[0]?.text.slice(activeObj[0].selectionStart, activeObj[0].selectionEnd);
      activeObj[0].setSelectionStyles({ underline: true }, activeObj[0].selectionStart, activeObj[0].selectionEnd);
      canvasRef.current?.renderAll();
    }
  }

  return (
    <CanvasContainer ref={Container}>
      {/* <SearchInputContainer>
        <InputBase
          sx={{ ml: 3 }}
          placeholder="/ Type to search elements..."
          value={slide.listSearch}
          onChange={handleElementSearch}
        />

        {slide.listSearch == '' ? (
          <></>
        ) : (
          <div
            style={{
              overflowY: 'scroll',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '17vw',
            }}
          >
            {filteredList.map((item, index) => {
              return (
                <MenuItem
                  onClick={handleSlideListClose}
                  style={{ display: 'flex', flexDirection: 'column' }}
                  key={index}
                >
                  <Stack direction="row" spacing={1}>
                    <img src={item.icon} width="30vh" />
                    <ElementContainer>
                      <ElementTitle>{item.title}</ElementTitle>
                      <ElementSubtitle>{item.subtitle}</ElementSubtitle>
                    </ElementContainer>
                  </Stack>
                </MenuItem>
              );
            })}
          </div>
        )}
      </SearchInputContainer> */}
      <canvas id="canvas"></canvas>
    </CanvasContainer>
  );
};

export default CanvasComponent;
