import CanvasThemes from '@/common-ui/addTheme';
import CanvasBody from './canvasBody';
import { CanvasVariant } from './canvasBody/canvasVariant';
import MainCanvasHeader from './canvasHeader';
import CanvasTools from './canvasTools';
import ReventingLoader from '@/common-ui/loader';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useEffect } from 'react';
import {
  fetchPptDetails,
  getSlideJSONData,
  setAuthenticateLoader,
  setUnauthMessage,
  toggleThemeChange,
} from '@/redux/thunk/thunk';
import { toast } from 'react-toastify';
import { processSlides } from '@/utils/transformResData';
import {
  setActiveSlideId,
  setCanvas,
  setVariantImageAsMain,
  updateCanvasList,
  updateCurrentCanvas,
} from '@/redux/reducers/canvas';
import { toggleSelectingSlide } from '@/redux/reducers/slide';
import { updatePresentationLoading } from '@/redux/reducers/elements';
import { useParams, useSearchParams } from 'react-router-dom';
import { setThemeId } from '@/redux/reducers/theme';
import { Backdrop, CircularProgress, Stack } from '@mui/material';

const MainCanvas = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticating, themePreviewLoader } = useAppSelector(
    state => state.thunk
  );
  const { canvasJS } = useAppSelector(state => state.canvas);
  const { isPresentationLoading } = useAppSelector(state => state.element);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams<{ id: string }>(); 

  const pptId = Number(params.id?.split('-')[0]);

  useEffect(() => {
    getPresentationData(pptId.toString());
  }, []);

  const getPresentationData = async (pptId: string) => {
    dispatch(updatePresentationLoading(true));
    const res: any = await dispatch(fetchPptDetails(pptId));
    if (res.meta.requestStatus === 'fulfilled') {
      if (res.payload.slides[0]) {
        setSearchParams({ slide: res.payload.slides[0][0].slideId });
      }

      const slidesData = processSlides(
        res.payload.slides,
        res.payload.presentationId
      );
      if (slidesData && slidesData.length > 0 && slidesData[0].canvas) {
        dispatch(
          getSlideJSONData({ pptId, slideId: res.payload.slides[0][0].slideId })
        ).then(response => {
          if (response.payload) {
            if (response.payload.hasOwnProperty('slideJSON')) {
              dispatch(
                updateCurrentCanvas({
                  ...slidesData[0],
                  originalSlideData: response.payload.slideJSON,
                  notes : response.payload.notes
                })
              );
            } else {
              dispatch(
                updateCurrentCanvas({
                  ...slidesData[0],
                  originalSlideData: response.payload,
                })
              );
            }
          }
        });
        
        dispatch(setThemeId(res.payload.themeId));
        dispatch(setActiveSlideId(slidesData[slidesData.length-1].id));
        dispatch(updateCanvasList(slidesData));
        res.payload.slides[0].forEach((variant: any) => {
          if (variant.active) {
            dispatch(setVariantImageAsMain(variant.thumbnailUrl));
          }
        });
        dispatch(toggleSelectingSlide(true));
        // dispatch(setCanvas({ ...canvasJS, variants: slidesData[0].variants }));
        dispatch(setCanvas(slidesData[slidesData.length-1]));
      }
      dispatch(updatePresentationLoading(false));
      dispatch(setAuthenticateLoader());
    } else {
      dispatch(setAuthenticateLoader());
    }
  };

  if (isAuthenticating) {
    return <ReventingLoader />;
  } else {
    return (
      <>
        {isPresentationLoading ? (
          <ReventingLoader />
        ) : (
          <div>
            <Backdrop
              sx={{
                color: '#fff',
                zIndex: theme => theme.zIndex.drawer + 1,
                display: 'flex',
                flexDirection: 'column',
              }}
              open={themePreviewLoader}
            >
              <CircularProgress color="inherit" />
              <p>Changing Presentation theme please wait...</p>
            </Backdrop>
            <MainCanvasHeader pId={pptId} />
            <CanvasTools />
            <CanvasBody />
            <CanvasVariant />
            <CanvasThemes />
          </div>
        )}
      </>
    );
  }
};
export default MainCanvas;
