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

  export interface IExtendedRectOptions extends fabric.IRectOptions {
    level? : string;
  };
  export interface IExtendedCircleOptions extends fabric.ICircleOptions {
    level? : string;
  };
  export interface IExtendedTriangleOptions extends fabric.ITriangleOptions {
    level? : string;
  };
  export interface IExtendedPolygonOptions extends fabric.IPolylineOptions {
    level? : string;
  };
