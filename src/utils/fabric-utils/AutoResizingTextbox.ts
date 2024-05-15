import { fabric } from 'fabric';

export interface AutoResizingTextboxOptions extends fabric.ITextboxOptions {
  fixedWidth?: number;
  fixedHeight?: number;
  level? : string;
}

class AutoResizingTextbox extends fabric.Textbox {
  fixedWidth?: number;
  fixedHeight?: number;

  constructor(text: string, options: AutoResizingTextboxOptions) {
    super(text, options);
    this.set({});

    this.fixedWidth = options.fixedWidth;
    this.fixedHeight = options.fixedHeight;
    let originalFontSize = this?.fontSize;

    this.on('changed', this.adjustFontSize.bind(this, originalFontSize));
  }

  adjustFontSize(originalFontSize: any) : void {
    let currentFontSize = this.fontSize;
    if (this.fixedHeight && this.height && this.height > this.fixedHeight) {
      this.set('fontSize', currentFontSize! - 1);
      this.adjustFontSize(originalFontSize);
      return;
    } else {
      if (currentFontSize && this.fontSize && currentFontSize < originalFontSize) {
        // console.log(this.fixedHeight - this.height < currentFontSize * this.lineHeight * 1.5)
        if (this.fixedHeight && this.height && this.lineHeight && this.fixedHeight - this.height < (currentFontSize * this.lineHeight) * 1.5) {
          return;
        } else {
          this.set('fontSize', currentFontSize + 1);
          this.canvas?.renderAll();
          // this.adjustFontSize(originalFontSize);
          return;
        }
      }
      return;
    }
  }
}

export default AutoResizingTextbox;
