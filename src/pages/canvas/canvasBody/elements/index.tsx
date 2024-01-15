import React, { useState } from 'react';
import { fabric } from 'fabric';
import { Copy, DeleteX, AddPlus, imageIcon } from '@/constants/media';
import { theme } from '@/constants/theme';
import { handleInputSize, updateCanvasInList } from '@/redux/reducers/canvas';
import { useAppDispatch } from '@/redux/store';
import { IText } from 'fabric/fabric-impl';

export interface IExtendedTextboxOptions extends fabric.ITextboxOptions {
  listType?: string;
  listBullet?: string;
  listCounter?: number;
  _renderTextLine?: Function;
}

export interface RectContainer extends fabric.Rect {
  id: string;
  name: string;
}
export default function useAllElements() {
  const dispatch = useAppDispatch();

  const title = new fabric.IText('Click to add a title', {
    left: 30,
    top: 30,
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Red Hat Display, sans-serif',
    name: 'title',
  });

  const subtitle = new fabric.IText('Click to add a subtitle', {
    left: 100,
    top: 100,
    width: 200,
    fontSize: 20,
    fontFamily: 'Arial',
    name: 'subTitle',
  });

  const heading = new fabric.IText('Click to add a heading', {
    left: 100,
    top: 50,
    width: 300,
    fontSize: 30,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    name: 'headingbox',
  });

  const paragraph = new fabric.IText('Click to add a paragraph', {
    left: 100,
    top: 150, // Adjust the position as needed
    width: 600, // Adjust the width as needed
    lineHeight: 1.5,
    fontSize: 16, // Adjust the font size as needed
    fontFamily: 'Arial',
    name: 'paragraphbox',
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
    name: 'bullet',
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
                name: 'image',
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

  //**************************************************Custom Border Icons********************************************************
  const CustomBorderIcons = (canvas: fabric.Canvas | null) => {
    var img = new Image();
    img.src = DeleteX;
    var cloneImg = new Image();
    cloneImg.src = Copy;

    fabric.Object.prototype.controls.deleteControl =
      fabric.Textbox.prototype.controls.deleteControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: -16,
        offsetX: 16,
        cursorStyle: 'pointer',
        mouseUpHandler: deleteObject,
        render: renderIcon,
      });

    fabric.Object.prototype.controls.clone =
      fabric.Textbox.prototype.controls.clone = new fabric.Control({
        x: -0.5,
        y: -0.5,
        offsetY: -16,
        offsetX: -16,
        cursorStyle: 'pointer',
        mouseUpHandler: cloneObject,
        render: renderCloneIcon,
      });

    const deleteObjectsByName = (names: string[]) => {
      canvas?.forEachObject(obj => {
        if (names.includes(obj.name || '')) {
          canvas.remove(obj);
        }
      });
      canvas?.renderAll();
    };

    function deleteObject(eventData: MouseEvent): boolean {
      const activeObject = canvas?.getActiveObject();

      if (activeObject) {
        const objectsToDelete: string[] = [];

        switch (activeObject.name) {
          case 'Process_Container':
            objectsToDelete.push('ProcessBox', 'ProcessText', 'ProcessArrow');
            break;
          case 'Timeline_Container':
            objectsToDelete.push(
              'timeLineCircle',
              'TimeLineText',
              'TimeLineDirection',
              'TimeLineHeading'
            );
            break;
          case 'PYRAMID':
            objectsToDelete.push('Pyramid_LEVEL', 'pyramidTextbox');
            break;
          case 'Funnel':
            objectsToDelete.push('Funnel_Text', 'Funnel_Base', 'Funnel_Level');
            break;
          case 'Cycle_Container':
            objectsToDelete.push('Cycle_Arrow', 'Cycle_Circle', 'Cycle_Text');
            break;
          case 'List_Container':
            objectsToDelete.push('listText', 'listImage', 'ListAddImageText');
            break;
          case 'Table_Container':
            objectsToDelete.push('Table_Text');
            break;
          default:
            break;
        }

        deleteObjectsByName(objectsToDelete);

        if (activeObject instanceof fabric.Group) {
          const groupObjects = activeObject.getObjects();
          groupObjects.forEach(obj => {
            canvas?.remove(obj);
          });
        }

        canvas?.remove(activeObject);
        canvas?.discardActiveObject();
        canvas?.renderAll();
      }

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
        groupObjects.forEach(obj => {
          obj.clone(function (cloned: fabric.Object) {
            cloned.left! += cloned.width! + 200;
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

  const ColorFillForObjects = (
    selectedObject: fabric.Object | null | undefined,
    canvas: fabric.Canvas | null,
    color: string
  ) => {
    if (selectedObject?.type == 'shape') {
      selectedObject.set('fill', color);
      canvas?.renderAll();
    } else if (
      selectedObject?.type == 'text' ||
      selectedObject?.type == 'textbox'
    ) {
      selectedObject.set('backgroundColor', color);
      canvas?.renderAll();
    }
  };

  const ColorForText = (
    selectedObject: fabric.Object | null | undefined,
    canvas: fabric.Canvas | null,
    textColor: string
  ) => {
    if (selectedObject?.type == 'text' || selectedObject?.type == 'textbox') {
      selectedObject.set('fill', textColor);
      canvas?.renderAll();
    }
  };

  const ColorForBorder = (
    selectedObject: fabric.Object | null | undefined,
    canvas: fabric.Canvas | null,
    borderColor: string
  ) => {
    if (selectedObject) {
      selectedObject.set('stroke', borderColor);
      canvas?.renderAll();
    }
  };

  const handleBold = (activeObj: any, canvas: fabric.Canvas | null) => {
    if (
      (activeObj && activeObj[0]?.type === 'text') ||
      activeObj[0]?.type == 'textbox'
    ) {
      activeObj[0].setSelectionStyles(
        { fontWeight: 'bold' },
        activeObj[0].selectionStart,
        activeObj[0].selectionEnd
      );
      canvas?.renderAll();
    }
  };

  const handleItalic = (activeObj: any, canvas: fabric.Canvas | null) => {
    if (
      (activeObj && activeObj[0]?.type === 'text') ||
      activeObj[0]?.type == 'textbox'
    ) {
      activeObj[0].setSelectionStyles(
        { fontStyle: 'italic' },
        activeObj[0].selectionStart,
        activeObj[0].selectionEnd
      );
      canvas?.renderAll();
    }
  };

  const handleUnderLine = (activeObj: any, canvas: fabric.Canvas | null) => {
    if (
      (activeObj && activeObj[0]?.type === 'text') ||
      activeObj[0]?.type == 'textbox'
    ) {
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

  //*****************************************************Quotes element**********************************************************

  const addQuotes = () => {
    let text = new fabric.IText('❝Click to add a quote❞', {
      left: 150,
      top: 200,
      width: 300,
      height: 40,
      fill: 'black',
      fontSize: 28,
      hasRotatingPoint: false,
      selectable: true,
      name: 'quotes',
      cursorColor: theme.colorSchemes.light.palette.primary.main,
      type: 'textbox',
    });

    return text;
  };

  //*****************************************************Table element**********************************************************
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

  const addTable = (
    rows: number,
    cols: number,
    cellWidth: number,
    cellHeight: number,
    canvas: fabric.Canvas | null
  ) => {
    const cellPadding = 6;
    const tableLeft = 50;
    const tableTop = 50;

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
            left: tableLeft + j * cellWidth,
            top: tableTop + i * cellHeight,
            selectable: false,
            hasBorders: false,
          });

          const text = new fabric.Textbox(`Row ${i + 1}, Col ${j + 1}`, {
            width: cellWidth - 2 * cellPadding,
            height: cellHeight - 2 * cellPadding,
            fontSize: 18,
            textAlign: 'center',
            left: cell.left! + cellPadding,
            top: cell.top! + cellPadding,
            selectable: true,
            backgroundColor: theme.colorSchemes.light.palette.common.white,
            name: 'Table_Text',
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
        name: 'Table_Container',
      });

      canvas?.add(tableGroup);
      texts.forEach(el => {
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
        });
      });

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

  //*****************************************************Pyramid element**********************************************************
  const addPyramidLevel = (canvas: fabric.Canvas) => {
    let lastLevel: any;
    let lastText: any;
    canvas.forEachObject(obj => {
      if (obj.name == 'pyramidTextbox') {
        lastText = obj;
      }
    });
    let activeObject = canvas.getActiveObject();
    if (activeObject?.type == 'group' && activeObject.name === 'PYRAMID') {
      (activeObject as fabric.Group).forEachObject(obj => {
        lastLevel = obj;
      });
    }
    if (lastLevel && lastText) {
      let trapezoid = new fabric.Polygon(
        [
          { x: lastLevel.points[0].x - 40, y: 0 },
          { x: lastLevel.points[1].x + 40, y: 0 },
          { x: lastLevel.points[2].x + 40, y: -60 },
          { x: lastLevel.points[3].x - 40, y: -60 },
        ],
        {
          fill: 'transparent',
          stroke: 'black',
          top:
            (activeObject as fabric.Group)?.getScaledHeight() +
            (activeObject as fabric.Group).top! -
            1,
          left: (activeObject as fabric.Group).left! - 40,
          name: 'Pyramid_LEVEL',
        }
      );

      const text = new fabric.Textbox('Add Text', {
        fontSize: 18,
        left: lastText.left,
        top: trapezoid.top! + 20,
        width: 100,
        name: 'pyramidTextbox',
      });

      (activeObject as fabric.Group).addWithUpdate(trapezoid);
      canvas.add(text);
      canvas?.requestRenderAll();
    }
  };

  const addPyramid = (canvas: fabric.Canvas | null) => {
    let x1 = -140;
    let x2 = 140;
    let x3 = 100;
    let x4 = -100;

    let trapTop = 0;
    let group: fabric.Group;
    let textsList: fabric.Textbox[] = [];
    let textLeft: number;

    function createLevels(n: number) {
      let levels: fabric.Object[] = [];

      let triangle = new fabric.Triangle({
        width: 200,
        height: 150,
        left: -101,
        top: -150,
        fill: 'transparent',
        stroke: 'black',
      });
      const text = new fabric.Textbox('Add Text', {
        fontSize: 18,
        left: 274,
        top: 137,
        width: 100,
        name: 'pyramidTextbox',
      });

      textsList.push(text);
      levels.push(triangle);
      for (let i = 1; i < n; i++) {
        let trapezoid = new fabric.Polygon(
          [
            { x: x1, y: 0 },
            { x: x2, y: 0 },
            { x: x3, y: -60 },
            { x: x4, y: -60 },
          ],

          {
            fill: 'transparent',
            stroke: 'black',
            top: trapTop,
            name: 'Pyramid_LEVEL',
          }
        );

        const text = new fabric.Textbox('Add Text', {
          fontSize: 18,
          left: 274,
          top: 213,
          width: 100,
          name: 'pyramidTextbox',
        });

        trapTop = trapTop + 60;
        x1 = x1 - 40;
        x2 = x2 + 40;
        x3 = x3 + 40;
        x4 = x4 - 40;
        textsList.push(text);
        levels.push(trapezoid);
      }

      return levels;
    }

    let pyramidLevels = createLevels(2);

    group = new fabric.Group(pyramidLevels, {
      left: 173,
      top: 46,
      name: 'PYRAMID',
    });

    canvas?.add(group);

    textsList.forEach(el => {
      canvas?.add(el);
    });

    canvas?.requestRenderAll();
  };

  //*****************************************************Funnel element**********************************************************

  function addFunnelLev(canvas: fabric.Canvas) {
    let lastLevel: any;

    let funnelGroup = canvas.getActiveObject();
    if (funnelGroup?.name === 'Funnel' && funnelGroup.type == 'group') {
      (funnelGroup as fabric.Group).forEachObject(object => {
        if (object.name == 'Funnel_Level') {
          lastLevel = object;
        }
      });
    }

    let trapezoid = new fabric.Polygon(
      [
        { x: lastLevel.points[0].x - 20, y: 0 },
        { x: lastLevel.points[1].x + 20, y: 0 },
        { x: lastLevel.points[2].x + 20, y: -50 },
        { x: lastLevel.points[3].x - 20, y: -50 },
      ],
      {
        fill: 'transparent',
        stroke: 'black',
        name: 'Funnel_Level',
        top: funnelGroup?.top! - 50,
        left: funnelGroup?.left! - 20,
      }
    );

    (funnelGroup as fabric.Group)?.addWithUpdate(trapezoid);

    let texts: any[] = [];
    canvas.forEachObject((object, i) => {
      if (object.name == 'Funnel_Text') {
        texts.push(object);
        object.set({ top: object.top! - 50 }); // Adjust the shift amount as needed
        object.setCoords(); // Update object coordinates
      }
    });
    let text = new fabric.Textbox('Add Text', {
      fontSize: 18,
      left: texts[texts.length - 1].left,
      top: texts[texts.length - 1].top + 50,
      width: 140,
      editable: true,
      textAlign: 'center',
      name: 'Funnel_Text',
    });

    canvas.add(text);
    canvas.requestRenderAll();
  }

  const addFunnel = (canvas: fabric.Canvas | null) => {
    function createLevels(n: number) {
      let x1 = -80;
      let x2 = 80;
      let x3 = 100;
      let x4 = -100;
      let levels: fabric.Object[] = [];
      let trapTop = -60;
      for (let i = 1; i <= n; i++) {
        let trapezoid = new fabric.Polygon(
          [
            { x: x1, y: 0 },
            { x: x2, y: 0 },
            { x: x3, y: -50 },
            { x: x4, y: -50 },
          ],
          {
            fill: 'transparent',
            stroke: 'black',
            top: trapTop,
            name: 'Funnel_Level',
          }
        );

        trapTop = trapTop - 50;
        x1 = x1 - 20;
        x2 = x2 + 20;
        x3 = x3 + 20;
        x4 = x4 - 20;
        levels.push(trapezoid);
      }

      let rect = new fabric.Rect({
        fill: 'transparent',
        stroke: 'black',
        width: 160,
        height: 100,
        top: -10,
        left: -80,
        name: 'Funnel_Base',
      });
      levels.push(rect);

      return levels;
    }
    let Funnel = createLevels(2);
    let group = new fabric.Group(Funnel, {
      left: 325,
      top: 253,
      name: 'Funnel',
    });

    canvas?.add(group);

    function addText(left: number, top: number, textC: string) {
      let text = new fabric.Textbox(textC, {
        fontSize: 18,
        left,
        top,
        width: 140,
        editable: true,
        textAlign: 'center',
        name: 'Funnel_Text',
      });
      return canvas?.add(text);
    }

    addText(376, 268, 'Add Text');
    addText(377, 319, 'Add Text');

    canvas?.requestRenderAll();
  };

  //*****************************************************Cycle element**********************************************************

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
      angle,
      name: 'Cycle_Arrow',
    });

    return Arrow;
  };

  function addCycleStep(canvas: fabric.Canvas) {
    let mainContainer: fabric.Object;
    let arrows: fabric.Object[] = [];
    let Circles: fabric.Object[] = [];
    let texts: fabric.Object[] = [];
    canvas.forEachObject(obj => {
      if (obj.name == 'Cycle_Container') {
        mainContainer = obj;
        canvas.remove(obj);
      }

      if (obj.name == 'Cycle_Arrow') {
        arrows.push(obj);
        canvas.remove(obj);
      }
      if (obj.name == 'Cycle_Circle') {
        Circles.push(obj);
        canvas.remove(obj);
      }
      if (obj.name == 'Cycle_Text') {
        texts.push(obj);
      }
    });
    const addCircle = (left: number, top: number) => {
      const circle = new fabric.Circle({
        radius: 50,
        fill: theme.colorSchemes.light.palette.primary.main,
        stroke: theme.colorSchemes.light.palette.primary.main,
        top,
        left,
        name: 'Cycle_Circle',
      });
      return canvas.add(circle);
    };

    const addText = (left: number, top: number) => {
      const text = new fabric.Textbox('Add Text', {
        width: 80,
        fontSize: 16,
        fontFamily: 'Arial',
        fill: theme.colorSchemes.light.palette.common.white,
        top,
        left,
        name: 'Cycle_Text',
      });
      return canvas.add(text);
    };
    switch (Circles.length + 1) {
      // case 3:
      //   createCircleWithText(100, 100);
      //   canvas?.add(addArrow(220, 124, 0));
      //   canvas?.add(addArrow(197, 208, 56));
      //   canvas?.add(addArrow(337, 232, 120));
      //   createCircleWithText(292, 100);
      //   createCircleWithText(195, 258);
      //   break;
      case 4:
        mainContainer!.set({
          width: 382,
          height: 324,
          top: 35,
          left: 178,
        });
        canvas.add(mainContainer!);

        addCircle(305, 35);
        addCircle(305, 259);
        addCircle(178, 148);
        addCircle(436, 148);
        canvas?.add(addArrow(242, 132, 311));
        canvas?.add(addArrow(428, 85, 29));
        canvas?.add(addArrow(279, 298, 221));
        canvas?.add(addArrow(466, 263, 124));
        canvas.bringToFront(texts[0]);
        canvas.bringToFront(texts[1]);
        canvas.bringToFront(texts[2]);
        addText(320, 275);
        texts[0]
          .set({
            left: 198,
            top: 165,
          })
          .setCoords();
        texts[1]
          .set({
            left: 320,
            top: 54,
          })
          .setCoords();
        texts[2]
          .set({
            left: 452,
            top: 166,
          })
          .setCoords();

        canvas?.requestRenderAll();
        break;
      case 5:
        mainContainer!.set({
          width: 386,
          height: 391,
          top: 17,
          left: 191,
        });
        canvas.add(mainContainer!);
        addCircle(330, 17);
        addCircle(476, 133);
        addCircle(191, 133);
        addCircle(262, 307);
        addCircle(452, 307);
        canvas?.add(addArrow(256, 116, -51));
        canvas?.add(addArrow(465, 76, 31));
        canvas?.add(addArrow(251, 320, 232));
        canvas?.add(addArrow(560, 265, 114));
        canvas?.add(addArrow(426, 394, 179));
        canvas.bringToFront(texts[0]);
        canvas.bringToFront(texts[1]);
        canvas.bringToFront(texts[2]);
        canvas.bringToFront(texts[3]);
        addText(277, 325);
        texts[0]
          .set({
            left: 217,
            top: 162,
          })
          .setCoords();
        texts[1]
          .set({
            left: 354,
            top: 36,
          })
          .setCoords();
        texts[2]
          .set({
            left: 501,
            top: 153,
          })
          .setCoords();
        texts[3]
          .set({
            left: 478,
            top: 322,
          })
          .setCoords();
        canvas?.requestRenderAll();
        break;
      case 6:
        mainContainer!.set({
          width: 524,
          height: 409,
          top: 24,
          left: 148,
        });
        canvas.add(mainContainer!);
        addCircle(261, 24);
        addCircle(461, 24);
        addCircle(148, 169);
        addCircle(571, 169);
        addCircle(261, 327);
        addCircle(461, 332);
        canvas?.add(addArrow(388, 38, 358));
        canvas?.add(addArrow(211, 140, 311));
        canvas?.add(addArrow(584, 102, 51));
        canvas?.add(addArrow(234, 336, 235));
        canvas?.add(addArrow(614, 301, 124));
        canvas?.add(addArrow(436, 408, 180));
        canvas.bringToFront(texts[0]);
        canvas.bringToFront(texts[1]);
        canvas.bringToFront(texts[2]);
        canvas.bringToFront(texts[3]);
        canvas.bringToFront(texts[4]);
        addText(274, 346);
        texts[0]
          .set({
            left: 162,
            top: 186,
          })
          .setCoords();
        texts[1]
          .set({
            left: 276,
            top: 40,
          })
          .setCoords();
        texts[2]
          .set({
            left: 481,
            top: 43,
          })
          .setCoords();
        texts[3]
          .set({
            left: 580,
            top: 189,
          })
          .setCoords();
        texts[4]
          .set({
            left: 474,
            top: 346,
          })
          .setCoords();
        canvas?.requestRenderAll();
        break;
      default:
        break;
    }

    canvas?.renderAll();
  }

  const addCycle = (canvas: fabric.Canvas | null) => {
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
        name: 'Cycle_Text',
      });

      const circle = new fabric.Circle({
        radius: 50,
        fill: theme.colorSchemes.light.palette.primary.main,
        stroke: theme.colorSchemes.light.palette.primary.main,
        top,
        left,
        name: 'Cycle_Circle',
      });

      canvas?.add(circle, text);
    }
    const mainCycleContainer = new fabric.Rect({
      left: 267,
      top: 92,
      width: 293,
      height: 259,
      fill: 'transparent',
      strokeWidth: 1,
      stroke: 'transparent',
      name: 'Cycle_Container',
    });

    canvas?.add(mainCycleContainer);
    canvas?.setActiveObject(mainCycleContainer);

    canvas?.add(addArrow(387, 116, 0));
    canvas?.add(addArrow(349, 264, 236));
    canvas?.add(addArrow(504, 224, 120));
    createCircleWithText(267, 92);
    createCircleWithText(459, 92);
    createCircleWithText(362, 250);

    canvas?.requestRenderAll();
  };

  //*****************************************************Timeline element**********************************************************

  const addTimelineStep = (canvas: fabric.Canvas) => {
    let lastCircle: any;
    let mainContainer: any;

    canvas.forEachObject(obj => {
      if (obj.name == 'timeLineCircle') {
        lastCircle = obj;
      }
      if (obj.name == 'Timeline_Container') {
        mainContainer = obj;
      }
    });

    let line = new fabric.Line([50, 100, 200, 100], {
      left: lastCircle.left + 40,
      top: mainContainer.top + 20 + 45,
      strokeWidth: 3,
      stroke: theme.colorSchemes.light.palette.common.steelBlue,
      name: 'TimeLineDirection',
    });

    canvas?.add(line);

    let circle = new fabric.Circle({
      radius: 20,
      fill: theme.colorSchemes.light.palette.primary.main,
      top: mainContainer.top + 20 + 26,
      left: lastCircle.left + 180,
      stroke: theme.colorSchemes.light.palette.common.black,
      name: 'timeLineCircle',
    });

    canvas?.add(circle);

    function addText(
      left: number,
      top: number,
      width: number,
      fontSize: number,
      textContent: string,
      timelineName: string
    ) {
      let text = new fabric.Textbox(textContent, {
        fontSize,
        originX: 'left',
        originY: 'top',
        top,
        left,
        width,
        fill: 'black',
        name: timelineName,
      });
      return canvas?.add(text);
    }

    addText(
      lastCircle.left + 170,
      mainContainer.top + 20,
      100,
      14,
      'Add Timeline',
      'TimeLineHeading'
    );
    addText(
      lastCircle.left + 170,
      mainContainer.top + 20 + 79,
      150,
      16,
      'Add Text',
      'TimeLineText'
    );

    canvas.forEachObject(obj => {
      if (obj.name == 'Timeline_Container') {
        obj.set({
          width: obj.width! + 100,
        });
      }
    });

    canvas?.renderAll();
  };

  const addTimeline = (canvas: fabric.Canvas | null) => {
    function addText(
      left: number,
      top: number,
      width: number,
      fontSize: number,
      textContent: string,
      timelineName: string
    ) {
      let text = new fabric.Textbox(textContent, {
        fontSize,
        originX: 'left',
        originY: 'top',
        top,
        left,
        width,
        fill: 'black',
        name: timelineName,
      });
      return canvas?.add(text);
    }

    function addLine(left: number, top: number, width: number) {
      let line = new fabric.Line([50, 100, width, 100], {
        left,
        top,
        strokeWidth: 3,
        stroke: theme.colorSchemes.light.palette.common.steelBlue,
        name: 'TimeLineDirection',
      });
      return canvas?.add(line);
    }

    function addCircle(left: number, top: number) {
      let circle = new fabric.Circle({
        radius: 20,
        fill: theme.colorSchemes.light.palette.primary.main,
        top,
        left,
        stroke: theme.colorSchemes.light.palette.common.black,
        name: 'timeLineCircle',
      });
      return canvas?.add(circle);
    }

    const mainTimelineContainer = new fabric.Rect({
      left: 20,
      top: 120,
      width: 550,
      height: 150,
      fill: 'transparent',
      strokeWidth: 1,
      stroke: 'transparent',
      name: 'Timeline_Container',
    });

    canvas?.add(mainTimelineContainer);
    canvas?.setActiveObject(mainTimelineContainer);

    let mTop: number = mainTimelineContainer.top!;
    addLine(29, mTop + 20 + 45, 150);
    addLine(170, mTop + 20 + 45, 200);
    addCircle(130, mTop + 20 + 26);
    addCircle(321, mTop + 20 + 26);
    addText(102, mTop + 20, 100, 14, 'Add Timeline', 'TimeLineHeading');
    addText(111, mTop + 20 + 79, 150, 16, 'Add Text', 'TimeLineText');
    addText(301, mTop + 20, 100, 14, 'Add Timeline', 'TimeLineHeading');
    addText(307, mTop + 20 + 79, 150, 16, 'Add Text', 'TimeLineText');
  };

  //*****************************************************Process element**********************************************************

  const addProcessSteps = (canvas: fabric.Canvas) => {
    let lastRect: any;
    let mainContainer: any;

    canvas.forEachObject(obj => {
      if (obj.name === 'ProcessBox') {
        lastRect = obj;
      }
      if (obj.name == 'Process_Container') {
        mainContainer = obj;
      }
    });

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
      left: lastRect.left + 170,
      top: mainContainer.top + 40,
      angle: 0,
      name: 'ProcessArrow',
    });

    let rect = new fabric.Rect({
      left: Arrow.left! + 60,
      top: mainContainer.top + 20,
      width: 150,
      height: 100,
      fill: theme.colorSchemes.light.palette.primary.main,
      rx: 10,
      ry: 10,
      name: 'ProcessBox',
    });

    let text = new fabric.Textbox('Add Text', {
      fontSize: 14,
      left: rect.left! + 5,
      top: rect.top! + 5,
      fill: theme.colorSchemes.light.palette.common.white,
      width: 140,
      name: 'ProcessText',
      hasBorders: false,
      hasControls: false,
    });

    canvas.forEachObject(obj => {
      if (obj.name == 'Process_Container') {
        obj.set({
          width: obj.width! + 150,
        });
      }
    });

    canvas.add(rect);
    canvas.add(Arrow);
    canvas.add(text);

    canvas.renderAll();
  };

  function addProcess(canvas: fabric.Canvas | null) {
    function addRectangle(
      left: number,
      top: number,
      width: number,
      height: number
    ) {
      let rect = new fabric.Rect({
        left: left,
        top: top,
        width,
        height,
        fill: theme.colorSchemes.light.palette.primary.main,
        rx: 10,
        ry: 10,
        name: 'ProcessBox',
      });
      return canvas?.add(rect);
    }
    function addText(left: number, top: number) {
      const text = new fabric.Textbox('Add Text', {
        fontSize: 14,
        left,
        top,
        fill: theme.colorSchemes.light.palette.common.white,
        width: 140,
        name: 'ProcessText',
      });
      return canvas?.add(text);
    }
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
        angle,
        name: 'ProcessArrow',
      });

      return Arrow;
    };

    const mainProcessContainer = new fabric.Rect({
      left: 70,
      top: 120,
      width: 550,
      height: 150,
      fill: 'transparent',
      strokeWidth: 1,
      stroke: 'transparent',
      name: 'Process_Container',
    });

    canvas?.add(mainProcessContainer);
    canvas?.setActiveObject(mainProcessContainer);

    canvas?.add(addArrow(250, mainProcessContainer.top! + 40, 0));
    addRectangle(
      mainProcessContainer.left! + 10,
      mainProcessContainer.top! + 20,
      150,
      100
    );
    addRectangle(310, mainProcessContainer.top! + 20, 150, 100);
    addText(96, 146);
    addText(326, 146);
  }
  //*****************************************************List element**********************************************************
  const addListElement = (
    canvas: fabric.Canvas | null,
    left: number,
    top: number
  ) => {
    const mainListContainer = new fabric.Rect({
      width: 200,
      height: 250,
      fill: 'transparent',
      strokeWidth: 1,
      stroke: '#cbcbcb',
      name: 'List_Container',
    });

    const addImage = new fabric.Text('+ Add Image', {
      top: mainListContainer.top! + 80,
      left: mainListContainer.left! + 50,
      fill: 'black',
      fontSize: 20,
      hasControls: false,
      selectable: false,
      hoverCursor: 'pointer',
      name: 'ListAddImageText',
    });
    let group = new fabric.Group([mainListContainer, addImage], {
      left,
      top,
      name: 'LIST_ELEMENT',
    });

    const text = new fabric.Textbox('Text', {
      fontSize: 20,
      width: 180,
      height: 100,
      fill: 'black',
      left: group.left! + 8,
      top: group.getScaledHeight() - 10,
      textAlign: 'center',
      name: 'listText',
    });

    // canvas?.add(mainListContainer);
    // canvas?.add(addImage);
    canvas?.add(group);
    canvas?.add(text);
    canvas?.renderAll();
  };

  //HandleObjectMoving

  interface FabricObject extends fabric.Object {
    lastLeft: number;
    lastTop: number;
  }

  const handleObjectMoving = (
    options: fabric.IEvent<MouseEvent>,
    canvas: fabric.Canvas
  ) => {
    const movedObject = options.target as FabricObject | undefined;
    if (movedObject) {
      movedObject.setCoords();

      if (movedObject?.name === 'PYRAMID') {
        const lastLeft = movedObject.get('lastLeft') || movedObject.left;
        const lastTop = movedObject.get('lastTop') || movedObject.top;

        var deltaX = movedObject.left! - lastLeft!;
        var deltaY = movedObject.top! - lastTop!;

        canvas.forEachObject(function (obj) {
          let left;
          let top;

          if (
            obj.name === 'pyramidTextbox' &&
            obj.intersectsWithObject(movedObject!, true, true)
          ) {
            obj
              .set({
                left: obj.left! + deltaX,
                top: obj.top! + deltaY,
                name: 'pyramidTextbox',
              })
              .setCoords();
            left = obj.left! + deltaX;
            top = obj.top! + deltaY;
          }
        });

        movedObject.set({
          lastLeft: movedObject.left,
          lastTop: movedObject.top,
        });
      } else if (movedObject?.name === 'Process_Container') {
        const lastLeft = movedObject.get('lastLeft') || movedObject.left;
        const lastTop = movedObject.get('lastTop') || movedObject.top;

        var deltaX = movedObject.left! - lastLeft!;
        var deltaY = movedObject.top! - lastTop!;

        canvas.forEachObject(function (obj) {
          let left;
          let top;

          if (
            obj.name === 'ProcessBox' &&
            obj.intersectsWithObject(movedObject, true, true)
          ) {
            obj
              .set({
                left: obj.left! + deltaX,
                top: obj.top! + deltaY,
              })
              .setCoords();
            left = obj.left! + deltaX;
            top = obj.top! + deltaY;
          }

          if (
            obj.name == 'ProcessText' &&
            obj.intersectsWithObject(movedObject, true, true)
          ) {
            obj
              .set({
                left: obj.left! + deltaX,
                top: obj.top! + deltaY,
              })
              .setCoords();
            left = obj.left! + deltaX;
            top = obj.top! + deltaY;
          }

          if (
            obj.name == 'ProcessArrow' &&
            obj.intersectsWithObject(movedObject, true, true)
          ) {
            obj
              .set({
                left: obj.left! + deltaX,
                top: obj.top! + deltaY,
              })
              .setCoords();
            left = obj.left! + deltaX;
            top = obj.top! + deltaY;
          }
        });

        movedObject.set({
          lastLeft: movedObject.left,
          lastTop: movedObject.top,
        });
      } else if (movedObject.name === 'Timeline_Container') {
        const lastLeft = movedObject.get('lastLeft') || movedObject.left;
        const lastTop = movedObject.get('lastTop') || movedObject.top;

        var deltaX = movedObject.left! - lastLeft!;
        var deltaY = movedObject.top! - lastTop!;

        canvas.forEachObject(function (obj) {
          let left;
          let top;

          if (
            obj.name === 'TimeLineDirection' &&
            obj.intersectsWithObject(movedObject, true, true)
          ) {
            obj
              .set({
                left: obj.left! + deltaX,
                top: obj.top! + deltaY,
              })
              .setCoords();
            left = obj.left! + deltaX;
            top = obj.top! + deltaY;
          }

          if (
            obj.name == 'TimeLineText' &&
            obj.intersectsWithObject(movedObject, true, true)
          ) {
            obj
              .set({
                left: obj.left! + deltaX,
                top: obj.top! + deltaY,
              })
              .setCoords();
            left = obj.left! + deltaX;
            top = obj.top! + deltaY;
          }

          if (
            obj.name == 'TimeLineHeading' &&
            obj.intersectsWithObject(movedObject, true, true)
          ) {
            obj
              .set({
                left: obj.left! + deltaX,
                top: obj.top! + deltaY,
              })
              .setCoords();
            left = obj.left! + deltaX;
            top = obj.top! + deltaY;
          }

          if (
            obj.name == 'timeLineCircle' &&
            obj.intersectsWithObject(movedObject, true, true)
          ) {
            obj
              .set({
                left: obj.left! + deltaX,
                top: obj.top! + deltaY,
              })
              .setCoords();
            left = obj.left! + deltaX;
            top = obj.top! + deltaY;
          }
        });

        movedObject.set({
          lastLeft: movedObject.left,
          lastTop: movedObject.top,
        });
      } else if (movedObject.name === 'Cycle_Container') {
        const lastLeft = movedObject.get('lastLeft') || movedObject.left;
        const lastTop = movedObject.get('lastTop') || movedObject.top;

        var deltaX = movedObject.left! - lastLeft!;
        var deltaY = movedObject.top! - lastTop!;

        canvas.forEachObject(function (obj) {
          let left;
          let top;

          if (
            obj.name === 'Cycle_Circle' &&
            obj.intersectsWithObject(movedObject, true, true)
          ) {
            obj
              .set({
                left: obj.left! + deltaX,
                top: obj.top! + deltaY,
              })
              .setCoords();
            left = obj.left! + deltaX;
            top = obj.top! + deltaY;
          }

          if (
            obj.name == 'Cycle_Text' &&
            obj.intersectsWithObject(movedObject, true, true)
          ) {
            obj
              .set({
                left: obj.left!! + deltaX,
                top: obj.top! + deltaY,
              })
              .setCoords();
            left = obj.left! + deltaX;
            top = obj.top! + deltaY;
          }

          if (
            obj.name == 'Cycle_Arrow' &&
            obj.intersectsWithObject(movedObject, true, true)
          ) {
            obj
              .set({
                left: obj.left! + deltaX,
                top: obj.top! + deltaY,
              })
              .setCoords();
            left = obj.left! + deltaX;
            top = obj.top! + deltaY;
          }
        });

        movedObject.set({
          lastLeft: movedObject.left,
          lastTop: movedObject.top,
        });
      } else if (movedObject.name === 'Funnel') {
        const lastLeft = movedObject.get('lastLeft') || movedObject.left;
        const lastTop = movedObject.get('lastTop') || movedObject.top;

        var deltaX = movedObject.left! - lastLeft!;
        var deltaY = movedObject.top! - lastTop!;

        canvas.forEachObject(function (obj) {
          let left;
          let top;

          if (
            obj.name === 'Funnel_Text' &&
            obj.intersectsWithObject(movedObject, true, true)
          ) {
            obj
              .set({
                left: obj.left! + deltaX,
                top: obj.top! + deltaY,
              })
              .setCoords();
            left = obj.left! + deltaX;
            top = obj.top! + deltaY;
          }

          if (
            obj.name == 'Funnel_Level' &&
            obj.intersectsWithObject(movedObject, true, true)
          ) {
            obj
              .set({
                left: obj.left! + deltaX,
                top: obj.top! + deltaY,
              })
              .setCoords();
            left = obj.left! + deltaX;
            top = obj.top! + deltaY;
          }

          if (
            obj.name == 'Funnel_Base' &&
            obj.intersectsWithObject(movedObject, true, true)
          ) {
            obj
              .set({
                left: obj.left! + deltaX,
                top: obj.top! + deltaY,
              })
              .setCoords();
            left = obj.left! + deltaX;
            top = obj.top! + deltaY;
          }
        });

        movedObject.set({
          lastLeft: movedObject.left,
          lastTop: movedObject.top,
        });
      } else if (
        movedObject.name === 'List_Container' ||
        movedObject.name === 'LIST_ELEMENT'
      ) {
        const lastLeft = movedObject.get('lastLeft') || movedObject.left;
        const lastTop = movedObject.get('lastTop') || movedObject.top;

        var deltaX = movedObject.left! - lastLeft!;
        var deltaY = movedObject.top! - lastTop!;

        canvas.forEachObject(function (obj) {
          let left;
          let top;

          if (
            obj.name === 'listText' &&
            obj.intersectsWithObject(movedObject, true, true)
          ) {
            obj
              .set({
                left: obj.left! + deltaX,
                top: obj.top! + deltaY,
              })
              .setCoords();
            left = obj.left! + deltaX;
            top = obj.top! + deltaY;
          }

          if (
            obj.name == 'ListAddImageText' &&
            obj.intersectsWithObject(movedObject, true, true)
          ) {
            obj
              .set({
                left: obj.left! + deltaX,
                top: obj.top! + deltaY,
              })
              .setCoords();
            left = obj.left! + deltaX;
            top = obj.top! + deltaY;
          }
          if (
            obj.name == 'listImage' &&
            obj.intersectsWithObject(movedObject, true, true)
          ) {
            obj
              .set({
                left: obj.left! + deltaX,
                top: obj.top! + deltaY,
              })
              .setCoords();
            left = obj.left! + deltaX;
            top = obj.top! + deltaY;
          }
        });

        movedObject.set({
          lastLeft: movedObject.left,
          lastTop: movedObject.top,
        });
      }
    }
    canvas?.requestRenderAll();
  };

  const handleAddCustomIcon = (canvas: fabric.Canvas) => {
    let addIcon = new Image();
    addIcon.src = AddPlus;
    let addImageIcon = new Image();
    addImageIcon.src = imageIcon;

    let totalProcessSteps = 2;
    let totalTimelineSteps = 2;
    let totalCycleSteps = 3;
    let totalFunnelLevels = 2;
    let totalPyramidLevels = 2;

    canvas.on('object:added', event => {
      let processStepsTotal = 0;
      let timelineLevels = 0;
      let cycleSteps = 0;
      let pLevels = 0;
      let fLevels = 0;
      canvas.forEachObject(obj => {
        if (obj.name === 'ProcessBox') {
          processStepsTotal++;
        }
        totalProcessSteps = processStepsTotal;

        if (obj.name === 'timeLineCircle') {
          timelineLevels++;
        }
        totalTimelineSteps = timelineLevels;

        if (obj.name === 'Cycle_Circle') {
          cycleSteps++;
        }
        totalCycleSteps = cycleSteps;

        if (obj.name === 'Pyramid_LEVEL') {
          pLevels++;
        }
        totalPyramidLevels = pLevels;

        if (obj.name === 'Funnel_Level') {
          fLevels++;
        }
        totalFunnelLevels = fLevels;
      });

      const object = canvas.getActiveObject();
      if (object?.name === 'PYRAMID') {
        let levels = 0;
        (object as fabric.Group).forEachObject(obj => {
          levels++;
        });
        if (levels >= 6) {
          object.setControlVisible('addPyramid', false);
        }
      }

      if (object?.name === 'Funnel') {
        let levels = 0;
        (object as fabric.Group).forEachObject(obj => {
          levels++;
        });
        if (levels > 6) {
          object.setControlVisible('addFunnel', false);
        }
      }

      if (object?.name === 'Process_Container') {
        if (processStepsTotal >= 6) {
          object.setControlVisible('addProcess', false);
        }
      }

      if (object?.name === 'Timeline_Container') {
        if (totalTimelineSteps >= 6) {
          object.setControlVisible('addTimeline', false);
        }
      }

      if (object?.name === 'Cycle_Container') {
        if (totalCycleSteps >= 6) {
          object.setControlVisible('addCycle', false);
        }
      }

      if (object?.name === 'List_Container') {
        object.setControlVisible('addCycle', false);
      }
    });

    //pyramid
    fabric.Object.prototype.controls.addPyramid = new fabric.Control({
      x: -0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: 'pointer',
      render: renderPyramidAddIcon,
      mouseUpHandler: addPyramidLevels,
      visible: false,
    });

    function addPyramidLevels() {
      addPyramidLevel(canvas);
      return true;
    }
    //process
    fabric.Object.prototype.controls.addProcess = new fabric.Control({
      x: -0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: 'pointer',
      render: renderProcessAddIcon,
      mouseUpHandler: addProcessBox,
      visible: false,
    });

    function addProcessBox() {
      addProcessSteps(canvas);
      return true;
    }
    //timeline
    fabric.Object.prototype.controls.addTimeline = new fabric.Control({
      x: -0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: 'pointer',
      render: renderTimelineAddIcon,
      mouseUpHandler: addTimelineElement,
      visible: false,
    });
    function addTimelineElement() {
      addTimelineStep(canvas);
      return true;
    }
    //funnel
    fabric.Object.prototype.controls.addFunnel = new fabric.Control({
      x: -0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: 'pointer',
      render: renderFunnelAddIcon,
      mouseUpHandler: addFunnelLevel,
      visible: false,
    });
    function addFunnelLevel() {
      addFunnelLev(canvas);
      return true;
    }

    //Cycle
    fabric.Object.prototype.controls.addCycle = new fabric.Control({
      x: -0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: 'pointer',
      render: renderCycleAddIcon,
      mouseUpHandler: addCycleBtn,
      visible: false,
    });
    function addCycleBtn() {
      addCycleStep(canvas);
      return true;
    }
    //List
    fabric.Object.prototype.controls.addList = new fabric.Control({
      x: -0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: 'pointer',
      render: renderListAddIcon,
      mouseUpHandler: addList,
      visible: false,
    });
    function addList() {
      let activeElement = canvas.getActiveObject();
      addListElement(
        canvas,
        activeElement?.getScaledWidth()! + 70,
        activeElement?.top!
      );
      return true;
    }

    //List Image
    fabric.Object.prototype.controls.addImage = new fabric.Control({
      x: 0.3,
      y: -0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: 'pointer',
      render: renderListImageIcon,
      mouseUpHandler: addListImage,
      visible: false,
    });
    function addListImage() {
      let selectedElement = canvas.getActiveObject();
      addImage(canvas, selectedElement!);
      selectedElement &&
        (selectedElement as fabric.Group).remove(
          (selectedElement as fabric.Group)._objects[1]
        );
      (selectedElement as fabric.Group).setCoords();
      canvas.renderAll();
      return true;
    }

    canvas.on('selection:created', event => {
      if (event.selected && event.selected.length > 0) {
        let selectedObject: fabric.Object | undefined = event.selected[0];

        if (selectedObject?.name === 'PYRAMID' && totalPyramidLevels < 6) {
          selectedObject.setControlVisible('addPyramid', true);
        } else {
          selectedObject.setControlVisible('addPyramid', false);
        }

        if (
          selectedObject?.name === 'Process_Container' &&
          totalProcessSteps < 6
        ) {
          selectedObject.setControlVisible('addProcess', true);
        } else {
          selectedObject.setControlVisible('addProcess', false);
        }

        if (
          selectedObject?.name === 'Timeline_Container' &&
          totalTimelineSteps < 6
        ) {
          selectedObject.setControlVisible('addTimeline', true);
        } else {
          selectedObject.setControlVisible('addTimeline', false);
        }

        if (selectedObject?.name === 'Funnel' && totalFunnelLevels < 6) {
          selectedObject.setControlVisible('addFunnel', true);
        } else {
          selectedObject.setControlVisible('addFunnel', false);
        }

        if (selectedObject?.name === 'Cycle_Container' && totalCycleSteps < 6) {
          selectedObject.setControlVisible('addCycle', true);
        } else {
          selectedObject.setControlVisible('addCycle', false);
        }

        if (selectedObject?.name === 'List_Container') {
          selectedObject.setControlVisible('addList', true);
          selectedObject.setControlVisible('addImage', true);
        } else {
          selectedObject.setControlVisible('addImage', false);
          selectedObject.setControlVisible('addList', false);
        }
      }
    });

    function renderPyramidAddIcon(
      ctx: CanvasRenderingContext2D,
      left: number,
      top: number,
      fabricObject: fabric.Object
    ) {
      var size = 24;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle || 0));
      ctx.drawImage(addIcon, -size / 2, -size / 2, size, size);
      ctx.restore();
    }

    function renderProcessAddIcon(
      ctx: CanvasRenderingContext2D,
      left: number,
      top: number,
      fabricObject: fabric.Object
    ) {
      var size = 24;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle || 0));
      ctx.drawImage(addIcon, -size / 2, -size / 2, size, size);
      ctx.restore();
    }

    function renderTimelineAddIcon(
      ctx: CanvasRenderingContext2D,
      left: number,
      top: number,
      fabricObject: fabric.Object
    ) {
      var size = 24;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle || 0));
      ctx.drawImage(addIcon, -size / 2, -size / 2, size, size);
      ctx.restore();
    }
    function renderFunnelAddIcon(
      ctx: CanvasRenderingContext2D,
      left: number,
      top: number,
      fabricObject: fabric.Object
    ) {
      var size = 24;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle || 0));
      ctx.drawImage(addIcon, -size / 2, -size / 2, size, size);
      ctx.restore();
    }
    function renderCycleAddIcon(
      ctx: CanvasRenderingContext2D,
      left: number,
      top: number,
      fabricObject: fabric.Object
    ) {
      var size = 24;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle || 0));
      ctx.drawImage(addIcon, -size / 2, -size / 2, size, size);
      ctx.restore();
    }
    function renderListAddIcon(
      ctx: CanvasRenderingContext2D,
      left: number,
      top: number,
      fabricObject: fabric.Object
    ) {
      var size = 24;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle || 0));
      ctx.drawImage(addIcon, -size / 2, -size / 2, size, size);
      ctx.restore();
    }
    function renderListImageIcon(
      ctx: CanvasRenderingContext2D,
      left: number,
      top: number,
      fabricObject: fabric.Object
    ) {
      var size = 20;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle || 0));
      ctx.drawImage(addImageIcon, -size / 2, -size / 2, size, size);
      ctx.restore();
    }
    canvas?.requestRenderAll();
  };

  const handleSelectionCreated = (
    canvas: fabric.Canvas,
    event: fabric.IEvent<MouseEvent>
  ) => {
    const activeObject = event.selected;

    if (activeObject?.length === 1) {
      if (activeObject[0].type == 'text' || activeObject[0].type == 'textbox') {
        dispatch(handleInputSize((activeObject[0] as any)?.fontSize));
      }
    }

    canvas.forEachObject(function (obj) {
      const extendedTextbox = obj as IExtendedTextboxOptions;
      if (extendedTextbox?.listType == 'bullet') {
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
              this._renderChars(
                method,
                ctx,
                bullet,
                bulletLeft,
                top,
                lineIndex
              );
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
        extendedTextbox._renderTextLine = renderTextLine;
        extendedTextbox.dirty = true;
      }
    });
  };

  const addImage = (canvas: fabric.Canvas, object: fabric.Object) => {
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
              const fixedWidth = 197; // Set the fixed width you desire
              const fixedHeight = 200; // Set the fixed height you desire
              // img.scaleToWidth(fixedWidth);
              // img.scaleToHeight(fixedHeight);
              const scaleX = fixedWidth / img.width!;
              const scaleY = fixedHeight / img.height!;
              let container = (object as fabric.Group)._objects[1];
              let TextElement = (object as fabric.Group)._objects[1];
              (object as fabric.Group).removeWithUpdate(TextElement);
              (object as fabric.Group).set({
                name: 'List_Container',
              });
              img.set({
                left: object && object.left !== undefined ? object.left + 2 : 0,
                top: object && object.top !== undefined ? object.top + 2 : 0,
                name: 'listImage',
                scaleX,
                scaleY,
              });
              object && (object as fabric.Group).addWithUpdate(img);
              object && canvas.sendBackwards(object);
              object?.setCoords();
            });
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  //*******************************************Canvas Click Mouse Up Event**********************************************
  function CanvasClick(
    canvas: fabric.Canvas,
    event: fabric.IEvent<MouseEvent>
  ) {
    let object = event.target;
    if (object) {
      if (object?.name === 'LIST_ELEMENT') {
        addImage(canvas, object);
        canvas.requestRenderAll();
      }
      let textBox = object as IText;
      if (
        textBox?.text == 'Click to add a title' ||
        textBox?.text == 'Click to add a subtitle' ||
        textBox?.text == 'Click to add a heading' ||
        textBox?.text == 'Click to add a paragraph' ||
        textBox?.text == 'Click to add a bullet point' ||
        textBox.text == 'Add Text'
      ) {
        // Clear the placeholder text and make it selectable
        textBox.text = '';
        textBox.selectable = true;

        // Set focus on the textbox
        textBox.enterEditing();
        canvas.renderAll();
      }
    }
  }

  //*****************************************************selection:cleared**********************************************************
  function canvasSelectionCleared() {}

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
    addListElement,
    addPyramidLevel,
    handleObjectMoving,
    handleAddCustomIcon,
    handleSelectionCreated,
    CanvasClick,
  };
}
