import { fabric } from 'fabric';

declare module 'fabric' {
  namespace fabric {
    interface AutoResizingTextboxOptions extends ITextboxOptions {
      fixedWidth?: number;
      fixedHeight?: number;
      level?: string;
    }

    class AutoResizingTextbox extends Textbox {
      fixedWidth?: number;
      fixedHeight?: number;

      constructor(text: string, options: AutoResizingTextboxOptions);

      adjustFontSize(originalFontSize: number): void;

      toObject(propertiesToInclude?: string[]): any;

      static fromObject(object: any): AutoResizingTextbox;
    }
  }
}
