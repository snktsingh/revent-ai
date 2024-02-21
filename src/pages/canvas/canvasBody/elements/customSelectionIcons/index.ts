import { AddPlus, MinusIcon, imageIcon } from '@/constants/media';
import { fabric } from 'fabric';
import {
  useCycleElement,
  useFunnelElement,
  useListElement,
  useProcessElement,
  usePyramidElement,
  useTableElement,
  useTimelineElement
} from '../elementExports';
import { CYCLE, FUNNEL, PROCESS, PYRAMID, TABLE, TIMELINE } from '@/constants/elementNames';
export const useCustomSelectionIcons = () => {
  const { addProcessSteps } = useProcessElement();
  const { addPyramidLevel } = usePyramidElement();
  const { addFunnelLevels } = useFunnelElement();
  const { addCycleSteps } = useCycleElement();
  const { addTimelineSteps } = useTimelineElement();
  const { addListElement, addImage } = useListElement();
  const { addTableRow, addTableColumn, removeTableColumn, removeTableRow } = useTableElement();

  let addIcon = new Image();
  addIcon.src = AddPlus;
  let addImageIcon = new Image();
  addImageIcon.src = imageIcon;
  let minusIcon = new Image();
  minusIcon.src = MinusIcon;

  const handleAddCustomIcon = (canvas: fabric.Canvas) => {
    // Event handler for when objects are selected
    canvas.on('selection:created', event => {
      // Adjust control visibility based on the type of selected object
      adjustControlsVisibility(canvas);
    });

    // Request canvas re-render
    canvas?.requestRenderAll();
  };

  // Function to adjust control visibility based on the selected object and object counts
  const adjustControlsVisibility = (canvas: fabric.Canvas): void => {
    // Get the selected object, if any
    const selectedObject = canvas.getActiveObject();

    let processStepsTotal = countObjects(canvas, 'ProcessBox');
    let timelineLevels = countObjects(canvas, 'timeLineCircle');
    let cycleSteps = countObjects(canvas, 'Cycle_Circle');
    let pLevels = countObjects(canvas, 'Pyramid_LEVEL');
    let fLevels = countObjects(canvas, 'Funnel_Level');

    // Custom controls setup for different elements
    setupCustomControls(canvas);
    const objectName = selectedObject?.name?.split('_');
    // Adjust controls based on the type of the selected object
  if(objectName && selectedObject){
    if (objectName[0] === PYRAMID && pLevels < 6) {
      selectedObject.setControlVisible('addPyramid', true);
    } else {
      selectedObject?.setControlVisible('addPyramid', false);
    }

    if (objectName[0] === PROCESS && processStepsTotal < 6) {
      selectedObject.setControlVisible('addProcess', true);
    } else {
      selectedObject?.setControlVisible('addProcess', false);
    }

    if (objectName[0] === TIMELINE && timelineLevels < 6) {
      selectedObject.setControlVisible('addTimeline', true);
    } else {
      selectedObject?.setControlVisible('addTimeline', false);
    }

    if (objectName[0] === FUNNEL && fLevels < 6) {
      selectedObject.setControlVisible('addFunnel', true);
    } else {
      selectedObject?.setControlVisible('addFunnel', false);
    }

    if (objectName[0] === CYCLE && cycleSteps < 6) {
      selectedObject.setControlVisible('addCycle', true);
    } else {
      selectedObject?.setControlVisible('addCycle', false);
    }

    if (objectName[0] === TABLE) {
      selectedObject.setControlVisible('addTableRow', true);
      selectedObject.setControlVisible('addTableColumn', true);
      selectedObject.setControlVisible('removeTableRow', true);
      selectedObject.setControlVisible('removeTableColumn', true);
    } else {
      selectedObject?.setControlVisible('addTableRow', false);
      selectedObject?.setControlVisible('addTableColumn', false);
      selectedObject.setControlVisible('removeTableRow', false);
      selectedObject.setControlVisible('removeTableColumn', false);
    }

    if (selectedObject?.name === 'List_Container') {
      selectedObject.setControlVisible('addList', true);
      selectedObject.setControlVisible('addImage', true);
    } else {
      selectedObject?.setControlVisible('addImage', false);
      selectedObject?.setControlVisible('addList', false);
    }

  }
  };

  const countObjects = (canvas: fabric.Canvas, objectType: string): number => {
    let count = 0;
    canvas.forEachObject(obj => {
      if (obj.name === objectType) {
        count++;
      }
    });
    return count;
  };

  // Function to set up custom controls for different elements
  const setupCustomControls = (canvas: fabric.Canvas): void => {
    // Custom control setup for Pyramid, Process Container, Timeline Container, etc.

    // Pyramid control setup
    fabric.Object.prototype.controls.addPyramid = new fabric.Control({
      x: -0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: 'pointer',
      render: (ctx, left, top, fabricObject) => {
        renderCustomIcon(ctx, left, top, fabricObject, addIcon);
      },
      mouseUpHandler: addPyramidLevels,
      visible: false,
    });

    // Process control setup
    fabric.Object.prototype.controls.addProcess = new fabric.Control({
      x: -0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: 'pointer',
      render: (ctx, left, top, fabricObject) => {
        renderCustomIcon(ctx, left, top, fabricObject, addIcon);
      },
      mouseUpHandler: addProcessBox,
      visible: false,
    });

    // Timeline control setup
    fabric.Object.prototype.controls.addTimeline = new fabric.Control({
      x: -0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: 'pointer',
      render: (ctx, left, top, fabricObject) => {
        renderCustomIcon(ctx, left, top, fabricObject, addIcon);
      },
      mouseUpHandler: addTimelineElement,
      visible: false,
    });

    // Funnel control setup
    fabric.Object.prototype.controls.addFunnel = new fabric.Control({
      x: -0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: 'pointer',
      render: (ctx, left, top, fabricObject) => {
        renderCustomIcon(ctx, left, top, fabricObject, addIcon);
      },
      mouseUpHandler: addFunnelLevel,
      visible: false,
    });

    // Cycle control setup
    fabric.Object.prototype.controls.addCycle = new fabric.Control({
      x: -0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: 'pointer',
      render: (ctx, left, top, fabricObject) => {
        renderCustomIcon(ctx, left, top, fabricObject, addIcon);
      },
      mouseUpHandler: addCycleBtn,
      visible: false,
    });

    // List control setup
    fabric.Object.prototype.controls.addList = new fabric.Control({
      x: -0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: 'pointer',
      render: (ctx, left, top, fabricObject) => {
        renderCustomIcon(ctx, left, top, fabricObject, addIcon);
      },
      mouseUpHandler: addList,
      visible: false,
    });

    // List Image control setup
    fabric.Object.prototype.controls.addImage = new fabric.Control({
      x: 0.3,
      y: -0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: 'pointer',
      render: (ctx, left, top, fabricObject) => {
        renderCustomIcon(ctx, left, top, fabricObject, addImageIcon);
      },
      mouseUpHandler: addListImage,
      visible: false,
    });
    // Table Add Row control setup
    fabric.Object.prototype.controls.addTableRow = new fabric.Control({
      x: -0.55,
      y: 0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: 'pointer',
      render: (ctx, left, top, fabricObject) => {
        renderCustomIcon(ctx, left, top, fabricObject, addIcon);
      },
      mouseUpHandler: addTableRowElement,
      visible: false,
    });
    // Table Add Column control setup
    fabric.Object.prototype.controls.addTableColumn = new fabric.Control({
      x: 0.43,
      y: -0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: 'pointer',
      render: (ctx, left, top, fabricObject) => {
        renderCustomIcon(ctx, left, top, fabricObject, addIcon);
      },
      mouseUpHandler: addTableColumnElement,
      visible: false,
    });
    // Table Remove Row control setup
    fabric.Object.prototype.controls.removeTableRow = new fabric.Control({
      x: -0.55,
      y: 0.4,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: 'pointer',
      render: (ctx, left, top, fabricObject) => {
        renderCustomIcon(ctx, left, top, fabricObject, minusIcon);
      },
      mouseUpHandler: removeTableRowElement,
      visible: false,
    });
    // Table Remove Column control setup
    fabric.Object.prototype.controls.removeTableColumn = new fabric.Control({
      x: 0.39,
      y: -0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: 'pointer',
      render: (ctx, left, top, fabricObject) => {
        renderCustomIcon(ctx, left, top, fabricObject, minusIcon);
      },
      mouseUpHandler: removeTableColumnElement,
      visible: false,
    });

    function addProcessBox() {
      addProcessSteps(canvas);
      return true;
    };
    function addPyramidLevels() {
      addPyramidLevel(canvas);
      return true;
    };
    function addFunnelLevel() {
      addFunnelLevels(canvas);
      return true;
    };
    function addCycleBtn() {
      addCycleSteps(canvas);
      return true;
    };
    function addTimelineElement() {
      addTimelineSteps(canvas);
      return true;
    };
    function addTableRowElement() {
      addTableRow(canvas);
      return true;
    };
    function addTableColumnElement() {
      addTableColumn(canvas);
      return true;
    };
    function removeTableRowElement() {
      removeTableRow(canvas);
      return true;
    };
    function removeTableColumnElement() {
      removeTableColumn(canvas);
      return true;
    };
    function addList() {
      let activeElement = canvas.getActiveObject();
      addListElement(
        canvas,
        activeElement?.getScaledWidth()! + 70,
        activeElement?.top!
      );
      return true;
    };
    function addListImage() {
      let selectedElement = canvas.getActiveObject();
      addImage(canvas, selectedElement!);
      selectedElement &&
        (selectedElement as fabric.Group).remove(
          (selectedElement as fabric.Group)._objects[1]
        );
      (selectedElement as fabric.Group).setCoords();
      canvas.renderAll();
      return true;
    };
  };

  const renderCustomIcon = (
    ctx: CanvasRenderingContext2D,
    left: number,
    top: number,
    fabricObject: fabric.Object,
    icon: HTMLImageElement
  ): void => {
    const size = 24;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle || 0));
    ctx.drawImage(icon, -size / 2, -size / 2, size, size);
    ctx.restore();
  };

  return { handleAddCustomIcon };
};
