import { fabric } from 'fabric';
import { FabricObject } from '@/interface/fabricTypes';
import {
  CYCLE,
  CYCLE_ARROW,
  CYCLE_CIRCLE,
  CYCLE_TEXT,
  FUNNEL,
  FUNNEL_BASE,
  FUNNEL_LEVEL,
  FUNNEL_TEXT,
  HUB_AND_SPOKE,
  HUB_AND_SPOKE_BOX,
  HUB_AND_SPOKE_BOX_HEADING,
  HUB_AND_SPOKE_BOX_TEXT,
  HUB_AND_SPOKE_CIRCLE,
  HUB_AND_SPOKE_MAIN_TEXT,
  HUB_AND_SPOKE_TEXT_BOX,
  LIST_MAIN,
  LIST_TEXT,
  PROCESS,
  PROCESS_ARROW,
  PROCESS_BOX,
  PROCESS_TEXT,
  PYRAMID,
  PYRAMID_LEVEL,
  PYRAMID_TEXT,
  QUOTE,
  QUOTE_AUTHOR,
  QUOTE_IMG,
  QUOTE_TEXT,
  STATISTICS,
  STATISTICS_BOX,
  STATISTICS_TEXT,
  STATISTICS_TITLE_TEXT,
  SWOT,
  SWOT_BOX,
  SWOT_TEXT,
  TABLE,
  TABLE_HEADER,
  TABLE_TEXT,
  TIMELINE,
  TIMELINE_CIRCLE,
  TIMELINE_DIRECTION,
  TIMELINE_HEADING,
  TIMELINE_TEXT,
} from '@/constants/elementNames';
import { SWOTIcon } from '@/constants/media';

