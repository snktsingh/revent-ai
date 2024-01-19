import { fabric } from "fabric";

export interface IExtendedTextBoxOptions extends fabric.ITextboxOptions {
    listType?: string;
    listBullet?: string;
    listCounter?: number;
    _renderTextLine?: Function;
  };

export interface RectContainer extends fabric.Rect {
    id: string;
    name: string;
  };

export  interface FabricObject extends fabric.Object {
    lastLeft: number;
    lastTop: number;
  };
