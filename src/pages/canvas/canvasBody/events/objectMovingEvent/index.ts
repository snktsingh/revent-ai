import { fabric } from "fabric";
import { FabricObject } from "@/interface/fabricTypes";
import { CYCLE, CYCLE_ARROW, CYCLE_CIRCLE, CYCLE_TEXT, FUNNEL, FUNNEL_BASE, FUNNEL_LEVEL, FUNNEL_TEXT, PYRAMID, PYRAMID_TEXT } from "@/constants/elementNames";

export function useObjectMovingEvent(){
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
          } else if (movedObject?.name === 'Process_Container') {
            const lastLeft = movedObject.get('lastLeft') || movedObject.left;
            const lastTop = movedObject.get('lastTop') || movedObject.top;
    
            var deltaX = movedObject.left! - lastLeft!;
            var deltaY = movedObject.top! - lastTop!;
    
            canvas.forEachObject(function (obj) {
              let left;
              let top;
    
              if (
                obj.name === 'ProcessBox' &&
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
                obj.name == 'ProcessText' &&
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
                obj.name == 'ProcessArrow' &&
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
          } else if (movedObject.name === 'Timeline_Container') {
            const lastLeft = movedObject.get('lastLeft') || movedObject.left;
            const lastTop = movedObject.get('lastTop') || movedObject.top;
    
            var deltaX = movedObject.left! - lastLeft!;
            var deltaY = movedObject.top! - lastTop!;
    
            canvas.forEachObject(function (obj) {
              let left;
              let top;
    
              if (
                obj.name === 'TimeLineDirection' &&
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
                obj.name == 'TimeLineText' &&
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
                obj.name == 'TimeLineHeading' &&
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
                obj.name == 'timeLineCircle' &&
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
    
              if (
                obj.name == `${FUNNEL_BASE}_${objectID}` &&
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
          }
        }
        canvas?.requestRenderAll();
      };
    
      return { handleObjectMoving };
}