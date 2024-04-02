import { fabric } from 'fabric';
import { useTextEvents } from '../textEvents';
import { useListElement } from '../../elements/listElement';
import { LIST_MAIN, QUOTE_IMG } from '@/constants/elementNames';
import { useQuoteElement } from '../../elements/quoteElement';
export function useCanvasClickEvent() {
  const { textEnteringEvent } = useTextEvents();
  const { addImage } = useListElement();
  const { addQuoteImage } = useQuoteElement();

  function CanvasClick(
    canvas: fabric.Canvas,
    event: fabric.IEvent<MouseEvent>
  ) {
    const pointer: any = canvas.getPointer(event.e);

    const objectsAtPointer = canvas.getObjects().filter(obj => {
      return obj.containsPoint(pointer);
    });

    if (objectsAtPointer[0].name === QUOTE_IMG) {
      addQuoteImage(canvas, objectsAtPointer[0]);
      canvas.requestRenderAll();
    }

    let object = event.target;
    if (object) {
      textEnteringEvent(canvas, object as fabric.Text);
      if (object?.name?.startsWith(LIST_MAIN)) {
        addImage(canvas, object);
        canvas.requestRenderAll();
      }
      if (object?.name === QUOTE_IMG) {
        addQuoteImage(canvas, object);
        canvas.requestRenderAll();
      }
    }
  }
  return { CanvasClick };
}
