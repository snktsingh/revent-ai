import { CanvasItem } from '@/interface/storeTypes';

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
      // width: 960,
      // height: 540,
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
      name: 'VariantImage',
      src: '',
      crossOrigin: null,
      filters: [],
    },
  ],
};

export const processSlides = (
  slides: any[],
  presentationId: number
): CanvasItem[] => {
  return slides.map((slideData, index) => {
    let canvas = JSON.parse(JSON.stringify(canvasData));
    const slide: CanvasItem = {
      id: index + 1,
      canvas,
      notes: '',
      variants: [],
      originalSlideData: {},
      listImages: [],
      slideId: slideData[0].slideId,
      presentationId,
      lastVariant: '',
      selectedOriginalCanvas: false,
    };

    slideData.forEach((element: any) => {
      slide.variants.push({
        pptUrl: '',
        imagesUrl: element.thumbnailUrl,
        activeSlide: element.active,
        slideVariantId: Number(element.slideVariantId),
      });

      if (element.active) {
        (slide.canvas as any).objects[0].src = element.thumbnailUrl;
        slide.lastVariant = element.thumbnailUrl;
      }
    });

    return slide;
  });
};
