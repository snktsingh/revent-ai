import { theme } from '@/constants/theme';
import { IExtendedTextBoxOptions } from '@/interface/fabricTypes';
import { fabric } from 'fabric';


export default function useAllElements() {
 
  const title = new fabric.Textbox('Click to add a title', {
    left: 30,
    top: 30,
    fontSize: 30,
    width:300,
    fontWeight: 'bold',
    fontFamily: 'Red Hat Display, sans-serif',
    name: 'title',
    fill: '#404040',
  });

  const subtitle = new fabric.Textbox('Click to add a subtitle', {
    left: 100,
    top: 100,
    width: 200,
    fontSize: 20,
    fontFamily: 'Arial',
    name: 'subTitle',
    fill: '#404040'
  });

  const heading = new fabric.Textbox('Click to add a heading', {
    left: 100,
    top: 50,
    width: 300,
    fontSize: 30,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    name: 'headingbox',
    fill: '#404040'
  });

  const paragraph = new fabric.Textbox('Click to add a paragraph', {
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
  } as IExtendedTextBoxOptions);
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




  return {
    title,
    subtitle,
    heading,
    paragraph,
    BulletText,
    ColorFillForObjects,
    ColorForText,
    ColorForBorder,
    handleBold,
    handleItalic,
    handleUnderLine,
  };
}
