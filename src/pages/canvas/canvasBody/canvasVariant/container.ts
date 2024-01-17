import { setCanvas, setVariantImageAsMain } from '@/redux/reducers/canvas';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { swapMainCanvas } from '@/redux/thunk/thunk';

const useVariants = () => {
  const dispatch = useAppDispatch();
  const { openVariant } = useAppSelector(state => state.element);
  const { variants } = useAppSelector(state => state.thunk);
  const { originalSlide } = useAppSelector(state => state.canvas);
  const array: number[] = [1, 2, 3];

  const handleVariants = (CanvasURL: string, pptURL: string, index: number) => {
    dispatch(
      swapMainCanvas({ canvasLink: CanvasURL, index: index, pptLink: pptURL })
    );
    dispatch(setVariantImageAsMain(CanvasURL));
  };

  const handleApplyOriginalAsMain = ()=>{
    dispatch(setCanvas({id:1,canvas:originalSlide.originalJSON}))
  }
  return { variants, array, openVariant, handleVariants, originalSlide, handleApplyOriginalAsMain };
};
export default useVariants;
