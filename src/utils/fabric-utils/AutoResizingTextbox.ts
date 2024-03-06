import { fabric } from 'fabric';

interface AutoResizingTextboxOptions extends fabric.ITextboxOptions {
  fixedWidth?: number;
  fixedHeight?: number;
}

class AutoResizingTextbox extends fabric.Textbox {
  fixedWidth?: number;
  fixedHeight?: number;
  previousTextLength?: number ;

  constructor(text: string, options: AutoResizingTextboxOptions) {
    super(text, options);
    this.set({
      // Set other properties like fontFamily, fontSize, etc.
    });

    this.fixedWidth = options.fixedWidth;
    this.fixedHeight = options.fixedHeight;
    let originalFontSize = this?.fontSize;
    this.previousTextLength = (this.text ?? '').length;
    // Custom logic for resizing font size based on width and height
    this.on(
      'changed',
      this.adjustFontSizeWhileTyping.bind(this, originalFontSize)
    );
  }

  adjustFontSizeWhileTyping(originalFontSize: any): void {
    const { fixedWidth, fixedHeight, width, text } = this;
    let fontSize = this.fontSize ?? 16;
    const currentText = text ?? '';

    // Calculate the current text dimensions
    const textWidth = this.getScaledWidth();
    const textHeight = this.getScaledHeight();

    const isTextReduced = this.previousTextLength !== undefined && currentText.length < this.previousTextLength;

    // Adjust font size if text exceeds boundaries
    if (fixedWidth && textWidth > fixedWidth && !isTextReduced) {
      fontSize *= fixedWidth / (textWidth + 1);
      this.set('width', fixedWidth);
    }
    if (fixedHeight && textHeight > fixedHeight && !isTextReduced) {
      fontSize *= fixedHeight / (textHeight + 1);
      this.set('height', fixedHeight);
    }
    this.set('fontSize', fontSize);

    if (this?.text == '') {
      this.set('width', width);
      this.set('fontSize', originalFontSize);
    }
    this.previousTextLength = (text ?? '').length;
    this.setCoords();
  }
}

export default AutoResizingTextbox;
