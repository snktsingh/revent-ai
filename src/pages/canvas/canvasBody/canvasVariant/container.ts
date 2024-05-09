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
import { refreshVariants, updateActiveVariantApi } from '@/redux/thunk/thunk';
import { useDebounce } from '@/hooks/useDebounce';
import { useParams } from 'react-router-dom';

const useVariants = () => {
  const { updateCanvasDimensions } = useCanvasComponent();
  const { getElementsData } = useCanvasData();
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>(); 
  const [originalImageUrl, setOriginalImageUrl] = useState<string>('');
  const { openVariant } = useAppSelector(state => state.element);
  const [isLoading, SetIsLoading] = useState<boolean>(false);
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
  const [prevVariant, setPrevVariant] = useState<string>('');
  const array: number[] = [1, 2, 3];

  const handleVariants = (CanvasURL: string,variantId : number, slideId : number) => {
    console.log(variantId)
    dispatch(toggleIsVariantSelected(true));
    dispatch(toggleSelectedOriginalCanvas(false));
    dispatch(setVariantImageAsMain(CanvasURL));
    updateActiveVariant(slideId, variantId);
  };

  const updateActiveVariant = useDebounce((slideId : number, variantId : number) => {
    const pptId = Number(params.id?.split('-')[0]);
    dispatch(updateActiveVariantApi({pptId, slideId, variantId})).then(res=> {
      console.log(res)
   });
  }, 1000);

  const handleApplyOriginalAsMain = () => {
    setPrevVariant(variantImage);
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
    SetIsLoading(true);
    dispatch(refreshVariants(requestData)).then((res) => {
      SetIsLoading(false);
    });
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
    isLoading,
    prevVariant
  };
};
export default useVariants;
