import { fabric } from 'fabric';

interface AutoResizingTextboxOptions extends fabric.ITextboxOptions {
    fixedWidth: number;
    fixedHeight: number;
}

class AutoResizingTextbox extends fabric.Textbox {
    fixedWidth: number;
    fixedHeight: number;

    constructor(text: string, options: AutoResizingTextboxOptions) {
        super(text, options);
        this.set({
            // Set other properties like fontFamily, fontSize, etc.
        });

        this.fixedWidth = options.fixedWidth;
        this.fixedHeight = options.fixedHeight;

        // Custom logic for resizing font size based on width and height
        this.on('changed', this.adjustFontSizeWhileTyping.bind(this));
    }

    adjustFontSizeWhileTyping(): void {
        const { fixedWidth, fixedHeight } = this;
        let fontSize = this.fontSize ?? 16;

        // Calculate the current text dimensions
        const textWidth = this.getScaledWidth();
        const textHeight = this.getScaledHeight();

        // Adjust font size if text exceeds boundaries
        if (textWidth > fixedWidth) {
            fontSize *= fixedWidth / (textWidth + 1);
            this.set('width', fixedWidth);
        }
        if (textHeight > fixedHeight) {
            fontSize *= fixedHeight / (textHeight + 1);
            this.set('height', fixedHeight);
        }

        this.set('fontSize', fontSize);
        this.setCoords();
    }
}

export default AutoResizingTextbox;
