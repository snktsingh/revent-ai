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
  const title = new fabric.IText('Click to add a title', {
    left: 30,
    top: 30,
    width: 600,
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Red Hat Display, sans-serif',
    type: 'text',
  });

  const subtitle = new fabric.IText('Click to add a subtitle', {
    left: 100,
    top: 100,
    width: 200,
    fontSize: 20,
    fontFamily: 'Arial',
    type: 'text',
  });

  const heading = new fabric.IText('Click to add a heading', {
    left: 100,
    top: 50,
    width: 300,
    fontSize: 30,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    type: 'text',
  });

  const paragraph = new fabric.IText('Click to add a paragraph', {
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

  const text = `Click to add a bullet point`;

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
    fabric.Object.prototype.controls.deleteControl = fabric.Textbox.prototype.controls.deleteControl= new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: 'pointer',
      mouseUpHandler: deleteObject,
      render: renderIcon,
    });

    fabric.Object.prototype.controls.clone = fabric.Textbox.prototype.controls.clone = new fabric.Control({
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
      canvas?.remove(canvas?.getActiveObject()!);
      const groupObjects = (canvas?.getActiveObject()  as fabric.Group)?.getObjects();
      if(groupObjects){
        groupObjects.forEach((obj:any) => {
          canvas?.remove(obj);
        });
      }
   
      canvas?.discardActiveObject();
      canvas?.renderAll();
      return true;
    }

    function cloneObject(
      eventData: MouseEvent,
      transformData: fabric.Transform,
      x: number,
      y: number
    ): boolean {
      const target = transformData.target;
      const canvas = target.canvas;
    
      if (target instanceof fabric.Group) {
        // Clone each object in the group
        const groupObjects = target.getObjects();
        groupObjects.forEach((obj) => {
          obj.clone(function (cloned: fabric.Object) {
            cloned.left! += cloned.width!+200;
            cloned.top! += 200;
            canvas?.add(cloned);
          });
        });
      } else {
        // Clone a single object
        target.clone(function (cloned: fabric.Object) {
          cloned.left! += 20;
          cloned.top! += 20;
          canvas?.add(cloned);
        });
      }
    
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

  //Quotes

  const addQuotes = () => {
    let text = new fabric.IText("❝Click to add a quote❞", {
      left: 150,
      top: 200,
      width: 300,
      height: 40,
      fill: 'black',
      fontSize: 28,
      hasRotatingPoint: false,
      selectable: true,
      cursorColor:theme.colorSchemes.light.palette.primary.main
    })

    
    return text;
  }

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

    // function createCell(left: number, top: number, i: number, j: number) {
    //   const cell = new fabric.Rect({
    //     width: cellWidth,
    //     height: cellHeight,
    //     fill: 'transparent',
    //     stroke: 'black',
    //     strokeWidth: 0.5,
    //     selectable: false,
    //     left: tableLeft + (j * cellWidth),
    //     top: tableTop + (i * cellHeight),
    //   });

    //   const text = new fabric.Textbox(`Cell ${i + 1},${j + 1}`, {
    //     left: cell.left! + cellPadding,
    //     top: cell.top! + cellPadding,
    //     fontSize: 16,
    //     width: cellWidth - (2 * cellPadding),
    //     height: cellHeight - (2 * cellPadding),
    //     fontFamily: 'Arial',
    //     editable: true,
    //     hasControls: false,
    //     hasBorders: false,
    //   });
    //   canvas.add(text)
    //   canvas.add(cell)
    //   const table = new fabric.Group([cell, text], {
    //     hasBorders: true,
    //     hasControls: true,
    //   });

    // table.on('mousedown', fabricDblClick(table, function (obj: any) {
    //   ungroup(table);
    //   canvas?.setActiveObject(text);
    //   text.enterEditing();
    //   text.selectAll();
    // }));



    //   return cell;
    // }


    // for (let i = 0; i < rows; i++) {
    //   for (let j = 0; j < cols; j++) {
    //     const cell = createCell(50, 50, i, j);
    //     const group = new fabric.Group([cell]);
    //     canvas?.add(group)
    //   }
    // }

    function createTable() {
      const tableElements = [];
      const texts = [];
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const cell = new fabric.Rect({
            width: cellWidth,
            height: cellHeight,
            fill: 'transparent',
            stroke: 'black',
            left: tableLeft + (j * cellWidth),
            top: tableTop + (i * cellHeight),
            selectable: false,
            hasBorders: false,
          });

          const text = new fabric.Textbox(`Row ${i + 1}, Col ${j + 1}`, {
            width: cellWidth - (2 * cellPadding),
            height: cellHeight - (2 * cellPadding),
            fontSize: 18,
            textAlign: 'center',
            left: cell.left! + cellPadding,
            top: cell.top! + cellPadding,
            selectable: true,
            backgroundColor: 'white',

          });

        
          tableElements.push(cell);
          texts?.push(text);
        }
      }

      const tableGroup = new fabric.Group(tableElements, {
        left: tableLeft,
        top: tableTop,
        hasBorders: true,
        hasControls: true,
      });

      canvas?.add(tableGroup);
      texts.forEach((el)=>{

        canvas?.add(el);
        el.setControlsVisibility({
          mt: false,
          mb: false,
          ml: false,
          mr: false,
          tr: true,
          tl: true,
          br: true,
          bl: true,
          mtr: false,
        })
      })

      tableGroup.setControlsVisibility({
        tl: true,
        tr: true,
        bl: true,
        br: true,
        ml: false,
        mt: false,
        mr: false,
        mb: false,
        mtr: false,
      });

    }

    createTable();

  };

  //pyramid

  const addPyramid = (lev: number, size: number, canvas: fabric.Canvas | null) => {

    let textsList: fabric.Textbox[] = [];
    let textLeft: number;
    switch (lev) {
      case 3:
        textLeft = 316
        break;
      case 4:
        textLeft = 360
        break;
      case 5:
        textLeft = 408
        break;
      default:
        break;
    }
    function createLevels(n: number) {
      let x1 = -140;
      let x2 = 140;
      let x3 = 100;
      let x4 = -100;
      let levels: fabric.Object[] = [];
      let trapTop = 0;
      let textTop = 219;
      for (let i = 1; i < n; i++) {
        let trapezoid = new fabric.Polygon([
          { x: x1, y: 0 },
          { x: x2, y: 0 },
          { x: x3, y: -60 },
          { x: x4, y: -60 },
        ], {
          fill: 'transparent',
          stroke: 'black',
          top: trapTop,
        });

        const text = new fabric.Textbox(`Level ${i + 1}`, {
          fontSize: 18,
          left: textLeft,
          top: textTop,
          width: 100
        })

        textTop += 60;

        trapTop = trapTop + 60;
        x1 = x1 - 40;
        x2 = x2 + 40;
        x3 = x3 + 40;
        x4 = x4 - 40
        textsList.push(text);
        levels.push(trapezoid);
      }

      let triangle = new fabric.Triangle({
        width: 200,
        height: 150,
        left: -101,
        top: -150,
        fill: 'transparent',
        stroke: 'black'
      });

      const text = new fabric.Textbox('Level 1', {
        fontSize: 18,
        left: textLeft,
        top: 160,
        width: 100
      })

      levels.push(triangle);
      textsList.push(text);
      return levels;
    }

    let pyramidLevels = createLevels(lev);

    let group = new fabric.Group(pyramidLevels, {
      left: 173,
      top: 46,
    });



    canvas?.add(group);
    canvas?.renderAll();
    textsList.forEach((el) => {
      canvas?.add(el)
    })
  }

  //funnel

  const addFunnel = (lev: number, size: number, canvas: fabric.Canvas | null) => {
    let rectTop: number;
    let rectLeft: number;
    let rectWidth: number;
    let rectHeight: number;

    switch (lev) {
      case 3:
        rectTop = 34;
        rectLeft = -80;
        rectWidth = 160;
        rectHeight = 100;
        break;
      case 4:
        rectLeft = -61;
        rectWidth = 121;
        rectHeight = 100;
        break;
      case 5:
        rectLeft = -40;
        rectWidth = 80;
        rectHeight = 100;
        break;
      default:
        break;
    }


    function createLevels(n: number) {
      let x1 = -120;
      let x2 = 120;
      let x3 = 140;
      let x4 = -140;
      let levels: fabric.Object[] = [];
      let trapTop = -60;
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

        trapTop = trapTop + 50;
        x1 = x1 + 20;
        x2 = x2 - 20;
        x3 = x3 - 20;
        x4 = x4 + 20
        levels.push(trapezoid);
      }
      let rect = new fabric.Rect({
        fill: 'transparent',
        stroke: 'black',
        width: rectWidth,
        height: rectHeight,
        top: trapTop,
        left: rectLeft
      });
      levels.push(rect);

      return levels;
    }
    let Funnel = createLevels(lev);
    let group = new fabric.Group(Funnel, {
      left: 50,
      top: 50,
    });

    function addText(left: number, top: number, textC: string) {
      let text = new fabric.Textbox(textC, {
        fontSize: 18,
        left,
        top,
        width: 140,
        editable: true,
        textAlign: 'center',
      });
      return canvas?.add(text)
    }

    canvas?.add(group);
    switch (lev) {
      case 3:
        addText(126, 66, 'Level 1');
        addText(126, 115, 'Level 2');
        addText(126, 166, 'Level 3');
        break;
      case 4:
        addText(126, 66, 'Level 1');
        addText(126, 115, 'Level 2');
        addText(126, 166, 'Level 3');
        addText(126, 214, 'Level 4');
        break;
      case 5:
        addText(126, 66, 'Level 1');
        addText(126, 115, 'Level 2');
        addText(126, 166, 'Level 3');
        addText(126, 214, 'Level 4');
        addText(126, 261, 'Level 5');
        break;
      case 6:
        addText(126, 66, 'Level 1');
        addText(126, 115, 'Level 2');
        addText(126, 166, 'Level 3');
        addText(126, 214, 'Level 4');
        addText(126, 261, 'Level 5');
        addText(126, 314, 'Level 6');
        break;

      default:
        break;
    }

    canvas?.renderAll();
  };

  //CYCLE 

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
      fill: theme.colorSchemes.light.palette.common.steelBlue,
      left,
      top,
      angle
    });

    return Arrow;
  }
  const addCycle = (levels: number, canvas: fabric.Canvas | null) => {


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

      const text = new fabric.Textbox(`Add Text`, {
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
  };

  //Timeline

  const addTimeline = (steps: number, canvas: fabric.Canvas | null) => {

    function addText(left: number, top: number, width: number, fontSize: number, textContent: string) {
      let text = new fabric.Textbox(textContent, {
        fontSize,
        originX: 'left',
        originY: 'top',
        top,
        left,
        width,
        fill: 'black'
      });
      return canvas?.add(text);
    }

    function addLine(left: number, top: number, width: number) {
      let line = new fabric.Line([50, 100, width, 100], {
        left,
        top,
        strokeWidth: 3,
        stroke: theme.colorSchemes.light.palette.common.steelBlue
      });
      return canvas?.add(line);
    }

    function addCircle(left: number, top: number) {
      let circle = new fabric.Circle({
        radius: 20,
        fill: theme.colorSchemes.light.palette.primary.main,
        top,
        left,
        stroke: theme.colorSchemes.light.palette.common.black
      })
      return canvas?.add(circle);
    }


    switch (steps) {
      case 3:
        addLine(126, 171, 150);
        addLine(267, 171, 200);
        addLine(456, 171, 200);
        addCircle(227, 152);
        addCircle(418, 152);
        addCircle(608, 152);
        addText(199, 126, 100, 14, 'Add Timeline');
        addText(398, 126, 100, 14, 'Add Timeline');
        addText(582, 126, 100, 14, 'Add Timeline');
        addText(208, 205, 150, 16, 'Add Text');
        addText(404, 205, 150, 16, 'Add Text');
        addText(596, 205, 150, 16, 'Add Text');
        break;
      case 4:
        addLine(39, 176, 150);
        addLine(180, 176, 200);
        addLine(369, 176, 200);
        addLine(562, 176, 200);
        addCircle(140, 157);
        addCircle(331, 157);
        addCircle(521, 157);
        addCircle(712, 157);
        addText(112, 131, 100, 14, 'Add Timeline');
        addText(311, 131, 100, 14, 'Add Timeline');
        addText(499, 131, 100, 14, 'Add Timeline');
        addText(684, 131, 100, 14, 'Add Timeline');
        addText(121, 210, 150, 16, 'Add Text');
        addText(317, 210, 150, 16, 'Add Text');
        addText(509, 210, 150, 16, 'Add Text');
        addText(701, 210, 150, 16, 'Add Text');
        break;
      case 5:
        addLine(28, 171, 120);
        addLine(139, 172, 200);
        addLine(328, 172, 200);
        addLine(521, 172, 200);
        addLine(712, 172, 200);
        addCircle(99, 153);
        addCircle(290, 153);
        addCircle(480, 153);
        addCircle(671, 153);
        addCircle(861, 153);
        addText(78, 126, 100, 14, 'Add Timeline');
        addText(270, 126, 100, 14, 'Add Timeline');
        addText(456, 126, 100, 14, 'Add Timeline');
        addText(643, 126, 100, 14, 'Add Timeline');
        addText(843, 126, 100, 14, 'Add Timeline');
        addText(84, 205, 150, 16, 'Add Text');
        addText(276, 205, 150, 16, 'Add Text');
        addText(468, 205, 150, 16, 'Add Text');
        addText(660, 205, 150, 16, 'Add Text');
        addText(854, 205, 150, 16, 'Add Text');
        break;
      case 6:
        addLine(6, 224, 100);
        addLine(95, 224, 180);
        addLine(266, 224, 180);
        addLine(435, 224, 180);
        addLine(606, 224, 180);
        addLine(776, 224, 180);
        addCircle(55, 205);
        addCircle(224, 205);
        addCircle(394, 205);
        addCircle(565, 205);
        addCircle(736, 205);
        addCircle(906,205);
        addText(34, 179, 100, 14, 'Add Timeline');
        addText(208, 179, 100, 14, 'Add Timeline');
        addText(370, 179, 100, 14, 'Add Timeline');
        addText(537, 179, 100, 14, 'Add Timeline');
        addText(718, 179, 100, 14, 'Add Timeline');
        addText(883, 179, 100, 14, 'Add Timeline');
        addText(40, 259, 150, 16, 'Add Text');
        addText(214, 259, 150, 16, 'Add Text');
        addText(382, 259, 150, 16, 'Add Text');
        addText(554, 259, 150, 16, 'Add Text');
        addText(729, 259, 150, 16, 'Add Text');
        addText(898, 259, 150, 16, 'Add Text');
        break;

      default:
        break;
    }

  };

  //Process

  function addProcess(steps: number, canvas: fabric.Canvas | null) {
    function addRectangle(left: number, top: number, width: number, height: number) {
      let rect = new fabric.Rect({
        left: left,
        top: top,
        width,
        height,
        fill: theme.colorSchemes.light.palette.primary.main,
        rx: 10,
        ry: 10
      })
      return canvas?.add(rect);
    }

    function addText(left: number, top: number) {
      const text = new fabric.Textbox("Add Text", {
        fontSize: 14,
        left,
        top,
        fill: 'white',
        width: 140
      });
      return canvas?.add(text);
    }

    switch (steps) {
      case 3:
        addRectangle(96, 124, 150, 100);
        addRectangle(332, 124, 150, 100);
        addRectangle(562, 124, 150, 100);
        canvas?.add(addArrow(264, 153, 0));
        canvas?.add(addArrow(498, 153, 0));
        addText(105, 130);
        addText(338, 130);
        addText(567, 130);
        break;
      case 4:
        addRectangle(11, 130, 150, 100);
        addRectangle(228, 130, 150, 100);
        addRectangle(441, 130, 150, 100);
        addRectangle(652, 130, 150, 100);
        canvas?.add(addArrow(169, 154, 0));
        canvas?.add(addArrow(388, 154, 0));
        canvas?.add(addArrow(598, 154, 0));
        addText(20, 136);
        addText(239, 136);
        addText(450, 136);
        addText(661, 136);
        break;
      case 5:
        addRectangle(96, 124, 150, 100);
        addRectangle(332, 124, 150, 100);
        addRectangle(562, 124, 150, 100);
        addRectangle(332, 288, 150, 100);
        addRectangle(562, 288, 150, 100);
        canvas?.add(addArrow(264, 153, 0));
        canvas?.add(addArrow(498, 153, 0));
        canvas?.add(addArrow(664, 231, 90));
        canvas?.add(addArrow(548, 362, 180));
        addText(105, 130);
        addText(338, 130);
        addText(567, 130);
        addText(341, 294);
        addText(571, 294);
        break;
      case 6:
        addRectangle(96, 124, 150, 100);
        addRectangle(332, 124, 150, 100);
        addRectangle(562, 124, 150, 100);
        addRectangle(332, 288, 150, 100);
        addRectangle(562, 288, 150, 100);
        addRectangle(96, 288, 150, 100);
        canvas?.add(addArrow(264, 153, 0));
        canvas?.add(addArrow(498, 153, 0));
        canvas?.add(addArrow(664, 231, 90));
        canvas?.add(addArrow(548, 362, 180));
        canvas?.add(addArrow(312, 362, 180));
        addText(105, 130);
        addText(338, 130);
        addText(567, 130);
        addText(341, 294);
        addText(571, 294);
        addText(105, 294);
        break;
      default:
        break;
    }
  };

  const addList = (canvas: fabric.Canvas | null) => {

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/**';
    fileInput.click();

    let file;
    let reader = new FileReader();
    fileInput.addEventListener('change', e => {
      file = (e.target as HTMLInputElement)?.files?.[0];
      if (file) {
        reader.onload = () => {
          if (canvas) {

            fabric.Image.fromURL(reader.result as string, img => {
              const fixedWidth = 100; // Set the fixed width you desire
              const fixedHeight = 120; // Set the fixed height you desire

              img.scaleToWidth(fixedWidth);
              img.scaleToHeight(fixedHeight);

              img.set({
                left: 100,
                top: 100,

              });

              const text = new fabric.Textbox('Text', {
                fontSize: 20,
                width: 100,
                height: 100,
                fill: 'black',
                left: 100,
                top: 230,
                textAlign:'center'
              })

              canvas?.add(img);
              canvas?.add(text);
              canvas?.renderAll();
            });
          }
        };
        reader.readAsDataURL(file);
      }
    });


  }

  return {
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
  };
}
