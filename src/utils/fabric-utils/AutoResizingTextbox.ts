import { fabric } from 'fabric';

export interface AutoResizingTextboxOptions extends fabric.ITextboxOptions {
  fixedWidth?: number;
  fixedHeight?: number;
  level?: string;
}

class AutoResizingTextbox extends fabric.Textbox {
  fixedWidth?: number;
  fixedHeight?: number;
  private originalFontSize?: number;

  constructor(text: string, options: AutoResizingTextboxOptions) {
    super(text, options);
    this.set({});

    this.fixedWidth = options.fixedWidth;
    this.fixedHeight = options.fixedHeight;
    this.originalFontSize = this.fontSize;

    this.on('changed', this.handleTextChanged.bind(this));
  }

  handleTextChanged(): void {
    if (this.originalFontSize) {
      this.adjustFontSize(1, this.originalFontSize);
    }
  }

  adjustFontSize(minFontSize: number, maxFontSize: number): void {
    if (!this.fixedHeight || !this.originalFontSize) return;

    let newFontSize = minFontSize;

    while (minFontSize <= maxFontSize) {
      newFontSize = Math.floor((minFontSize + maxFontSize) / 2);
      this.set('fontSize', newFontSize);
      this.canvas?.renderAll();

      if (this.height && this.height <= this.fixedHeight) {
        minFontSize = newFontSize + 1;
      } else {
        maxFontSize = newFontSize - 1;
      }
    }

    this.set('fontSize', newFontSize);
    this.canvas?.renderAll();
  }
}

export default AutoResizingTextbox;
