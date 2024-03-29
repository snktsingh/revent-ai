import { BULLET_POINTS } from '@/constants/elementNames';
import { IExtendedTextBoxOptions } from '@/interface/fabricTypes';
import { fabric } from 'fabric';
export const useBulletOrNumberedText = () => {
  const text = `Click to add a bullet point`;

  const renderBulletOrNumTextLine = function (
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
        if (this.tabPressed ) {
          this._renderChars(
            method,
            ctx,
            bullet,
            bulletLeft + 30,
            top,
            lineIndex
          );
          this.isWrapping = !this.isEndOfWrapping(lineIndex);
        } else {
          this._renderChars(method, ctx, bullet, bulletLeft, top, lineIndex);
          this.isWrapping = !this.isEndOfWrapping(lineIndex);
          if (!this.isWrapping) {
            if (this.listType === 'numbered') {
              this.listCounter++;
            }
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

  class CustomTextbox
    extends fabric.Textbox
    implements IExtendedTextBoxOptions
  {
    tabPressed: boolean = false;

    // onKeyDown(e: any): void {
    //   if (e.keyCode === 9) {
    //     console.log('Tab pressed');
    //     this.tabPressed = true;
    //     e.preventDefault();
    //     this.canvas?.requestRenderAll();
    //   }
    // }
  }

  const BulletText = new CustomTextbox(text, {
    fontFamily: 'sans-serif',
    lineHeight: 1.4,
    left: 100,
    top: 150,
    width: 450,
    fontSize: 20,
    objectCaching: false,
    isWrapping: false,
    listType: 'bullet',
    listBullet: '\u2022',
    listCounter: 0,
    name: BULLET_POINTS,
    fill: '#404040',
  } as IExtendedTextBoxOptions);
  BulletText._renderTextLine = renderBulletOrNumTextLine;

  return { BulletText, renderBulletOrNumTextLine };
};
