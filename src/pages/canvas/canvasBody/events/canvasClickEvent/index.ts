import { fabric } from 'fabric';
import { useTextEvents } from '../textEvents';
import { useListElement } from '../../elements/listElement';
export function useCanvasClickEvent() {
  const { textEnteringEvent } = useTextEvents();
  const { addImage } = useListElement();

  function CanvasClick(
    canvas: fabric.Canvas,
    event: fabric.IEvent<MouseEvent>
  ) {
    let object = event.target;
    if (object) {
      textEnteringEvent(canvas, object as fabric.Text);
      if (object?.name === 'LIST_ELEMENT') {
        addImage(canvas, object);
        canvas.requestRenderAll();
      }
    }
  }
  return { CanvasClick };
}
