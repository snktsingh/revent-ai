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
  setAuthenticateLoader,
  setUnauthMessage,
} from '@/redux/thunk/thunk';
import { toast } from 'react-toastify';

const MainCanvas = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticating } = useAppSelector(state => state.thunk);
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
    const res = await dispatch(fetchPptDetails(pptId));
    console.log(res.meta.requestStatus === 'fulfilled');
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success("Presentation added to canvas")
      dispatch(setAuthenticateLoader());
    } else {
      dispatch(setAuthenticateLoader());
    }
  };

  if (isAuthenticating) {
    return <ReventingLoader />;
  } else {
    return (
      <div>
        <MainCanvasHeader pId={pId} />
        <CanvasTools />
        <CanvasBody />
        <CanvasVariant />
        <CanvasThemes />
      </div>
    );
  }
};
export default MainCanvas;
