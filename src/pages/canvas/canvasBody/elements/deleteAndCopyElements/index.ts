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
  LIST_IMG,
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
  SWOT,
  SWOT_BOX,
  SWOT_ICON,
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
import { Copy, DeleteX, SWOTIcon } from '@/constants/media';
import {
  updateFunnelId,
  updatePyramidId,
  updateSwotId,
} from '@/redux/reducers/fabricElements';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fabric } from 'fabric';

export function useDelAndCopy() {
  const { pyramidId, funnelId, timelineId, processId, cycleId, swotID } =
    useAppSelector(state => state.elementsIds);
  const dispatch = useAppDispatch();
  const CustomBorderIcons = (canvas: fabric.Canvas | null) => {
    // Load icon images
    const deleteIcon = new Image();
    deleteIcon.src = DeleteX;
    const cloneIcon = new Image();
    cloneIcon.src = Copy;

    // Add custom controls for delete and clone actions
    fabric.Object.prototype.controls.deleteControl =
      fabric.Textbox.prototype.controls.deleteControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: -16,
        offsetX: 16,
        cursorStyle: 'pointer',
        mouseUpHandler: () => true,
        render: renderIcon(deleteIcon),
      });

    fabric.Object.prototype.controls.clone =
      fabric.Textbox.prototype.controls.clone = new fabric.Control({
        x: -0.5,
        y: -0.5,
        offsetY: -16,
        offsetX: -16,
        cursorStyle: 'pointer',
        mouseUpHandler: () => true,
        render: renderIcon(cloneIcon),
      });

    // Function to render custom icons on the canvas
    function renderIcon(icon: HTMLImageElement) {
      return (
        ctx: CanvasRenderingContext2D,
        left: number,
        top: number,
        styleOverride: any,
        fabricObject: fabric.Object
      ) => {
        const size = 24;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle || 0));
        ctx.drawImage(icon, -size / 2, -size / 2, size, size);
        ctx.restore();
      };
    }

    // Render all objects on the canvas
    canvas?.renderAll();
  };

  // Function to handle the delete action
  function deleteObject(canvas: fabric.Canvas | null): boolean {
    const activeObject = canvas?.getActiveObject();
    const currentElID = activeObject?.name?.split('_')[1];
    if (activeObject) {
      const objectsToDelete: string[] = [];

      // Determine objects to delete based on the type of the active object
      switch (activeObject.name) {
        case `${PROCESS}_${currentElID}`:
          objectsToDelete.push(
            `${PROCESS_BOX}_${currentElID}`,
            `${PROCESS_TEXT}_${currentElID}`,
            `${PROCESS_ARROW}_${currentElID}`
          );
          break;
        case `${TIMELINE}_${currentElID}`:
          objectsToDelete.push(
            `${TIMELINE_CIRCLE}_${currentElID}`,
            `${TIMELINE_TEXT}_${currentElID}`,
            `${TIMELINE_DIRECTION}_${currentElID}`,
            `${TIMELINE_HEADING}_${currentElID}`
          );
          break;
        case `${PYRAMID}_${currentElID}`:
          objectsToDelete.push(
            `${PYRAMID_LEVEL}_${currentElID}`,
            `${PYRAMID_TEXT}_${currentElID}`
          );
          break;
        case `${FUNNEL}_${currentElID}`:
          objectsToDelete.push(
            `${FUNNEL_TEXT}_${currentElID}`,
            `${FUNNEL_BASE}_${currentElID}`,
            `${FUNNEL_LEVEL}_${currentElID}`
          );
          break;
        case `${CYCLE}_${currentElID}`:
          objectsToDelete.push(
            `${CYCLE_ARROW}_${currentElID}`,
            `${CYCLE_CIRCLE}_${currentElID}`,
            `${CYCLE_TEXT}_${currentElID}`
          );
          break;
        case `${LIST_MAIN}_${currentElID}`:
          objectsToDelete.push(
            `${LIST_TEXT}_${currentElID}`,
            `${LIST_IMG}_${currentElID}`
          );
          break;
        case `${TABLE}_`:
          objectsToDelete.push(TABLE);
          break;
        case `${QUOTE}_`:
          objectsToDelete.push(QUOTE_IMG, QUOTE_AUTHOR, QUOTE_TEXT);
          break;
        case QUOTE_AUTHOR:
          objectsToDelete.push(QUOTE_IMG, QUOTE);
          break;
        case `${PYRAMID_LEVEL}_${currentElID}`:
          const [_, id, level] =
            (activeObject as any).level &&
            (activeObject as any).level.split('_');
          objectsToDelete.push(`${PYRAMID_TEXT}_${currentElID}_${level}`);
          break;
        case `${SWOT}_${currentElID}`:
          objectsToDelete.push(`${SWOT_BOX}_${currentElID}`, `${SWOT_TEXT}_${currentElID}`, `${SWOTIcon}_${currentElID}`);
          break;
        case `${HUB_AND_SPOKE}_${currentElID}`:
          objectsToDelete.push(`${HUB_AND_SPOKE_BOX}_${currentElID}`, `${HUB_AND_SPOKE_BOX_HEADING}_${currentElID}`, `${HUB_AND_SPOKE_BOX_TEXT}_${currentElID}`, `${HUB_AND_SPOKE_CIRCLE}_${currentElID}`, `${HUB_AND_SPOKE_MAIN_TEXT}_${currentElID}`);
          break;
        default:
          break;
      }

      // Delete objects by name
      deleteObjectsByName(objectsToDelete, canvas);

      // Remove the active object from the canvas
      const activeObjects = canvas?.getActiveObjects();

      activeObjects?.forEach(object => {
        canvas?.remove(object);
      });

      canvas?.discardActiveObject();
      canvas?.requestRenderAll();
    }

    return true;
  }

  const deleteObjectsByName = (
    names: string[],
    canvas: fabric.Canvas | null
  ) => {
    canvas?.forEachObject(obj => {
      if (names.includes(obj.name || '')) {
        canvas.remove(obj);
      }
      if (names.includes(TABLE)) {
        if (
          obj?.name?.startsWith(TABLE_TEXT) ||
          obj?.name?.startsWith(TABLE_HEADER)
        ) {
          canvas.remove(obj);
        }
      }
    });
    canvas?.renderAll();
  };

  // // Function to handle the clone action
  // function cloneObject(
  //   eventData: MouseEvent,
  //   transformData: fabric.Transform,
  //   x: number,
  //   y: number
  // ): boolean {
  //   const target = transformData.target;
  //   const canvas = target.canvas;

  //   if (target instanceof fabric.Group) {
  //     // Clone each object in the group
  //     const groupObjects = target.getObjects();
  //     groupObjects.forEach(obj => {
  //       obj.clone(function (cloned: fabric.Object) {
  //         cloned.left! += cloned.width! + 200;
  //         cloned.top! += 200;
  //         canvas?.add(cloned);
  //       });
  //     });
  //   } else {
  //     // Clone a single object
  //     target.clone(function (cloned: fabric.Object) {
  //       cloned.left! += 20;
  //       cloned.top! += 20;
  //       canvas?.add(cloned);
  //     });
  //   }

  //   return true;
  // }

  // Function to handle the clone action for multiple selected elements
  function handleCopyClick(
    selectedObjects: fabric.Object[],
    canvas: fabric.Canvas | null
  ): void {
    selectedObjects.forEach(target => {
      if (target instanceof fabric.Group) {
        const elName = target.name?.split('_');

        // Clone each object in the group
        target.clone(function (cloned: fabric.Object) {
          cloned.left! += cloned.width! + 20;
          cloned.name = elName && elementNameGenerate(elName[0], cloned);
          canvas?.add(cloned);
          if (
            canvas &&
            elName &&
            cloned.left &&
            cloned.top &&
            cloned.width &&
            cloned.height
          ) {
            copyGroupedElements(
              canvas,
              elName[0],
              +elName[1],
              cloned.left,
              cloned.top,
              cloned.width,
              cloned.height
            );
          }
          canvas?.renderAll();
        });

        // const groupObjects = target.getObjects();
        // groupObjects.forEach(obj => {
        //   obj.clone(function (cloned: fabric.Object) {
        //     cloned.left! += 200;
        //     cloned.top! += 200;
        //     canvas?.add(cloned);
        //   });
        // });
      } else {
        // Clone a single object
        if (target.name?.startsWith(TIMELINE)) {
          const elName = target.name?.split('_');
          target.clone(function (cloned: fabric.Object) {
            cloned.top! += cloned.height! + 10;
            cloned.name = elName && elementNameGenerate(elName[0], cloned);
            canvas?.add(cloned);
            if (
              canvas &&
              elName &&
              cloned.left &&
              cloned.top &&
              cloned.width &&
              cloned.height
            ) {
              copyGroupedElements(
                canvas,
                elName[0],
                +elName[1],
                cloned.left,
                cloned.top,
                cloned.width,
                cloned.height
              );
            }
            canvas?.renderAll();
          });
        } else if (target.name?.startsWith(PROCESS)) {
          const elName = target.name?.split('_');
          target.clone(function (cloned: fabric.Object) {
            cloned.top! += cloned.height! + 10;
            cloned.name = elName && elementNameGenerate(elName[0], cloned);
            canvas?.add(cloned);
            if (
              canvas &&
              elName &&
              cloned.left &&
              cloned.top &&
              cloned.width &&
              cloned.height
            ) {
              copyGroupedElements(
                canvas,
                elName[0],
                +elName[1],
                cloned.left,
                cloned.top,
                cloned.width,
                cloned.height
              );
            }
            canvas?.renderAll();
          });
        } else if (target.name?.startsWith(CYCLE)) {
          const elName = target.name?.split('_');
          target.clone(function (cloned: fabric.Object) {
            cloned.left! += cloned.width! + 10;
            cloned.name = elName && elementNameGenerate(elName[0], cloned);
            canvas?.add(cloned);
            if (
              canvas &&
              elName &&
              cloned.left &&
              cloned.top &&
              cloned.width &&
              cloned.height
            ) {
              copyGroupedElements(
                canvas,
                elName[0],
                +elName[1],
                cloned.left,
                cloned.top,
                cloned.width,
                cloned.height
              );
            }
            canvas?.renderAll();
          });
        } else if (target.name?.startsWith(QUOTE)) {
          const elName = target.name?.split('_');
          target.clone(function (cloned: fabric.Object) {
            cloned.top! += cloned.height! + 10;
            cloned.name = elName && elementNameGenerate(elName[0], cloned);
            canvas?.add(cloned);
            if (
              canvas &&
              elName &&
              cloned.left &&
              cloned.top &&
              cloned.width &&
              cloned.height
            ) {
              copyGroupedElements(
                canvas,
                elName[0],
                +elName[1],
                cloned.left,
                cloned.top,
                cloned.width,
                cloned.height
              );
            }
            canvas?.renderAll();
          });
        } else if (target.name?.startsWith(SWOT)) {
          const elName = target.name?.split('_');
          target.clone(function (cloned: fabric.Object) {
            cloned.top! += cloned.height! + 10;
            cloned.name = elName && elementNameGenerate(elName[0], cloned);
            canvas?.add(cloned);
            if (
              canvas &&
              elName &&
              cloned.left &&
              cloned.top &&
              cloned.width &&
              cloned.height
            ) {
              copyGroupedElements(
                canvas,
                elName[0],
                +elName[1],
                cloned.left,
                cloned.top,
                cloned.width,
                cloned.height
              );
            }
            canvas?.renderAll();
          });
        } else {
          target.clone(function (cloned: fabric.Object) {
            cloned.left! += 50;
            cloned.top! += 50;
            canvas?.add(cloned);
          });
        }
      }
    });
  }

  function copyGroupedElements(
    canvas: fabric.Canvas,
    elementName: string,
    id: number,
    left: number,
    top: number,
    elWidth: number,
    elHeight: number
  ) {
    canvas.getObjects().forEach(obj => {
      if (
        elementName.startsWith(PYRAMID) &&
        obj.name === `${PYRAMID_TEXT}_${id}`
      ) {
        obj.clone(function (cloned: fabric.Object) {
          cloned.left! += elWidth + 20;
          cloned.name = `${PYRAMID_TEXT}_${pyramidId}`;
          canvas?.add(cloned);
        });
      } else if (
        elementName.startsWith(FUNNEL) &&
        obj.name === `${FUNNEL_TEXT}_${id}`
      ) {
        obj.clone(function (cloned: fabric.Object) {
          cloned.left! += elWidth + 20;
          cloned.name = `${FUNNEL_TEXT}_${funnelId}`;
          canvas?.add(cloned);
        });
      } else if (
        elementName.startsWith(TIMELINE) &&
        (obj.name === `${TIMELINE_HEADING}_${id}` ||
          obj.name === `${TIMELINE_CIRCLE}_${id}` ||
          obj.name === `${TIMELINE_DIRECTION}_${id}` ||
          obj.name === `${TIMELINE_TEXT}_${id}`)
      ) {
        let newElementName =
          obj.name === `${TIMELINE_HEADING}_${id}`
            ? `${TIMELINE_HEADING}_${timelineId}`
            : obj.name === `${TIMELINE_CIRCLE}_${id}`
            ? `${TIMELINE_CIRCLE}_${timelineId}`
            : obj.name === `${TIMELINE_TEXT}_${id}`
            ? `${TIMELINE_TEXT}_${timelineId}`
            : obj.name === `${TIMELINE_DIRECTION}_${id}`
            ? `${TIMELINE_DIRECTION}_${timelineId}`
            : TIMELINE;
        obj.clone(function (cloned: fabric.Object) {
          cloned.top! += elHeight + 10;
          cloned.name = newElementName;
          canvas?.add(cloned);
        });
      } else if (
        elementName.startsWith(PROCESS) &&
        (obj.name === `${PROCESS_ARROW}_${id}` ||
          obj.name === `${PROCESS_BOX}_${id}` ||
          obj.name === `${PROCESS_TEXT}_${id}`)
      ) {
        let newElementName =
          obj.name === `${PROCESS_ARROW}_${id}`
            ? `${PROCESS_ARROW}_${processId}`
            : obj.name === `${PROCESS_BOX}_${id}`
            ? `${PROCESS_BOX}_${processId}`
            : obj.name === `${PROCESS_TEXT}_${id}`
            ? `${PROCESS_TEXT}_${processId}`
            : PROCESS;
        obj.clone(function (cloned: fabric.Object) {
          cloned.top! += elHeight + 10;
          cloned.name = newElementName;
          canvas?.add(cloned);
        });
      } else if (
        elementName.startsWith(CYCLE) &&
        (obj.name === `${CYCLE_ARROW}_${id}` ||
          obj.name === `${CYCLE_CIRCLE}_${id}` ||
          obj.name === `${CYCLE_TEXT}_${id}`)
      ) {
        let newElementName =
          obj.name === `${CYCLE_ARROW}_${id}`
            ? `${CYCLE_ARROW}_${cycleId}`
            : obj.name === `${CYCLE_CIRCLE}_${id}`
            ? `${CYCLE_CIRCLE}_${cycleId}`
            : obj.name === `${CYCLE_TEXT}_${id}`
            ? `${CYCLE_TEXT}_${cycleId}`
            : CYCLE;
        obj.clone(function (cloned: fabric.Object) {
          cloned.left! += elWidth + 10;
          cloned.name = newElementName;
          canvas?.add(cloned);
        });
      } else if (
        elementName.startsWith(QUOTE) &&
        (obj.name === QUOTE_TEXT ||
          obj.name === QUOTE_AUTHOR ||
          obj.name === QUOTE_IMG)
      ) {
        let newElementName =
          obj.name === QUOTE_TEXT
            ? QUOTE_TEXT
            : obj.name === QUOTE_AUTHOR
            ? QUOTE_AUTHOR
            : obj.name === QUOTE_IMG
            ? QUOTE_IMG
            : QUOTE;
        obj.clone(function (cloned: fabric.Object) {
          cloned.top! += elHeight + 10;
          cloned.name = newElementName;
          canvas?.add(cloned);
        });
      } else if (
        elementName.startsWith(SWOT) &&
        (obj.name === `${SWOT_TEXT}_${id}` ||
          obj.name === `${SWOT_BOX}_${id}` ||
          obj.name === `${SWOTIcon}_${id}`)
      ) {
        let newElementName =
          obj.name === `${SWOT_TEXT}_${id}`
            ? `${SWOT_TEXT}_${swotID}`
            : obj.name === `${SWOT_BOX}_${id}`
            ? `${SWOT_BOX}_${swotID}`
            : obj.name === `${SWOTIcon}_${id}`
            ? `${SWOTIcon}_${swotID}`
            : SWOT;
        obj.clone(function (cloned: fabric.Object) {
          cloned.top! += elHeight + 10;
          cloned.name = newElementName;
          canvas?.add(cloned);
        });
      }
    });
  }

  function elementNameGenerate(
    elName: string,
    clonedObject: fabric.Object
  ): string {
    let newElementName = '';
    switch (elName) {
      case PYRAMID:
        newElementName = `${PYRAMID}_${pyramidId}`;
        (clonedObject as fabric.Group).forEachObject(obj => {
          const objName = obj.name?.split('_');
          obj.name = objName && `${objName[0]}_${pyramidId}`;
        });
        dispatch(updatePyramidId());
        break;
      case FUNNEL:
        newElementName = `${FUNNEL}_${funnelId}`;
        (clonedObject as fabric.Group).forEachObject(obj => {
          const objName =
            obj.type === 'polygon'
              ? `${FUNNEL_LEVEL}_${funnelId}`
              : obj.type === 'rect'
              ? `${FUNNEL_BASE}_${funnelId}`
              : FUNNEL;
          obj.set({
            name: objName,
          });
        });

        (clonedObject as fabric.Group).setCoords();

        dispatch(updateFunnelId());
        break;
      case TIMELINE:
        newElementName = `${TIMELINE}_${timelineId}`;
        dispatch(updatePyramidId());
        break;
      case PROCESS:
        newElementName = `${PROCESS}_${processId}`;
        dispatch(updatePyramidId());
        break;
      case CYCLE:
        newElementName = `${CYCLE}_${cycleId}`;
        dispatch(updatePyramidId());
        break;
      case SWOT:
        newElementName = `${SWOT}_${swotID}`;
        dispatch(updateSwotId());
        break;
      default:
        break;
    }

    return newElementName;
  }

  return { CustomBorderIcons, deleteObject, handleCopyClick };
}
