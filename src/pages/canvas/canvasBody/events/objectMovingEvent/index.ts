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
  PROCESS,
  PROCESS_ARROW,
  PROCESS_BOX,
  PROCESS_TEXT,
  PYRAMID,
  PYRAMID_TEXT,
  TABLE,
  TABLE_TEXT,
  TIMELINE,
  TIMELINE_CIRCLE,
  TIMELINE_DIRECTION,
  TIMELINE_HEADING,
  TIMELINE_TEXT,
} from '@/constants/elementNames';

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
            obj.name === `${PYRAMID_TEXT}_${objectID}` &&
            obj.intersectsWithObject(movedObject!, true, true)
          ) {
            obj
              .set({
                left: obj.left! + deltaX,
                top: obj.top! + deltaY,
                name: `${PYRAMID_TEXT}_${objectID}`,
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

        var deltaX = movedObject.left! - lastLeft!;
        var deltaY = movedObject.top! - lastTop!;

        canvas.forEachObject(function (obj) {
          let left;
          let top;

          if (
            obj.name === `${PROCESS_BOX}_${objectID}` &&
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
            obj.name == `${PROCESS_TEXT}_${objectID}` &&
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
            obj.name == `${PROCESS_ARROW}_${objectID}` &&
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
      } else if (objectName[0] === TIMELINE) {
        const lastLeft = movedObject.get('lastLeft') || movedObject.left;
        const lastTop = movedObject.get('lastTop') || movedObject.top;

        var deltaX = movedObject.left! - lastLeft!;
        var deltaY = movedObject.top! - lastTop!;

        canvas.forEachObject(function (obj) {
          let left;
          let top;

          if (
            obj.name === `${TIMELINE_DIRECTION}_${objectID}` &&
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
            obj.name == `${TIMELINE_TEXT}_${objectID}` &&
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
            obj.name == `${TIMELINE_HEADING}_${objectID}` &&
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
            obj.name == `${TIMELINE_CIRCLE}_${objectID}` &&
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
        movedObject.setCoords();
      } else if (objectName[0] === CYCLE) {
        const lastLeft = movedObject.get('lastLeft') || movedObject.left;
        const lastTop = movedObject.get('lastTop') || movedObject.top;

        var deltaX = movedObject.left! - lastLeft!;
        var deltaY = movedObject.top! - lastTop!;

        canvas.forEachObject(function (obj) {
          let left;
          let top;

          if (
            obj.name === `${CYCLE_CIRCLE}_${objectID}` &&
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
            obj.name == `${CYCLE_TEXT}_${objectID}` &&
            obj.intersectsWithObject(movedObject, true, true)
          ) {
            obj
              .set({
                left: obj.left!! + deltaX,
                top: obj.top! + deltaY,
              })
              .setCoords();
            left = obj.left! + deltaX;
            top = obj.top! + deltaY;
          }

          if (
            obj.name == `${CYCLE_ARROW}_${objectID}` &&
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
      } else if (objectName[0] === FUNNEL) {
        const lastLeft = movedObject.get('lastLeft') || movedObject.left;
        const lastTop = movedObject.get('lastTop') || movedObject.top;

        var deltaX = movedObject.left! - lastLeft!;
        var deltaY = movedObject.top! - lastTop!;

        canvas.forEachObject(function (obj) {
          let left;
          let top;

          if (
            obj.name === `${FUNNEL_TEXT}_${objectID}` &&
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
            obj.name == `${FUNNEL_LEVEL}_${objectID}` &&
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

          // if (
          //   obj.name == `${FUNNEL_BASE}_${objectID}` &&
          //   obj.intersectsWithObject(movedObject, true, true)
          // ) {
          //   obj
          //     .set({
          //       left: obj.left! + deltaX,
          //       top: obj.top! + deltaY,
          //     })
          //     .setCoords();
          //   left = obj.left! + deltaX;
          //   top = obj.top! + deltaY;
          // }
        });

        movedObject.set({
          lastLeft: movedObject.left,
          lastTop: movedObject.top,
        });
        let top = movedObject.top;
        canvas.getObjects().reverse().forEach(function (obj) {
          if (
            obj.name === `${FUNNEL_TEXT}_${objectID}`
          ) {
            obj
              .set({
                left: movedObject.left! + movedObject?.width! / 2 - 70,
                top: top && top+12,
              })
              .setCoords();
          }
               top= top && top+50;
        });
      } else if (
        movedObject.name === 'List_Container' ||
        movedObject.name === 'LIST_ELEMENT'
      ) {
        const lastLeft = movedObject.get('lastLeft') || movedObject.left;
        const lastTop = movedObject.get('lastTop') || movedObject.top;

        var deltaX = movedObject.left! - lastLeft!;
        var deltaY = movedObject.top! - lastTop!;

        canvas.forEachObject(function (obj) {
          let left;
          let top;

          if (
            obj.name === 'listText' &&
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
            obj.name == 'ListAddImageText' &&
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
            obj.name == 'listImage' &&
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
      } else if (objectName[0] === TABLE) {
        const lastLeft = movedObject.get('lastLeft') || movedObject.left;
        const lastTop = movedObject.get('lastTop') || movedObject.top;

        var deltaX = movedObject.left! - lastLeft!;
        var deltaY = movedObject.top! - lastTop!;

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
        });

        movedObject.set({
          lastLeft: movedObject.left,
          lastTop: movedObject.top,
        });
      }
    }
    canvas?.requestRenderAll();
  };

  return { handleObjectMoving };
}
