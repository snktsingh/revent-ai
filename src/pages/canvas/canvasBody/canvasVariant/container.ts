import {
  setCanvas,
  setVariantImageAsMain,
  toggleIsVariantSelected,
  toggleSelectedOriginalCanvas,
  updateCanvasInList,
} from '@/redux/reducers/canvas';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fabric } from 'fabric';
import { useEffect, useState } from 'react';
import { useCanvasComponent } from '../canvasComponent/container';
import useCanvasData from '../canvasComponent/canvasDataExtractor';
import { toggleVariantSlide } from '@/redux/reducers/elements';
import { refreshVariants } from '@/redux/thunk/thunk';

const useVariants = () => {
  const { updateCanvasDimensions } = useCanvasComponent();
  const { getElementsData } = useCanvasData();
  const dispatch = useAppDispatch();
  const [originalImageUrl, setOriginalImageUrl] = useState<string>('');
  const { openVariant } = useAppSelector(state => state.element);
  const {
    originalCanvasSlide,
    variantImage,
    selectedOriginalCanvas,
    canvasJS,
    canvasList,
    activeSlideID,
  } = useAppSelector(state => state.canvas);
  const { pptDetails } = useAppSelector(state => state.thunk);
  const { themeId } = useAppSelector(state => state.slideTheme);
  const { requestData } = useAppSelector(state => state.apiData);
  const array: number[] = [1, 2, 3];

  const handleVariants = (CanvasURL: string, pptURL: string, index: number) => {
    dispatch(toggleIsVariantSelected(true));
    dispatch(toggleSelectedOriginalCanvas(false));
    dispatch(setVariantImageAsMain(CanvasURL));
  };

  const handleApplyOriginalAsMain = () => {
    dispatch(setVariantImageAsMain(''));
    dispatch(toggleIsVariantSelected(false));
    dispatch(toggleSelectedOriginalCanvas(true));
    dispatch(
      updateCanvasInList({
        id: canvasJS.id,
        updatedCanvas: canvasJS.originalSlideData,
      })
    );
    let canvas = { ...canvasJS, canvas: canvasJS.originalSlideData };
    dispatch(setCanvas(canvas));
    console.log({ variantImage });
  };

  const getImg = async (canvasJson: Object) => {
    const canvas = new fabric.Canvas(null);

    return new Promise<string>((resolve, reject) => {
      try {
        canvas.loadFromJSON(canvasJson, () => {
          updateCanvasDimensions(canvas);
          const svgURL = canvas.toSVG();
          resolve(svgURL);
        });
      } catch (error) {
        console.log(error);
        reject('Error occurred while loading canvas');
      }
    });
  };

  const getCanvasImageFromJSON = async (JSONcanvas: object) => {
    let url: string = '';
    try {
      const imageURL = await getImg(JSONcanvas);
      url = imageURL;
    } catch (error) {
      console.error(error);
      url = 'error'; // Push placeholder for error cases
    }

    setOriginalImageUrl(url);
  };

  const handleRefreshVariants = () => {
    dispatch(refreshVariants(requestData))
  };

  const handleOpenVariantsSlide = () => {
    dispatch(toggleVariantSlide(!openVariant));

    const currentSlideIndex = canvasList.findIndex(
      slide => slide.id === activeSlideID
    );
    getElementsData(
      (canvasList[currentSlideIndex].originalSlideData as any)?.objects,
      themeId
    );
  };

  useEffect(() => {
    getCanvasImageFromJSON(canvasJS.originalSlideData);
  }, [canvasJS.originalSlideData]);
  return {
    array,
    openVariant,
    handleVariants,
    originalCanvasSlide,
    handleApplyOriginalAsMain,
    originalImageUrl,
    variantImage,
    selectedOriginalCanvas,
    canvasJS,
    pptDetails,
    canvasList,
    getCanvasImageFromJSON,
    activeSlideID,
    handleRefreshVariants,
    handleOpenVariantsSlide,
  };
};
export default useVariants;
