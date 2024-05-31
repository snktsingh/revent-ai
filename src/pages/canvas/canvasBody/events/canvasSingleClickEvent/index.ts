import { Select } from '@mui/material';
import {
  CYCLE,
  CYCLE_CIRCLE,
  CYCLE_TEXT,
  FUNNEL,
  FUNNEL_BASE,
  FUNNEL_LEVEL,
  FUNNEL_TEXT,
  HUB_AND_SPOKE_BOX,
  HUB_AND_SPOKE_BOX_HEADING,
  HUB_AND_SPOKE_BOX_TEXT,
  HUB_AND_SPOKE_TEXT_BOX,
  PROCESS,
  PROCESS_BOX,
  PROCESS_TEXT,
  PYRAMID,
  PYRAMID_LEVEL,
  PYRAMID_TEXT,
  SWOT_BOX,
  SWOT_TEXT,
} from '@/constants/elementNames';
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
    console.log({object})
    if (object && object.name) {
      if (
        (object.name.startsWith(FUNNEL) ||
         object.name.startsWith(PYRAMID) ||
         object.name.startsWith(PROCESS)||
         object.name.startsWith(CYCLE)
        )
         &&
        object.type !== 'textbox'
      ) {
        exitTextEditing(canvas);
      }

      if (object.name.startsWith(FUNNEL_BASE)) {
        const [_, id] = object.name.split('_');
        canvas.forEachObject((obj: any) => {
          if(obj.name && obj.name === `${FUNNEL}_${id}`){
            canvas.setActiveObject(obj);
          }
        });
      }

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
        } else if (object.level.startsWith(CYCLE_CIRCLE)) {
          const [_, id, level] = object.level.split('_');
          canvas.forEachObject((obj: any) => {
            if (
              obj.level === `${CYCLE_TEXT}_${id}_${level}` &&
              obj.type === 'textbox'
            ) {
              // console.log(obj.level)
              if (obj.text === 'Add Text') {
                obj.selectAll();
              }
              obj.enterEditing();
            }
          });
        } else if (object.level.startsWith(PYRAMID_LEVEL)) {
          const [_, id, level] = object.level.split('_');
          canvas.forEachObject((obj: any) => {
            if (
              obj.level === `${PYRAMID_TEXT}_${id}_${level}` &&
              obj.type === 'textbox'
            ) {
              // console.log(obj.level)
              if (obj.text === 'Add Text') {
                obj.selectAll();
              }
              obj.enterEditing();
            }
            if(obj.name && obj.name === `${PYRAMID}_${id}`){
              canvas.setActiveObject(obj);
            }
          });
        } else if (object.level.startsWith(FUNNEL_LEVEL)) {
          const [_, id, level] = object.level.split('_');
          canvas.forEachObject((obj: any) => {
            if (
              obj.level === `${FUNNEL_TEXT}_${id}_${level}` &&
              obj.type === 'textbox'
            ) {
              // console.log(obj.level)
              if (obj.text === 'Add Text') {
                obj.selectAll();
              }
              obj.enterEditing();
            }
            if(obj.name && obj.name === `${FUNNEL}_${id}`){
              canvas.setActiveObject(obj);
            }
          });
        } else if (object.level.startsWith(SWOT_BOX)) {
          const [_, id, level] = object.level.split('_');
          canvas.forEachObject((obj: any) => {
            if (
              obj.level === `${SWOT_TEXT}_${id}_${level}` &&
              obj.type === 'textbox'
            ) {
              if (obj.text === 'Add Text') {
                obj.selectAll();
              }
              obj.enterEditing();
            }
          });
        } else if (object.level.startsWith(HUB_AND_SPOKE_BOX)) {
          const [_, id, level] = object.level.split('_');
          canvas.forEachObject((obj: any) => {
            if (
              obj.level === `${HUB_AND_SPOKE_BOX_HEADING}_${id}_${level}` &&
              obj.type === 'textbox'
            ) {
              if (obj.text === 'Add Title') {
                obj.selectAll();
              }
              obj.enterEditing();
            }
          });
        } else if (object.level.startsWith(HUB_AND_SPOKE_TEXT_BOX)) {
          const [_, id, level] = object.level.split('_');
          canvas.forEachObject((obj: any) => {
            if (
              obj.level === `${HUB_AND_SPOKE_BOX_TEXT}_${id}_${level}` &&
              obj.type === 'textbox'
            ) {
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

function exitTextEditing(canvas : fabric.Canvas) {
  canvas.forEachObject(function (obj) {
    if ((obj as fabric.Textbox).isEditing) {
      (obj as fabric.Textbox).exitEditing();
    }
  });
}
