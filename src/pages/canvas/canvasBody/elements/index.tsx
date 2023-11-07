import React from 'react';
import { fabric } from 'fabric';

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

  return { title, subtitle, heading, paragraph, BulletText };
}
//table 