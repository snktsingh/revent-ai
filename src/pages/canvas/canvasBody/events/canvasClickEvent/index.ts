import { fabric } from 'fabric';
import { useTextEvents } from '../textEvents';
import { useListElement } from '../../elements/listElement';
import { QUOTE_IMG } from '@/constants/elementNames';
export function useCanvasClickEvent() {
  const { textEnteringEvent } = useTextEvents();
  const { addImage } = useListElement();

  function CanvasClick(
    canvas: fabric.Canvas,
    event: fabric.IEvent<MouseEvent>
  ) {
    let object = event.target;
    if (object) {
      // textEnteringEvent(canvas, object as fabric.Text);
      if (object?.name === 'LIST_ELEMENT' || object?.name === QUOTE_IMG) {
        addImage(canvas, object);
        canvas.requestRenderAll();
      }
    }
  }
  return { CanvasClick };
}
