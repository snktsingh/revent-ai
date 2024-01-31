export interface TableDetails {
    row: number;
    col: number;
    width: number;
    height: number;
  };
export interface CanvasItem {
    id: number; // Use number as ID type
    canvas: object;
  };
  
export interface CanvasJSON {
    id: number;
    canvas: object | null;
  };
  
export interface IShapeRequest {
    companyName: string;
    shape: string;
    data: string[];
  };

export interface IListofSlides {
    key: number;
    name: string;
  };


export interface VariantsType {
    pptUrl: string;
    imagesUrl: string;
  };
  
export interface ISlideRequests {
    pptUrl: string;
    imageUrl: string;
    variants: VariantsType[];
    isLoading: boolean;
  };
  
export interface IShapeRequest {
    companyName: string;
    shape: string;
    data: string[];
  };


export interface DataRequest {
  name: string;
  heading: string;
  subHeading: string;
  text: string;
}

export interface ApiElement {
  shape: string;
  data: DataRequest[];
  title:string;
  subTitle:string;
  templateName:string;
}
export interface APIRequest {
  companyName : string;
  themeColor : string;
  imagesCount:string;
  elements : ApiElement[];
}
  