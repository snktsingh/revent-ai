import { fabric } from "fabric";
import { uniqueId, groupBy, pick } from "lodash";

const REGEX_VAR = new RegExp(/\`[\s*a-zA-Z0-9-_.@$!%,();:\/"|&']+?\`/g);

interface Param {
    id: string;
    key: string;
    startIndex: number;
    endIndex: number;
    name: string;
}

const REF_TARGET = {
    NONE: "fill",
    NEON: "stroke",
    HOLLOW: "stroke",
    LIFT: "fill",
    SHADOW: "fill"
};

fabric.Textbox.prototype.lineStyles = {};
fabric.Textbox.prototype.bulletStyleMap = ["", "●", "■", "○", "◦", "•"];

fabric.Text.prototype.initDimensions = function() {
    if (this.__skipDimension) {
        return;
    }
    this._splitText();
    this._clearCache();
    this.width = this.calcTextWidth() + (this._getLineLeftOffset(1) || this.cursorWidth);
    if (this.textAlign.indexOf("justify") !== -1) {
        this.enlargeSpaces();
    }
    this.height = this.calcTextHeight();
    this.saveState({
        propertySet: "_dimensionAffectingProps"
    });
};

export class StaticTextObject extends fabric.Textbox {
    static type = "StaticText";
    public fontURL: string = "";
    public params: Param[] = [];
    public paramBounds: any[] = [];
    public effect: any;
    public light: any;
    public lineStyles: { [key: number]: any } = {};
    public bulletStyle: number;
    public bulletStyleMap = ["", "●", "■", "○", "◦", "•"];
    public isBulletText: boolean = false;
    public isNumberBullet: boolean = false;

    private getParamsFromKeys(text: string): Param[] {
        let params: Param[] = [];
        const matches = text.matchAll(REGEX_VAR);
        for (const match of matches) {
            const matchWord = match[0];
            const startIndex = match.index!;
            params = params.concat({
                key: matchWord,
                startIndex: startIndex,
                endIndex: startIndex + matchWord.length,
                id: uniqueId(matchWord),
                name: matchWord.slice(1, matchWord.length - 1).toLowerCase().split(" ").join("_")
            });
        }
        return params;
    }

    private registerHoverEvent() {
        this.canvas!.on("mouse:move", e => {
            if (!this.isEditing && e.target === this) {
                const pointer = this.canvas!.getPointer(e.e, false);
                const key = this.paramBounds.find(key => {
                    if (
                        pointer.x >= key.left + this.left &&
                        pointer.x <= this.left + key.left + key.width &&
                        pointer.y >= key.top + this.top &&
                        pointer.y <= this.top + key.top + key.height
                    ) {
                        return true;
                    } else {
                        return false;
                    }
                });
                if (key) {
                    this.hoverCursor = "pointer";
                } else {
                    this.hoverCursor = "move";
                }
            }
        });
    }

    toggleBulletOnText(isNumber = false) {
        let obj = this;
        if (!obj.isBulletText && !obj.isNumberBullet && isNumber) {
            obj.isBulletText = true;
            obj.isNumberBullet = true;
        } else if (obj.isNumberBullet && isNumber) {
            obj.isNumberBullet = false;
            obj.isBulletText = false;
        } else if (!obj.isNumberBullet && obj.isBulletText && isNumber) {
            obj.isNumberBullet = true;
        } else if (!obj.isBulletText && !obj.isNumberBullet && !isNumber) {
            obj.isBulletText = true;
        } else if (obj.isNumberBullet && !isNumber) {
            obj.isBulletText = true;
            obj.isNumberBullet = false;
        } else if (obj.isBulletText && !isNumber) {
            obj.isBulletText = false;
        }

        obj.initDimensions();
        this.canvas?.requestRenderAll();
    }

    updateIndentLevel() {
        return this.textLines.map(() => ({ indentLevel: 2 }));
    }

    initialize(options: any) {
        const { text, params, styles, isBulletText, lineStyles, bulletStyle, bulletStyleMap, isNumberBullet, ...textOptions } = options;
        this.params = params ? params : [];
        this.paramBounds = [];
        super.initialize(text, {
            ...textOptions,
            erasable: false
        });
        this.bulletStyle = bulletStyle || 1;
        this.objectCaching = false;
        this.isBulletText = isBulletText || false;
        this.isNumberBullet = isNumberBullet || false;
        this.lineStyles = lineStyles || this.updateIndentLevel();
        this.styles = styles || {};

        if (styles && Array.isArray(styles)) {
            styles.forEach((style, i) => {
                const prevArrayLetters = text.split("").filter((t, i) => i <= style.start);
                let contPrevLineBreak = 0;
                for (const t of prevArrayLetters) {
                    t === "\n" && contPrevLineBreak++;
                }
                const currentArrayLetters = text.split("").filter((t, i) => i > style.start && i <= style.end && t);
                let contCurrentLineBreak = 0;
                for (const t of currentArrayLetters) {
                    t === "\n" && contCurrentLineBreak++;
                }
                this.setSelectionStyles(style.style, style.start + contPrevLineBreak, style.end + contCurrentLineBreak + contPrevLineBreak);
            });
        }
        this.on("added", () => {
            this.registerHoverEvent();
            this.updateParams();
        });
        this.on("editing:entered", () => {
            this.clearStyles();
        });
        this.on("editing:exited", () => {
            this.updateParams();
        });
        this.on("modified", () => {
            this.updateParams();
        });
        this.on("changed", (e) => this._onChangedText(e));
        return this;
    }

    _onChangedText(e: any) {
        // Handle text change logic
    }

    onKeyDown(e: KeyboardEvent) {
        if (this.isEditing && (e.keyCode === 8 || e.code === "Backspace")) {
            const textSelected = this.getSelectedText();
            const startIndex = this.selectionStart,
                endIndex = this.selectionEnd;
            let newLineStyles = {};
            let lineStyles = this.lineStyles;
            if (!textSelected) {
                const { charIndex, lineIndex } = this.get2DCursorLocation(startIndex, true);
                if (charIndex === 0) {
                    for (const key in lineStyles) {
                        const keyOut = parseInt(key);
                        if (lineIndex === keyOut) {
                            newLineStyles[keyOut] = lineStyles[keyOut + 1];
                            for (const key1 in lineStyles) {
                                const keyIn = parseInt(key1);
                                if (keyIn > keyOut) {
                                    newLineStyles[keyIn] = lineStyles[keyIn + 1];
                                }
                            }
                            delete newLineStyles[Object.entries(newLineStyles).length - 1];
                            break;
                        } else {
                            newLineStyles[key] = lineStyles[key];
                        }
                    }
                    this.lineStyles = newLineStyles;
                    this.dirty = true;
                }
            } else {
                const startPosition = this.get2DCursorLocation(startIndex, true);
                const startLineIndex = startPosition.lineIndex;
                const endPosition = this.get2DCursorLocation(endIndex, true);
                const endLineIndex = endPosition.lineIndex;
                for (const key in lineStyles) {
                    const lineKey = parseInt(key);
                    if (lineKey >= startLineIndex + 1 && lineKey <= endLineIndex) {
                        delete lineStyles[lineKey];
                        continue;
                    }
                    if (lineKey > endLineIndex) newLineStyles[Object.entries(newLineStyles).length] = lineStyles[lineKey];
                    else newLineStyles[lineKey] = lineStyles[lineKey];
                }
                this.lineStyles = newLineStyles;
                this.dirty = true;
            }
        }
        if (this.isEditing && e.keyCode === 13 && e.code === "Enter") {
            const cursorLineIndexSkip = this.get2DCursorLocation(this.selectionStart)?.lineIndex;
            const cursorPosition = this.get2DCursorLocation(this.selectionStart, true);
            const currentLineIndex = cursorPosition.lineIndex;
            const currentIndentLevel = this.isLineIndent(cursorLineIndexSkip);
            const nextLineIndex = currentLineIndex + 1;
            let oldLineIndentStyles = { ...this.lineStyles };
            let newLineIndentStyles = {};
            for (const lineKey in oldLineIndentStyles) {
                const key = parseInt(lineKey);
                if (oldLineIndentStyles[key]) newLineIndentStyles[key] = oldLineIndentStyles[key];
                if (key === currentLineIndex && currentLineIndex === Object.entries(oldLineIndentStyles).length - 1) {
                    newLineIndentStyles[currentLineIndex + 1] = oldLineIndentStyles[currentLineIndex];
                    break;
                }
                if (key > currentLineIndex) newLineIndentStyles[key + 1] = oldLineIndentStyles[key];
            }
            if (Object.entries(oldLineIndentStyles).length === 0) {
                newLineIndentStyles[0] = { indentLevel: 2 };
                newLineIndentStyles[1] = { indentLevel: 2 };
            }
            if (Object.entries(oldLineIndentStyles).length === 1) {
                newLineIndentStyles[0] = oldLineIndentStyles[0];
                newLineIndentStyles[1] = currentIndentLevel;
            }
            if (!newLineIndentStyles[nextLineIndex]) {
                if (newLineIndentStyles[nextLineIndex] === undefined) newLineIndentStyles[nextLineIndex] = currentIndentLevel;
                if (newLineIndentStyles[nextLineIndex]?.indentLevel !== currentIndentLevel?.indentLevel) {
                    newLineIndentStyles[nextLineIndex] = currentIndentLevel;
                }
            }
            this.lineStyles = newLineIndentStyles;
        }
    }

    updateParams() {
        this.params = this.getParamsFromKeys(this.text!);
        this._setParamsBound();
    }

    _setParamsBound() {
        let paramBounds: any[] = [];
        let tempWidth: number = 0;
        const objectLeft = this.left;
        const objectTop = this.top;
        this.ctx.font = `${this.fontSize}px ${this.fontFamily}`;

        const objectTextLines = this.text.split("\n");

        this.params.forEach(p => {
            let paramWidth = this.ctx.measureText(p.key).width;
            let paramLeft = this.ctx.measureText(this.text.substring(0, p.startIndex)).width;
            let index = 0;

            objectTextLines.some((line, lineIndex) => {
                tempWidth += this.ctx.measureText(line).width;
                index = lineIndex;
                if (p.startIndex < tempWidth) return true;
                paramLeft += this.lineHeight;
            });

            paramBounds = paramBounds.concat({
                id: p.id,
                left: paramLeft + objectLeft,
                top: index * this.lineHeight + objectTop,
                width: paramWidth,
                height: this.fontSize,
                text: p.key,
                name: p.name
            });
        });

        this.paramBounds = paramBounds;
    }

    handleMouseUp(e: fabric.IEvent<Event>) {
        if (!this.isEditing && this.canvas) {
            const pointer = this.canvas!.getPointer(e.e, false);
            const param = this.paramBounds.find(param => {
                if (
                    pointer.x >= param.left + this.left &&
                    pointer.x <= this.left + param.left + param.width &&
                    pointer.y >= param.top + this.top &&
                    pointer.y <= this.top + param.top + param.height
                ) {
                    return true;
                } else {
                    return false;
                }
            });
            if (param) {
                const zoom = this.canvas!.getZoom();
                const { scaleX, scaleY, width, height } = this;
                const { left, top } = this.getBoundingRect(false);
                const padLeft = (width! * scaleX! * zoom - width!) / 2;
                const padTop = (height! * scaleY! * zoom - height!) / 2;

                const eventData = {
                    object: this,
                    position: {
                        left: left + padLeft + param.width * zoom + param.left,
                        top: top + padTop + param.height * zoom + param.top
                    },
                    param
                };
                this.canvas!.fire("param:selected", eventData);
            }
        }
    }

    updateParam(key: string, name: string) {
        this.params = this.params.map(p => {
            if (p.key === key) {
                return {
                    ...p,
                    name
                };
            }
            return p;
        });
        this.updateParams();
    }

    setParams() {
        const params = this.getParamsFromKeys(this.text!);

        if (this.params) {
            const updatedParams = params.map(param => {
                const existingParam = this.params.find(p => p.key === param.key);
                if (existingParam) {
                    return {
                        ...param,
                        name: existingParam.name
                    };
                }
                return param;
            });
            this.params = updatedParams;
        } else {
            this.params = params;
        }
        this.params.forEach(param => {
            this.setSelectionStyles(
                {
                    textBackgroundColor: "#dcdde1",
                    key: param.key,
                    id: param.id,
                    name: param.name
                },
                param.startIndex,
                param.endIndex
            );
        });
    }

    setParamBounds() {
        setTimeout(() => {
            let textLines = this.getUpdatedTextLines();
            let paramBounds: any[] = [];
            textLines.forEach(textLine => {
                const lineHeight = this.__lineHeights[parseInt(textLine.textStyleGroupIndex)];
                const params = this.getKeysFromTextStyles(textLine.lineStyles);
                const linekeyBounds = params.map(param => {
                    const charBounds = this.__charBounds![textLine.lineIndex].map(cbs => ({
                        ...cbs,
                        top: lineHeight * textLine.lineIndex
                    }));
                    const charBoundMin = charBounds[param.startIndex - textLine.startIndex];
                    const charBoundMax = charBounds[param.endIndex - 1 - textLine.startIndex];
                    if (!charBoundMin || !charBoundMax) {
                        return {};
                    }
                    const lineWidth = this.__lineWidths[textLine.lineIndex];
                    const width = this.width!;
                    let shift = 0;
                    if (this.textAlign === "center") {
                        shift = (width - lineWidth) / 2;
                    } else if (this.textAlign === "right") {
                        shift = width - lineWidth;
                    }
                    const charBound = {
                        ...charBoundMin,
                        ...param,
                        shift,
                        left: shift + charBoundMin.left,
                        top: charBoundMin.top,
                        width: charBoundMax.width + charBoundMax.left - charBoundMin.left,
                        height: charBoundMin.height
                    };
                    return charBound;
                });
                paramBounds = paramBounds.concat(linekeyBounds);
            });
            this.paramBounds = paramBounds;
        }, 250);
    }

    getKeysFromTextStyles(textSyles: any) {
        let charStyles: any[] = [];
        let params: any[] = [];
        Object.keys(textSyles).forEach(style => {
            if (textSyles[style].key) {
                charStyles = charStyles.concat({
                    index: parseInt(style),
                    key: textSyles[style].key,
                    id: textSyles[style].id,
                    name: textSyles[style].name
                });
            }
        });

        const groupedCharStyles = groupBy(charStyles, "id");
        Object.keys(groupedCharStyles).forEach(group => {
            const size = groupedCharStyles[group].length;
            const key = groupedCharStyles[group][0].key;
            const name = groupedCharStyles[group][0].name;
            const indexes = groupedCharStyles[group].map(g => g.index).sort((a, b) => a - b);
            const [startIndex] = [indexes[0]];
            const param = {
                key,
                startIndex,
                name,
                endIndex: startIndex + size,
                id: group
            };
            params = params.concat(param);
        });
        return params;
    }

    getUpdatedTextLines() {
        let allText: any = this.text;
        const textLines = this.textLines;
        let updatedTextLines: any[] = [];
        let textStyleGroupIndex = 0;
        let startIndex = 0;
        let lineIndex = 0;

        textLines.forEach((textLine, index) => {
            let currentTextLine = textLine;
            let isBreakLine = false;
            lineIndex = index;
            const prevUpdatedLine = updatedTextLines[index - 1];
            if (allText[0] === "\n") {
                allText = allText.substring(1);
                textStyleGroupIndex += 1;
                if (index) {
                    prevUpdatedLine.breakLine = true;
                }
            } else {
                const textLineChange = index ? " " : "";
                currentTextLine = textLineChange + currentTextLine;
            }

            const initialPart = allText.substring(0, currentTextLine.length);
            const remainingPart = allText.substring(currentTextLine.length);

            if (index) {
                if (prevUpdatedLine.breakLine) {
                    startIndex = 0;
                } else {
                    startIndex = prevUpdatedLine.startIndex + prevUpdatedLine.text.length + 1;
                }
            }

            allText = remainingPart;
            updatedTextLines = updatedTextLines.concat({
                text: initialPart,
                breakLine: isBreakLine,
                textStyleGroupIndex,
                startIndex,
                lineIndex: lineIndex,
                initialText: textLine
            });
        });
        const textStyleGroups = this.styles;
        const updatedTextLinesWithStyles = updatedTextLines.map(updatedTextLine => {
            const textStyleGroup = textStyleGroups[updatedTextLine.textStyleGroupIndex];
            const indexes = Array(updatedTextLine.text.length)
                .fill(0)
                .map((_, i) => (updatedTextLine.startIndex + i).toString());
            const lineStyles = pick(textStyleGroup, indexes);
            return { ...updatedTextLine, lineStyles };
        });

        return updatedTextLinesWithStyles;
    }

    clearStyles() {
        const styleGroups = this.styles;
        Object.keys(styleGroups).forEach(key => {
            const styleGroup = styleGroups[key];
            const styleGroupArray = Object.keys(styleGroup).map(k => ({ ...styleGroup[k], startIndex: parseInt(k) }));
            const groupedById = groupBy(styleGroupArray, "id");
            Object.keys(groupedById).forEach(k => {
                if (k !== "undefined" && k !== "null") {
                    const group = groupedById[k];
                    const startIndex = group[0].startIndex;
                    const endIndex = startIndex + group.length;
                    this.setSelectionStart(startIndex);
                    this.setSelectionEnd(endIndex);

                    this.setSelectionStyles(
                        {
                            textBackgroundColor: "",
                            key: null,
                            id: null,
                            name: null
                        },
                        startIndex,
                        endIndex
                    );
                }
            });
        });
    }

    updateParams() {
        this.clearStyles();
        this.setParams();
        this.setParamBounds();
    }

    getRefColor() {
        if (!this.effect || this.effect === "NONE") {
            return this.fill;
        }
        // @ts-ignore
        return this[REF_TARGET[this.effect]];
    }

    toObject(propertiesToInclude = []) {
        return fabric.util.object.extend(super.toObject.call(this, propertiesToInclude), {
            fontURL: this.fontURL,
            params: this.params.map(p => ({ key: p.key, name: p.name })),
            effect: this.effect,
            light: this.light,
            lineStyles: this.lineStyles,
            bulletStyle: this.bulletStyle,
            bulletStyleMap: this.bulletStyleMap,
            isBulletText: this.isBulletText,
            isNumberBullet: this.isNumberBullet,
        });
    }

    toJSON(propertiesToInclude = []) {
        return fabric.util.object.extend(super.toObject.call(this, propertiesToInclude), {
            fontURL: this.fontURL,
            params: this.params.map(p => ({ key: p.key, name: p.name })),
            effect: this.effect,
            light: this.light,
            lineStyles: this.lineStyles,
            bulletStyle: this.bulletStyle,
            bulletStyleMap: this.bulletStyleMap,
            isBulletText: this.isBulletText,
            isNumberBullet: this.isNumberBullet,
        });
    }

    static fromObject(options: StaticTextOptions, callback: Function) {
        return callback && callback(new fabric.StaticText(options));
    }
}

fabric.StaticText = fabric.util.createClass(StaticTextObject, {
    type: StaticTextObject.type
});
fabric.StaticText.fromObject = StaticTextObject.fromObject;
fabric.StaticText.prototype._getBulletStyle = function() {
    if (!this.isBulletText) return;
    return this.bulletStyle;
};

export type StaticTextOptions = fabric.ITextboxOptions & {
    text: string;
    fontURL: string;
    params: any;
    lineStyles: object;
    bulletStyle: number;
    bulletStyleMap: any;
    isBulletText: boolean;
    isNumberBullet: boolean;
};

declare module "fabric" {
    namespace fabric {
        class StaticText extends StaticTextObject {
            constructor(options: StaticTextOptions);
        }
    }
}
