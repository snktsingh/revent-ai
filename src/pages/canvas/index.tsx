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
    </div>
  );
};
export default MainCanvas;
