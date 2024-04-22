import { IFetchPptDetails } from '@/interfaces/pptInterfaces';

export interface TableDetails {
  row: number;
  col: number;
  width: number;
  height: number;
}

export interface listObjType {
  canvasId : number,
  path : string,
  file : any
}
export interface CanvasItem {
  id: number; 
  canvas: object;
  notes?: string;
  variants: VariantsType[];
  originalSlideData: object;
  listImages : listObjType[]
}

export interface IPresentationDetails {
  code: number;
  message: string;
  presentationId: number;
  name: string;
  slides: ISlideDetails[];
  lastModifiedBy: string;
  lastModifiedDate: string;
}

export interface ISlideDetails {
  slideId: number;
  slideNumber: number;
  thumbnilUrl: string;
  active: boolean;
}

export interface IShapeRequest {
  companyName: string;
  shape: string;
  data: string[];
}

export interface IListofSlides {
  key: number;
  name: string;
}

export interface VariantsType {
  pptUrl: string;
  imagesUrl: string;
}

export interface ISlideRequests {
  pptUrl: string;
  imageUrl: string;
  variants: VariantsType[];
  isLoading: boolean;
  isThemeLoading: boolean;
  themesList: any[];
  presentationId: number | null;
  presentationName: string;
  isAuthenticating: boolean;
  pptDetails: IFetchPptDetails | null;
  unAuthMessage: boolean;
  selectedSlideIndex: number;
}

export interface IShapeRequest {
  companyName: string;
  shape: string;
  data: string[];
}

export interface DataRequestType {
  name?: string;
  heading?: string;
  subHeading?: string;
  text?: string;
}

export interface ElementBaseType {
  shape: string;
  data?: DataRequestType[];
  title: string;
  subTitle: string;
  templateName?: string;
  elementId?: string;
}

export interface TableDataType extends ElementBaseType {
  headers: string[];
  tableData: string[][];
}

export interface APIRequest {
  themeId: string | number;
  imagesCount: string;
  elements: (ElementBaseType | TableDataType)[];
  title?: string;
  subTitle?: string;
  slideNumber: number;
  presentationId: number | null;
  presentationName?: string;
}
