import CanvasThemes from '@/common-ui/addTheme';
import CanvasBody from './canvasBody';
import { CanvasVariant } from './canvasBody/canvasVariant';
import MainCanvasHeader from './canvasHeader';
import CanvasTools from './canvasTools';
import ReventingLoader from '@/common-ui/loader';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getUserDetails } from '@/redux/thunk/user';
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
import { useSearchParams } from 'react-router-dom';
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

  const relUrl = window.location.pathname.slice(8);
  const temp = relUrl.search('-');
  const pName = relUrl.slice(temp + 1);
  const pId = relUrl.substring(0, temp);

  useEffect(() => {
    console.log(relUrl.search('-'));
    console.log(relUrl.slice(0, temp));
    dispatch(getUserDetails());
    getPresentationData(pId);
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
            dispatch(
              updateCurrentCanvas({
                ...slidesData[0],
                originalSlideData: response.payload,
              })
            );
          }
        });
        dispatch(setThemeId(res.payload.themeId));
        dispatch(setActiveSlideId(1));
        dispatch(updateCanvasList(slidesData));
        res.payload.slides[0].forEach((variant: any) => {
          if (variant.active) {
            dispatch(setVariantImageAsMain(variant.thumbnailUrl));
          }
        });
        dispatch(toggleSelectingSlide(true));
        dispatch(setCanvas({ ...canvasJS, variants: slidesData[0].variants }));
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
            <MainCanvasHeader pId={pId} />
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
