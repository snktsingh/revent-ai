export interface IUpdatePptName {
  presentationId: number | null;
  name: string;
}

export interface ISlideList {
  active: boolean;
  slideId: number;
  slideNumber: number;
  thumbnailUrl: string;
}
export interface IFetchPptDetails {
  code: number;
  lastModifiedBy: string;
  lastModifiedDate: string;
  message: string;
  name: string;
  presentationId: number;
  slides: ISlideList[];
}
