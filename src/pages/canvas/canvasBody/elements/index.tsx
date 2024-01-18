import React, { useState } from 'react';
import { fabric } from 'fabric';
import { Copy, DeleteX, AddPlus, imageIcon } from '@/constants/media';
import { theme } from '@/constants/theme';
import { handleInputSize, updateCanvasInList } from '@/redux/reducers/canvas';
import { useAppDispatch } from '@/redux/store';
import { IText } from 'fabric/fabric-impl';
import { useListElement } from './listElement';

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
  const { addImage } = useListElement()

  const title = new fabric.IText('Click to add a title', {
    left: 30,
    top: 30,
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Red Hat Display, sans-serif',
    name: 'title',
    fill: '#404040'
  });

  const subtitle = new fabric.IText('Click to add a subtitle', {
    left: 100,
    top: 100,
    width: 200,
    fontSize: 20,
    fontFamily: 'Arial',
    name: 'subTitle',
    fill: '#404040'
  });

  const heading = new fabric.IText('Click to add a heading', {
    left: 100,
    top: 50,
    width: 300,
    fontSize: 30,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    name: 'headingbox',
    fill: '#404040'
  });

  const paragraph = new fabric.IText('Click to add a paragraph', {
    left: 100,
    top: 150, // Adjust the position as needed
    width: 600, // Adjust the width as needed
    lineHeight: 1.5,
    fontSize: 16, // Adjust the font size as needed
    fontFamily: 'Arial',
    name: 'paragraphbox',
    fill: '#404040'
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
    fill: '#404040'
  } as IExtendedTextboxOptions);
  BulletText._renderTextLine = renderTextLine;



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

  

  //*******************************************Canvas Click Mouse Up Event**********************************************
  function CanvasClick(
    canvas: fabric.Canvas,
    event: fabric.IEvent<MouseEvent>
  ) {
    let object = event.target;
    if (object) {
      textEnteringEvent(canvas,(object as fabric.Text))
      if (object?.name === 'LIST_ELEMENT') {
        addImage(canvas, object);
        canvas.requestRenderAll();
      }

    }
  };

  const textEnteringEvent = (canvas: fabric.Canvas, object: fabric.Object) => {
    if (object) {
      
      let textBox = (object as fabric.Textbox);
      if (textBox?.text == 'Click to add a title' || textBox?.text == 'Click to add a subtitle' || textBox?.text == 'Click to add a heading' || textBox?.text == 'Click to add a paragraph' || textBox?.text == 'Click to add a bullet point') {
        // Clear the placeholder text and make it selectable
        textBox.text = '';
        // Set focus on the textbox
        textBox.set({
          fill: theme.colorSchemes.light.palette.common.black
        })
        canvas.renderAll()
      } else if (textBox.text == 'Add Text') {
        textBox.text = '';
        // Set focus on the textbox
        
        canvas.renderAll()
      }
    }
  }

  const textExitedEvent = (canvas: fabric.Canvas, object: fabric.Textbox | fabric.Text | fabric.IText) => {

    let textBox = object;
    switch (textBox.name) {
      case 'title':
        if (textBox.text == '') {
          textBox.text = 'Click to add a title';
          textBox.set({
            fill: '#404040'
          })
        }
        canvas.renderAll();
        break;
      case 'subTitle':
        if (textBox.text == '') {
          textBox.text = 'Click to add a subtitle';
          textBox.set({
            fill: '#404040'
          })
        }
        canvas.renderAll();
        break;
      case 'paragraphbox':
        if (textBox.text == '') {
          textBox.text = 'Click to add a paragraph';
          textBox.set({
            fill: '#404040'
          })
        }
        canvas.renderAll();
        break;
      case 'bullet':
        if (textBox.text == '') {
          textBox.text = 'Click to add a bullet point';
          textBox.set({
            fill: '#404040'
          })
        }
        canvas.renderAll();
        break;
      default:
        break;
    }
    console.log(textBox)
  }


  return {
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
    handleObjectMoving,
    handleSelectionCreated,
    CanvasClick,
    textEnteringEvent,
    textExitedEvent
  };
}
