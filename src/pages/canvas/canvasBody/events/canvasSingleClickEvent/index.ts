import { Select } from '@mui/material';
import { CYCLE_CIRCLE, CYCLE_TEXT, PROCESS_BOX, PROCESS_TEXT, PYRAMID_LEVEL, PYRAMID_TEXT } from '@/constants/elementNames';
import { AutoResizingTextboxOptions } from '@/utils/fabric-utils/AutoResizingTextbox';
import { fabric } from 'fabric';

export function useCanvasSingleClickEvent() {
  function CanvasSingleClick(
    canvas: fabric.Canvas,
    event: fabric.IEvent<Event>
  ) {
    const pointer: any = canvas.getPointer(event.e);

    const objectsAtPointer = canvas.getObjects().filter(obj => {
      return obj.containsPoint(pointer);
    });

    let object = event.target as any;
    if (object && object.name) {
      if (object.level) {
        if (object.level.startsWith(PROCESS_BOX)) {
          const [_, id, level] = object.level.split('_');
          canvas.forEachObject((obj: any) => {
            if (
              obj.level === `${PROCESS_TEXT}_${id}_${level}` &&
              obj.type === 'textbox'
            ) {
              if (obj.text === 'Add Text') {
                obj.selectAll();
              }
              obj.enterEditing();
            }
          });
        } else if (object.level.startsWith(CYCLE_CIRCLE)){
            const [_, id, level] = object.level.split('_');
            canvas.forEachObject((obj: any) => {
                if (obj.level === `${CYCLE_TEXT}_${id}_${level}` && obj.type === 'textbox') {
                    // console.log(obj.level)
                    if (obj.text === 'Add Text') {
                        obj.selectAll();
                      }
                      obj.enterEditing();
                }
            });
        } else if (object.level.startsWith(PYRAMID_LEVEL)){
          const [_, id, level] = object.level.split('_');
          console.log({id, level})
          canvas.forEachObject((obj: any) => {
              if (obj.level === `${PYRAMID_TEXT}_${id}_${level}` && obj.type === 'textbox') {
                  // console.log(obj.level)
                  if (obj.text === 'Add Text') {
                      obj.selectAll();
                    }
                    obj.enterEditing();
              }
          });
      }
      }
    }

    canvas.renderAll();
  }

  return { CanvasSingleClick };
}
