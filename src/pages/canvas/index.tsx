import CanvasThemes from '@/common-ui/addTheme';
import CanvasBody from './canvasBody';
import { CanvasVariant } from './canvasBody/canvasVariant';
import MainCanvasHeader from './canvasHeader';
import CanvasTools from './canvasTools';

const MainCanvas = () => {
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
