import CanvasThemes from '@/common-ui/addTheme';
import CanvasBody from './canvasBody';
import { CanvasVariant } from './canvasBody/canvasVariant';
import MainCanvasHeader from './canvasHeader';
import CanvasTools from './canvasTools';
import useCanvas from './container';
import ReventingLoader from '@/common-ui/loader';
import { useAppDispatch } from '@/redux/store';
import { getUserDetails } from '@/redux/thunk/user';
import { useEffect } from 'react';

const MainCanvas = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  return (
    <div>
      <MainCanvasHeader />
      <CanvasTools />
      <CanvasBody />
      <CanvasVariant />
      <CanvasThemes />
    </div>
  );
};
export default MainCanvas;
