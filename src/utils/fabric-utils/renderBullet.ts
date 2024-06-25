import { IExtendedTextBoxOptions } from '@/interface/fabricTypes';
import { fabric } from 'fabric';

export class CustomTextbox
  extends fabric.Textbox
  implements IExtendedTextBoxOptions
{
  tabPressed: boolean = false;

  insertNewline() {
    const cursorLocation = this.selectionStart ?? 0;
    const currentText = this.text ?? '';
    const newText =
      currentText.slice(0, cursorLocation) +
      '\n• ' +
      currentText.slice(cursorLocation);
    this.set('text', newText);
    this.selectionStart = cursorLocation + 3; // Adjust cursor position
    this.selectionEnd = cursorLocation + 3;
    this.canvas?.requestRenderAll();
  }

  insertIndent() {
    const cursorLocation = this.selectionStart ?? 0;
    const currentText = this.text ?? '';
    const newText =
      currentText.slice(0, cursorLocation) +
      '    ' +
      currentText.slice(cursorLocation);
    this.set('text', newText);
    this.selectionStart = cursorLocation + 4; // Adjust cursor position
    this.selectionEnd = cursorLocation + 4;
    this.canvas?.requestRenderAll();
  }
}

export const renderBulletOrNumTextLine = function (
  this: any,
  method: any,
  ctx: any,
  line: any,
  left: any,
  top: any,
  lineIndex: any
) {
  const style0 = this.getCompleteStyleDeclaration(lineIndex, 0);
  const bullet =
    this.listType === 'numbered' ? [this.listCounter + '.'] : [this.listBullet];
  const bulletLeft = left - style0.fontSize - 2;

  if (line.length) {
    if (!this.isWrapping) {
      if (this.tabPressed) {
        this._renderChars(method, ctx, bullet, bulletLeft + 30, top, lineIndex);
        this.isWrapping = !this.isEndOfWrapping(lineIndex);
      } else {
        this._renderChars(method, ctx, bullet, bulletLeft, top, lineIndex);
        this.isWrapping = !this.isEndOfWrapping(lineIndex);
        if (!this.isWrapping && this.listType === 'numbered') {
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
