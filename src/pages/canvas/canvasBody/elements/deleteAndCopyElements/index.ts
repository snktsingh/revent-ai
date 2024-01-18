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

      if (activeObject) {
        const objectsToDelete: string[] = [];

        // Determine objects to delete based on the type of the active object
        switch (activeObject.name) {
          case 'Process_Container':
            objectsToDelete.push('ProcessBox', 'ProcessText', 'ProcessArrow');
            break;
          case 'Timeline_Container':
            objectsToDelete.push(
              'timeLineCircle',
              'TimeLineText',
              'TimeLineDirection',
              'TimeLineHeading'
            );
            break;
          case 'PYRAMID':
            objectsToDelete.push('Pyramid_LEVEL', 'pyramidTextbox');
            break;
          case 'Funnel':
            objectsToDelete.push('Funnel_Text', 'Funnel_Base', 'Funnel_Level');
            break;
          case 'Cycle_Container':
            objectsToDelete.push('Cycle_Arrow', 'Cycle_Circle', 'Cycle_Text');
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
