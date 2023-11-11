import React from 'react';
import { fabric } from 'fabric';
import { Copy, DeleteX } from '@/constants/media';
import { theme } from '@/constants/theme';

interface IExtendedTextboxOptions extends fabric.ITextboxOptions {
  listType?: string;
  listBullet?: string;
  listCounter?: number;
}
export default function useAllElements() {
  const title = new fabric.IText('Click to Edit', {
    left: 30,
    top: 30,
    width: 600,
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Red Hat Display, sans-serif',
    type: 'text',
  });

  const subtitle = new fabric.IText('This is the subtitle', {
    left: 100,
    top: 100,
    width: 200,
    fontSize: 20,
    fontFamily: 'Arial',
    type: 'text',
  });

  const heading = new fabric.IText('This is the heading', {
    left: 100,
    top: 50,
    width: 300,
    fontSize: 30,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    type: 'text',
  });

  const paragraph = new fabric.IText('parageph', {
    left: 100,
    top: 150, // Adjust the position as needed
    width: 600, // Adjust the width as needed
    lineHeight: 1.5,
    fontSize: 16, // Adjust the font size as needed
    fontFamily: 'Arial',
    type: 'text',
  });

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

  paragraph.on('scaling', function (this: fabric.IText) {
    const scaleX = this.scaleX;
    const scaleY = this.scaleY;
    const newFontSize = (this.fontSize! * (scaleX! + scaleY!)) / 2;
    this.fontSize = newFontSize;
  });

  const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Integer nec odio.`;

  const renderTextLine = function (
    this: any,
    method: any,
    ctx: any,
    line: any,
    left: any,
    top: any,
    lineIndex: any
  ) {
    const style0 = this.getCompleteStyleDeclaration(lineIndex, 0);

    // Determine the list type
    const bullet =
      this.listType === 'numbered'
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

  const BulletText = new fabric.Textbox(text, {
    fontFamily: 'sans-serif',
    lineHeight: 1.4,
    left: 50,
    top: 50,
    width: 450,
    fontSize: 20,
    objectCaching: false,
    isWrapping: false,
    listType: 'bullet',
    listBullet: '\u2022',
    listCounter: 0,
  } as IExtendedTextboxOptions);
  BulletText._renderTextLine = renderTextLine;


  const ImageUploader = (canvas: fabric.Canvas | null) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/**';
    fileInput.click();

    fileInput.addEventListener('change', e => {
      let reader = new FileReader();
      const file = (e.target as HTMLInputElement)?.files?.[0];
      if (file) {
        reader.onload = () => {
          if (canvas) {

            fabric.Image.fromURL(reader.result as string, img => {
              img.set({
                left: 5,
                top: 5,
                scaleX: 0.5,
                scaleY: 0.5,
              });

              canvas?.add(img);
              canvas?.renderAll();
            });
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const CustomBorderIcons = (canvas: fabric.Canvas | null) => {
    var img = new Image();
    img.src = DeleteX;
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
        cloned.left! += 20;
        cloned.top! += 20;
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

    canvas?.renderAll();
  };

  const ColorFillForObjects = (selectedObject: fabric.Object | null | undefined, canvas: fabric.Canvas | null, color: string) => {
    if (selectedObject?.type == 'shape') {
      selectedObject.set('fill', color);
      canvas?.renderAll();
    } else if (selectedObject?.type == 'text') {
      selectedObject.set('backgroundColor', color);
      canvas?.renderAll();
    }
  };

  const ColorForText = (selectedObject: fabric.Object | null | undefined, canvas: fabric.Canvas | null, textColor: string) => {
    if (selectedObject?.type == 'text') {
      selectedObject.set('fill', textColor);
      canvas?.renderAll();
    }
  }

  const ColorForBorder = (selectedObject: fabric.Object | null | undefined, canvas: fabric.Canvas | null, borderColor: string) => {
    if (selectedObject) {
      selectedObject.set('stroke', borderColor);
      canvas?.renderAll();
    }
  };

  const handleBold = (activeObj: any, canvas: fabric.Canvas | null) => {
    if (activeObj && activeObj[0]?.type === 'text') {
      activeObj[0].setSelectionStyles(
        { fontWeight: 'bold' },
        activeObj[0].selectionStart,
        activeObj[0].selectionEnd
      );
      canvas?.renderAll();
    }
  };

  const handleItalic = (activeObj: any, canvas: fabric.Canvas | null) => {
    if (activeObj && activeObj[0]?.type === 'text') {
      activeObj[0].setSelectionStyles(
        { fontStyle: 'italic' },
        activeObj[0].selectionStart,
        activeObj[0].selectionEnd
      );
      canvas?.renderAll();
    }
  };

  const handleUnderLine = (activeObj: any, canvas: fabric.Canvas | null) => {
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
      canvas?.renderAll();
    }
  };

  //table
  const fabricDblClick = function (obj: any, handler: any) {
    return function () {
      if (obj.clicked) handler(obj);
      else {
        obj.clicked = true;
        setTimeout(function () {
          obj.clicked = false;
        }, 500);
      }
    };
  };



  const addTable = (rows: number, cols: number, cellWidth: number, cellHeight: number, canvas: fabric.Canvas | null) => {

    const ungroup = function (group: fabric.Group) {
      let items = group._objects;
      group._restoreObjectsState();
      canvas?.remove(group);
      canvas?.renderAll();
      for (let i = 0; i < items.length; i++) {
        canvas?.add(items[i]);
      }
      canvas?.renderAll();
    };

    const cellPadding = 6;
    const tableLeft = 50;
    const tableTop = 50;

    function createCell(left: number, top: number, i: number, j: number) {
      const cell = new fabric.Rect({
        width: cellWidth,
        height: cellHeight,
        fill: 'transparent',
        stroke: 'black',
        strokeWidth: 0.5,
        selectable: false,
        left: tableLeft + (j * cellWidth),
        top: tableTop + (i * cellHeight),
      });

      const text = new fabric.Textbox(`Cell ${i + 1},${j + 1}`, {
        left: cell.left! + cellPadding,
        top: cell.top! + cellPadding,
        fontSize: 16,
        width: cellWidth - (2 * cellPadding),
        height: cellHeight - (2 * cellPadding),
        fontFamily: 'Arial',
        editable: true,
        hasControls: false,
        hasBorders: false,
      });

      const table = new fabric.Group([cell, text], {
        hasBorders: true,
        hasControls: true,
      });

      table.on('mousedown', fabricDblClick(table, function (obj: any) {
        ungroup(table);
        canvas?.setActiveObject(text);
        text.enterEditing();
        text.selectAll();
      }));



      return table;
    }

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const cell = createCell(50, 50, i, j);
        canvas?.add(cell)
      }
    }
  };

  //pyramid

  const addPyramid = (lev: number, size: number, canvas: fabric.Canvas | null) => {

    function createLevels(n: number) {
      let x1 = -140;
      let x2 = 140;
      let x3 = 120;
      let x4 = -120;
      let levels: fabric.Object[] = [];
      let trapTop = 60;
      let textTop = n * 23;
      for (let i = 1; i <= n; i++) {
        let trapezoid = new fabric.Polygon([
          { x: x1, y: 0 },
          { x: x2, y: 0 },
          { x: x3, y: -50 },
          { x: x4, y: -50 },
        ], {
          fill: 'transparent',
          stroke: 'black',
          top: trapTop,
        });

        let text = new fabric.Textbox(`Level ${n - i + 1}`, {
          fontSize: 18,
          left: -70,
          width: 140,
          top: textTop,
          editable: true,
          textAlign: 'center',
        });

        textTop = textTop - 50;
        trapTop = trapTop - 50;
        x1 = x1 + 20;
        x2 = x2 - 20;
        x3 = x3 - 20;
        x4 = x4 + 20
        levels.push(trapezoid);
        levels.push(text);
      }

      return levels;
    }

    let pyramidLevels = createLevels(lev);

    let group = new fabric.Group(pyramidLevels, {
      left: 150,
      top: 100,
    });

    canvas?.add(group);
    canvas?.renderAll();
  }

  //funnel

  const addFunnel = (lev: number, size: number, canvas: fabric.Canvas | null) => {
    function createLevels(n: number) {
      let x1 = -120;
      let x2 = 120;
      let x3 = 140;
      let x4 = -140;
      let levels: fabric.Object[] = [];
      let trapTop = -60;
      let textTop = n * 23;
      for (let i = 1; i <= n; i++) {
        let trapezoid = new fabric.Polygon([
          { x: x1, y: 0 },
          { x: x2, y: 0 },
          { x: x3, y: -50 },
          { x: x4, y: -50 },
        ], {
          fill: 'transparent',
          stroke: 'black',
          top: trapTop,
        });

        let text = new fabric.Textbox(`Level ${n - i + 1}`, {
          fontSize: 18,
          left: -70,
          width: 140,
          top: textTop,
          editable: true,
          textAlign: 'center',
        });

        textTop = textTop - 50;
        trapTop = trapTop + 50;
        x1 = x1 + 20;
        x2 = x2 - 20;
        x3 = x3 - 20;
        x4 = x4 + 20
        levels.push(trapezoid);
        levels.push(text);
      }
      let rect = new fabric.Rect({
        fill: 'transparent',
        stroke: 'black',
        width: 120,
        height: 120,
        top: trapTop,
        left: -60
      });
      levels.push(rect);


      return levels;
    }
    let Funnel = createLevels(lev);
    let group = new fabric.Group(Funnel, {
      left: 50,
      top: 50,
    });

    canvas?.add(group);
    canvas?.renderAll();
  };

  //CYCLE 

  const addCycle = (levels: number, canvas: fabric.Canvas | null) => {

    const addArrow = (left: number, top: number, angle: number) => {
      const ArrowPoints = [
        { x: 100, y: 100 },
        { x: 125, y: 100 },
        { x: 125, y: 87.5 },
        { x: 150, y: 112.5 },
        { x: 125, y: 137.5 },
        { x: 125, y: 125 },
        { x: 100, y: 125 },
      ];

      const Arrow = new fabric.Polygon(ArrowPoints, {
        fill: 'blue', // Replace with the appropriate color
        type: 'shape',
        left,
        top,
        angle
      });

      return Arrow;
    }

    const unGroup = function (group: fabric.Group) {
      let items = group._objects;
      group._restoreObjectsState();
      canvas?.remove(group);
      canvas?.renderAll();
      for (let i = 0; i < items.length; i++) {
        canvas?.add(items[i]);
      }
      canvas?.renderAll();
    };

    function createCircleWithText(left: number, top: number) {

      const text = new fabric.Textbox(`edit the text`, {
        left: left + 20,
        top: top + 20,
        fontSize: 16,
        fontFamily: 'Arial',
        editable: true,
        width: 80,
        height: 30,
        fill: theme.colorSchemes.light.palette.common.white,
      });

      const circle = new fabric.Circle({
        radius: 50,
        fill: theme.colorSchemes.light.palette.primary.main,
        stroke: theme.colorSchemes.light.palette.primary.main,
        top,
        left,
      });


      const CircleWithText = new fabric.Group([circle, text], {
        hasControls: true,
      });

      canvas?.add(CircleWithText);
      CircleWithText.on('mousedown', fabricDblClick(CircleWithText, function (obj: any) {
        unGroup(CircleWithText);
        canvas?.setActiveObject(text);
        text.enterEditing();
        text.selectAll();
      }));


    }
    
    switch (levels) {
      case 3:
        createCircleWithText(100, 100);
        canvas?.add(addArrow(220, 124, 0))
        canvas?.add(addArrow(197, 208, 56))
        canvas?.add(addArrow(337, 232, 120))
        createCircleWithText(292, 100);
        createCircleWithText(195, 258);  
        break;
      case 4:
        createCircleWithText(305, 35);
        createCircleWithText(305, 259);
        createCircleWithText(178, 148);
        createCircleWithText(436, 148);
        canvas?.add(addArrow(242, 132, 311))
        canvas?.add(addArrow(428, 85, 29))
        canvas?.add(addArrow(271, 227, 35))
        canvas?.add(addArrow(466, 263, 124))
        break;
      case 5:
        createCircleWithText(330, 17);
        createCircleWithText(476, 133);
        createCircleWithText(191, 133);
        createCircleWithText(262, 307);
        createCircleWithText(452, 307);
        canvas?.add(addArrow(256, 116, -51))
        canvas?.add(addArrow(465, 76, 31))
        canvas?.add(addArrow(251, 320, 232))
        canvas?.add(addArrow(560, 265, 114))
        canvas?.add(addArrow(426, 394, 179))
        break;
      case 6:
        createCircleWithText(261, 24);
        createCircleWithText(461, 24);
        createCircleWithText(148, 169);
        createCircleWithText(571, 169);
        createCircleWithText(261, 327);
        createCircleWithText(461, 332);
        canvas?.add(addArrow(388, 38, 358))
        canvas?.add(addArrow(211, 140, 311))
        canvas?.add(addArrow(584, 102, 51))
        canvas?.add(addArrow(234, 336, 235))
        canvas?.add(addArrow(614, 301, 124))
        canvas?.add(addArrow(436, 408, 180))
        break;
    
      default:
        break;
    }

  }

  return {
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
    addCycle,
  };
}
