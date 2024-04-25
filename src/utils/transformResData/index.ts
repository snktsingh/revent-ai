import {
  setVariantImageAsMain,
  updateCanvasList,
} from '@/redux/reducers/canvas';

export async function customizeData(res: any, dispatch: any): Promise<void> {
  const data: any[] = [];
  const promises: Promise<void>[] = [];

  for (let i = 0; i < res.data.slides.length; i++) {
    const slide: any = createSlideObject(res.data.slides[i]);
    data.push(slide);
    promises.push(new Promise<void>(resolve => resolve()));
  }

  await Promise.all(promises);
  dispatch(updateCanvasList(data));
  dispatch(setVariantImageAsMain(res.data.slides[0][0].thumbnailUrl));
}

function createSlideObject(slideData: any[]): any {
  const slide: any = {
    id: 0,
    canvas: {
      background: '#fff',
      version: '5.3.0',
      objects: [],
    },
    notes: '',
    variants: [],
    originalSlideData: {},
    listImages: [],
  };

  for (let i = 0; i < slideData.length; i++) {
    const element = slideData[i];
    slide.variants.push({
      pptUrl: '',
      imagesUrl: element.thumbnailUrl,
    });
  }

  return slide;
}

export const canvasData = {
    background: '#fff',
    version: '5.3.0',
    objects: [
      {
        type: 'image',
        version: '5.3.0',
        originX: 'left',
        originY: 'top',
        left: 0,
        top: 0,
        width: 960,
        height: 540,
        fill: 'rgb(0,0,0)',
        stroke: null,
        strokeWidth: 0,
        strokeDashArray: null,
        strokeLineCap: 'butt',
        strokeDashOffset: 0,
        strokeLineJoin: 'miter',
        strokeUniform: false,
        strokeMiterLimit: 4,
        scaleX: 0.5,
        scaleY: 0.5,
        angle: 0,
        flipX: false,
        flipY: false,
        opacity: 1,
        shadow: null,
        visible: true,
        backgroundColor: '',
        fillRule: 'nonzero',
        paintFirst: 'fill',
        globalCompositeOperation: 'source-over',
        skewX: 0,
        skewY: 0,
        cropX: 0,
        cropY: 0,
        name: 'image',
        src: '',
        crossOrigin: null,
        filters: [],
      },
    ],
  }