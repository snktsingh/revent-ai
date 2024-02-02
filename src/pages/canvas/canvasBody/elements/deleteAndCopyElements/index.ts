import { CYCLE, CYCLE_ARROW, CYCLE_CIRCLE, CYCLE_TEXT, FUNNEL, FUNNEL_BASE, FUNNEL_LEVEL, FUNNEL_TEXT, PROCESS, PROCESS_ARROW, PROCESS_BOX, PROCESS_TEXT, PYRAMID, PYRAMID_LEVEL, PYRAMID_TEXT, TIMELINE, TIMELINE_CIRCLE, TIMELINE_DIRECTION, TIMELINE_HEADING, TIMELINE_TEXT } from '@/constants/elementNames';
import { Copy, DeleteX } from '@/constants/media';
import { fabric } from 'fabric';
export function useDelAndCopy() {
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
        mouseUpHandler: deleteObject,
        render: renderIcon(deleteIcon),
      });

    fabric.Object.prototype.controls.clone =
      fabric.Textbox.prototype.controls.clone = new fabric.Control({
        x: -0.5,
        y: -0.5,
        offsetY: -16,
        offsetX: -16,
        cursorStyle: 'pointer',
        mouseUpHandler: cloneObject,
        render: renderIcon(cloneIcon),
      });

    // Function to delete objects based on their names
    const deleteObjectsByName = (names: string[]) => {
      canvas?.forEachObject(obj => {
        if (names.includes(obj.name || '')) {
          canvas.remove(obj);
        }
      });
      canvas?.renderAll();
    };

    // Function to handle the delete action
    function deleteObject(eventData: MouseEvent): boolean {
      const activeObject = canvas?.getActiveObject();
      const currentElID = activeObject?.name?.split("_")[1];
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
          case 'List_Container':
            objectsToDelete.push('listText', 'listImage', 'ListAddImageText');
            break;
          case 'Table_Container':
            objectsToDelete.push('Table_Text');
            break;
          default:
            break;
        }

        // Delete objects by name
        deleteObjectsByName(objectsToDelete);

        // Remove the active object from the canvas
        canvas?.remove(activeObject);
        canvas?.discardActiveObject();
        canvas?.renderAll();
      }

      return true;
    }

    // Function to handle the clone action
    function cloneObject(
      eventData: MouseEvent,
      transformData: fabric.Transform,
      x: number,
      y: number
    ): boolean {
      const target = transformData.target;
      const canvas = target.canvas;

      if (target instanceof fabric.Group) {
        // Clone each object in the group
        const groupObjects = target.getObjects();
        groupObjects.forEach(obj => {
          obj.clone(function (cloned: fabric.Object) {
            cloned.left! += cloned.width! + 200;
            cloned.top! += 200;
            canvas?.add(cloned);
          });
        });
      } else {
        // Clone a single object
        target.clone(function (cloned: fabric.Object) {
          cloned.left! += 20;
          cloned.top! += 20;
          canvas?.add(cloned);
        });
      }

      return true;
    }

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
  return { CustomBorderIcons };
}
