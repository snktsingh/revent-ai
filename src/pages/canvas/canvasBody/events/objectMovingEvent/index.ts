import { fabric } from "fabric";
import { IExtendedTextboxOptions } from "../../elements";
interface FabricObject extends fabric.Object {
    lastLeft: number;
    lastTop: number;
  }

export function useObjectMovingEvent(){
      const handleObjectMoving = (
        options: fabric.IEvent<MouseEvent>,
        canvas: fabric.Canvas
      ) => {
        const movedObject = options.target as FabricObject | undefined;
        if (movedObject) {
          movedObject.setCoords();
    
          if (movedObject?.name === 'PYRAMID') {
            const lastLeft = movedObject.get('lastLeft') || movedObject.left;
            const lastTop = movedObject.get('lastTop') || movedObject.top;
    
            var deltaX = movedObject.left! - lastLeft!;
            var deltaY = movedObject.top! - lastTop!;
    
            canvas.forEachObject(function (obj) {
              let left;
              let top;
    
              if (
                obj.name === 'pyramidTextbox' &&
                obj.intersectsWithObject(movedObject!, true, true)
              ) {
                obj
                  .set({
                    left: obj.left! + deltaX,
                    top: obj.top! + deltaY,
                    name: 'pyramidTextbox',
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
          } else if (movedObject.name === 'Cycle_Container') {
            const lastLeft = movedObject.get('lastLeft') || movedObject.left;
            const lastTop = movedObject.get('lastTop') || movedObject.top;
    
            var deltaX = movedObject.left! - lastLeft!;
            var deltaY = movedObject.top! - lastTop!;
    
            canvas.forEachObject(function (obj) {
              let left;
              let top;
    
              if (
                obj.name === 'Cycle_Circle' &&
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
                obj.name == 'Cycle_Text' &&
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
                obj.name == 'Cycle_Arrow' &&
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
          } else if (movedObject.name === 'Funnel') {
            const lastLeft = movedObject.get('lastLeft') || movedObject.left;
            const lastTop = movedObject.get('lastTop') || movedObject.top;
    
            var deltaX = movedObject.left! - lastLeft!;
            var deltaY = movedObject.top! - lastTop!;
    
            canvas.forEachObject(function (obj) {
              let left;
              let top;
    
              if (
                obj.name === 'Funnel_Text' &&
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
                obj.name == 'Funnel_Level' &&
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
                obj.name == 'Funnel_Base' &&
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