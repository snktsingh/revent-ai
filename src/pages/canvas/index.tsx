import CanvasBody from './canvasBody';
import MainCanvasHeader from './canvasHeader';
import CanvasTools from './canvasTools';

const MainCanvas = () => {
  return (
    <div>
      <MainCanvasHeader />
      <CanvasTools />
      <CanvasBody />
    </div>
  );
};
export default MainCanvas;
