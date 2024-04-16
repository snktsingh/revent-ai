import CanvasThemes from '@/common-ui/addTheme';
import CanvasBody from './canvasBody';
import { CanvasVariant } from './canvasBody/canvasVariant';
import MainCanvasHeader from './canvasHeader';
import CanvasTools from './canvasTools';
import useCanvas from './container';
import ReventingLoader from '@/common-ui/loader';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { getUserDetails } from '@/redux/thunk/user';
import { useEffect, useState } from 'react';
import { FetchUtils } from '@/utils/fetch-utils';
import {
  fetchPptDetails,
  setAuthenticateLoader,
  setUnauthMessage,
  updatePptName,
} from '@/redux/thunk/thunk';
import { toast } from 'react-toastify';
import { setPresentationTitle } from '@/redux/reducers/canvas';

const MainCanvas = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticating } = useAppSelector(state => state.thunk);
  const relUrl = window.location.pathname.slice(8);
  const temp = relUrl.search('-');
  const pName = relUrl.slice(temp + 1);
  const pId = relUrl.substring(0, temp);

  useEffect(() => {
    dispatch(getUserDetails());
    getPresentationData(pId);
  }, []);

  const getPresentationData = async (pptId: string) => {
    const res = await dispatch(fetchPptDetails(pptId));
    if (pName === 'Untitled-Presentation') {
      dispatch(setAuthenticateLoader());
    } else if (decodeURIComponent(pName) !== res.payload.name) {
      dispatch(setUnauthMessage(true));
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