export function useObjectMovingEvent() {
  const handleObjectMoving = (
    options: fabric.IEvent<MouseEvent>,
    canvas: fabric.Canvas
  ) => {
    const movedObject = options.target as FabricObject | undefined;
    const objectName = movedObject?.name?.split('_');
    const objectID = objectName && objectName[1];
    if (movedObject && objectName) {
      movedObject.setCoords();

      if (objectName[0] === PYRAMID) {
        const lastLeft = movedObject.get('lastLeft') || movedObject.left;
        const lastTop = movedObject.get('lastTop') || movedObject.top;

        var deltaX = movedObject.left! - lastLeft!;
        var deltaY = movedObject.top! - lastTop!;

        canvas.forEachObject(function (obj) {
          let left;
          let top;

          if (
            (obj.name === `${PYRAMID_TEXT}_${objectID}` ||
              obj.name === `${PYRAMID_LEVEL}_${objectID}`) &&
            obj.intersectsWithObject(movedObject!, true, true)
          ) {
            obj
              .set({
                left: obj.left! + deltaX,
                top: obj.top! + deltaY,
              })
              .setCoords();
            left = obj.left! + deltaX;
            top = obj.top! + deltaY;
          }
        });

        movedObject.set({
          lastLeft: movedObject.left,
          lastTop: movedObject.top,
        });
      } else if (objectName[0] === PROCESS) {
        const lastLeft = movedObject.get('lastLeft') || movedObject.left;
        const lastTop = movedObject.get('lastTop') || movedObject.top;

        const deltaX = movedObject.left! - lastLeft!;
        const deltaY = movedObject.top! - lastTop!;

        canvas.forEachObject(function (obj) {
          if (
            obj.name === `${PROCESS_BOX}_${objectID}` ||
            obj.name === `${PROCESS_TEXT}_${objectID}` ||
            obj.name === `${PROCESS_ARROW}_${objectID}`
          ) {
            obj
              .set({
                left: obj.left! + deltaX,
                top: obj.top! + deltaY,
              })
              .setCoords();
          }
        });

        movedObject
          .set({
            lastLeft: movedObject.left,
            lastTop: movedObject.top,
          })
          .setCoords();
      } else if (objectName[0] === TIMELINE) {
        const lastLeft = movedObject.get('lastLeft') || movedObject.left;
        const lastTop = movedObject.get('lastTop') || movedObject.top;

        const deltaX = movedObject.left! - lastLeft!;
        const deltaY = movedObject.top! - lastTop!;

        canvas.forEachObject(function (obj) {
          if (
            obj.name === `${TIMELINE_DIRECTION}_${objectID}` ||
            obj.name === `${TIMELINE_TEXT}_${objectID}` ||
            obj.name === `${TIMELINE_HEADING}_${objectID}` ||
            obj.name === `${TIMELINE_CIRCLE}_${objectID}`
          ) {
            obj
              .set({
                left: obj.left! + deltaX,
                top: obj.top! + deltaY,
              })
              .setCoords();
          }
        });

        movedObject
          .set({
            lastLeft: movedObject.left,
            lastTop: movedObject.top,
          })
          .setCoords();
      } else if (objectName[0] === CYCLE) {
        const lastLeft = movedObject.get('lastLeft') || movedObject.left;
        const lastTop = movedObject.get('lastTop') || movedObject.top;

        const deltaX = movedObject.left! - lastLeft!;
        const deltaY = movedObject.top! - lastTop!;

        canvas.forEachObject(function (obj) {
          if (
            obj.name === `${CYCLE_CIRCLE}_${objectID}` ||
            obj.name === `${CYCLE_TEXT}_${objectID}` ||
            obj.name === `${CYCLE_ARROW}_${objectID}`
          ) {
            obj
              .set({
                left: obj.left! + deltaX,
                top: obj.top! + deltaY,
              })
              .setCoords();
          }
        });

        movedObject.set({
          lastLeft: movedObject.left,
          lastTop: movedObject.top,
        });
      } else if (objectName[0] === FUNNEL) {
        const lastLeft = movedObject.get('lastLeft') || movedObject.left;
        const lastTop = movedObject.get('lastTop') || movedObject.top;

        const deltaX = movedObject.left! - lastLeft!;
        const deltaY = movedObject.top! - lastTop!;


        let activeObj = canvas.getActiveObject();
        let activeLeft = activeObj?.left || 0;
        


        canvas.forEachObject(function (obj) {
          if (
            obj.name === `${FUNNEL_TEXT}_${objectID}` ||
            obj.name == `${FUNNEL_LEVEL}_${objectID}` ||
            obj.name == `${FUNNEL_BASE}_${objectID}`
          ) {
            obj
              .set({
                left: obj.left! + deltaX,
                top: obj.top! + deltaY,
              })
              .setCoords();
          }    
        });

        movedObject
          .set({
            lastLeft: movedObject.left,
            lastTop: movedObject.top,
          })
          .setCoords();

      } else if (movedObject.name === `${LIST_MAIN}_${objectID}`) {
        const lastLeft = movedObject.get('lastLeft') || movedObject.left;
        const lastTop = movedObject.get('lastTop') || movedObject.top;

        const deltaX = movedObject.left! - lastLeft!;
        const deltaY = movedObject.top! - lastTop!;

        canvas.forEachObject(function (obj) {
          if (
            obj.name === `${LIST_TEXT}_${objectID}` ||
            obj.name === 'ListAddImageText' ||
            obj.name === 'listImage'
          ) {
            obj
              .set({
                left: obj.left! + deltaX,
                top: obj.top! + deltaY,
              })
              .setCoords();
          }
        });

        movedObject
          .set({
            lastLeft: movedObject.left,
            lastTop: movedObject.top,
          })
          .setCoords();
      } else if (objectName[0] === TABLE) {
        const lastLeft = movedObject.get('lastLeft') || movedObject.left;
        const lastTop = movedObject.get('lastTop') || movedObject.top;
        const deltaX = movedObject.left! - lastLeft!;
        const deltaY = movedObject.top! - lastTop!;
        
        canvas.forEachObject(function (obj) {
          let left;
          let top;
          if (
            obj.name?.startsWith(`${TABLE_TEXT}_`) &&
            obj.intersectsWithObject(movedObject, true, true)
          ) {
            obj
              .set({
                left: obj.left! + deltaX,
                top: obj.top! + deltaY,
              })
              .setCoords();
            left = obj.left! + deltaX;
            top = obj.top! + deltaY;
          }

          if (
            obj.name?.startsWith(`${TABLE_HEADER}_`) &&
            obj.intersectsWithObject(movedObject, true, true)
          ) {
            obj
              .set({
                left: obj.left! + deltaX,
                top: obj.top! + deltaY,
              })
              .setCoords();
            left = obj.left! + deltaX;
            top = obj.top! + deltaY;
          }
        });

        movedObject.set({
          lastLeft: movedObject.left,
          lastTop: movedObject.top,
        });
      } else if (objectName[0] === QUOTE) {
        const lastLeft = movedObject.get('lastLeft') || movedObject.left;
        const lastTop = movedObject.get('lastTop') || movedObject.top;

        const deltaX = movedObject.left! - lastLeft!;
        const deltaY = movedObject.top! - lastTop!;

        canvas.forEachObject(function (obj) {
          if (
            obj.name?.startsWith(QUOTE_AUTHOR) ||
            obj.name?.startsWith(QUOTE_TEXT) ||
            obj.name?.startsWith(QUOTE_IMG)
          ) {
            obj
              .set({
                left: obj.left! + deltaX,
                top: obj.top! + deltaY,
              })
              .setCoords();
          }
        });

        movedObject
          .set({
            lastLeft: movedObject.left,
            lastTop: movedObject.top,
          })
          .setCoords();
      }
      else if (objectName[0] === SWOT) {
        const lastLeft = movedObject.get('lastLeft') || movedObject.left;
        const lastTop = movedObject.get('lastTop') || movedObject.top;

        const deltaX = movedObject.left! - lastLeft!;
        const deltaY = movedObject.top! - lastTop!;

        canvas.forEachObject(function (obj) {
          if (
            obj.name?.startsWith(SWOT_BOX) ||
            obj.name?.startsWith(SWOT_TEXT) ||
            obj.name?.startsWith(SWOTIcon)
          ) {
            obj
              .set({
                left: obj.left! + deltaX,
                top: obj.top! + deltaY,
              })
              .setCoords();
          }
        });

        movedObject
          .set({
            lastLeft: movedObject.left,
            lastTop: movedObject.top,
          })
          .setCoords();
      }
      else if (objectName[0] === HUB_AND_SPOKE) {
        const lastLeft = movedObject.get('lastLeft') || movedObject.left;
        const lastTop = movedObject.get('lastTop') || movedObject.top;

        const deltaX = movedObject.left! - lastLeft!;
        const deltaY = movedObject.top! - lastTop!;

        canvas.forEachObject(function (obj) {
          if (
            obj.name?.startsWith(HUB_AND_SPOKE_BOX) ||
            obj.name?.startsWith(HUB_AND_SPOKE_BOX_HEADING) ||
            obj.name?.startsWith(HUB_AND_SPOKE_BOX_TEXT) ||
            obj.name?.startsWith(HUB_AND_SPOKE_CIRCLE) ||
            obj.name?.startsWith(HUB_AND_SPOKE_TEXT_BOX) ||
            obj.name?.startsWith(HUB_AND_SPOKE_MAIN_TEXT) 
          ) {
            obj
              .set({
                left: obj.left! + deltaX,
                top: obj.top! + deltaY,
              })
              .setCoords();
          }
        });

        movedObject
          .set({
            lastLeft: movedObject.left,
            lastTop: movedObject.top,
          })
          .setCoords();
      }
      else if (objectName[0] === STATISTICS) {
        const lastLeft = movedObject.get('lastLeft') || movedObject.left;
        const lastTop = movedObject.get('lastTop') || movedObject.top;

        const deltaX = movedObject.left! - lastLeft!;
        const deltaY = movedObject.top! - lastTop!;

        canvas.forEachObject(function (obj) {
          if (
            obj.name?.startsWith(STATISTICS_BOX) ||
            obj.name?.startsWith(STATISTICS_TEXT) ||
            obj.name?.startsWith(STATISTICS_TITLE_TEXT) 
          ) {
            obj
              .set({
                left: obj.left! + deltaX,
                top: obj.top! + deltaY,
              })
              .setCoords();
          }
        });

        movedObject
          .set({
            lastLeft: movedObject.left,
            lastTop: movedObject.top,
          })
          .setCoords();
      }
    }
    canvas?.renderAll();
  };

  return { handleObjectMoving };
}
