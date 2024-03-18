import { useState } from 'react';
import { useDelAndCopy } from '@/pages/canvas/canvasBody/elements/deleteAndCopyElements';
import {
  CYCLE,
  CYCLE_TEXT,
  FUNNEL,
  FUNNEL_TEXT,
  PROCESS,
  PROCESS_TEXT,
  PYRAMID,
  PYRAMID_TEXT,
  TABLE,
  TIMELINE,
  TIMELINE_TEXT,
} from '@/constants/elementNames';
import {
  useCycleElement,
  useFunnelElement,
  useListElement,
  useProcessElement,
  usePyramidElement,
  useTableElement,
  useTimelineElement,
} from '@/pages/canvas/canvasBody/elements/elementExports';

export const useEditBar = () => {
  const [plusIcon, setPlusIcon] = useState<boolean>(false);
  const [tableIcons, setTableIcon] = useState<boolean>(false);

  const { addProcessSteps } = useProcessElement();
  const { addPyramidLevel } = usePyramidElement();
  const { addFunnelLevels } = useFunnelElement();
  const { addCycleSteps } = useCycleElement();
  const { addTimelineSteps } = useTimelineElement();
  const { addListElement, addImage } = useListElement();
  const { addTableRow, addTableColumn, removeTableColumn, removeTableRow } =
    useTableElement();

  const { deleteObject, handleCopyClick } = useDelAndCopy();

  const adjustControlsVisibility = (canvas: fabric.Canvas): void => {
    // Get the selected object, if any
    const selectedObject = canvas.getActiveObject();

    // Custom controls setup for different elements
    const objectName = selectedObject?.name?.split('_');
    const currentElementId = objectName && objectName[1];

    let processStepsTotal = countObjects(
      canvas,
      `${PROCESS_TEXT}_${currentElementId}`
    );
    let timelineLevels = countObjects(
      canvas,
      `${TIMELINE_TEXT}_${currentElementId}`
    );
    let cycleSteps = countObjects(canvas, `${CYCLE_TEXT}_${currentElementId}`);
    let pLevels = countObjects(canvas, `${PYRAMID_TEXT}_${currentElementId}`);
    let fLevels = countObjects(canvas, `${FUNNEL_TEXT}_${currentElementId}`);

    let showPlusIcon = false;
    let showTableIcons = false;

    if (objectName && selectedObject) {
      if (
        (objectName[0] === PYRAMID && pLevels < 6) ||
        (objectName[0] === PROCESS && processStepsTotal < 6) ||
        (objectName[0] === TIMELINE && timelineLevels < 6) ||
        (objectName[0] === FUNNEL && fLevels < 6) ||
        (objectName[0] === CYCLE && cycleSteps < 6) ||
        selectedObject.name === 'LIST_ELEMENT'
      ) {
        showPlusIcon = true; // Set the visibility state to true if any condition is met
      }
    }

    // Check if the number of levels exceeds a certain limit to hide the plus icon
    if (
      (objectName && objectName[0] === PYRAMID && pLevels >= 6) ||
      (objectName && objectName[0] === PROCESS && processStepsTotal >= 6) ||
      (objectName && objectName[0] === TIMELINE && timelineLevels >= 6) ||
      (objectName && objectName[0] === FUNNEL && fLevels >= 6) ||
      (objectName && objectName[0] === CYCLE && cycleSteps >= 6)
    ) {
      showPlusIcon = false; // Hide the plus icon if the limit is reached
    }

    if (objectName && objectName[0] === TABLE) {
      showPlusIcon = true;
      showTableIcons = true;
    }

    setPlusIcon(showPlusIcon); // Update the plusIcon state based on the visibility state
    setTableIcon(showTableIcons); // Update the tableIcons state based on the visibility state
  };

  const countObjects = (canvas: fabric.Canvas, objectType: string): number => {
    let count = 0;
    canvas.forEachObject(obj => {
      if (obj.name?.startsWith(objectType)) {
        count++;
      }
    });
    return count;
  };

  const checkElementForAddLevel = (canvas: fabric.Canvas) => {
    const activeElement = canvas?.getActiveObject();
    const elName = activeElement?.name?.split('_');
    console.log(elName);

    elName && addElement(canvas, elName[0]);
  };
  const addElement = (canvas: fabric.Canvas | null, type: string) => {
    const activeElement = canvas?.getActiveObject();
    if (!activeElement) return false;
    const lastListElement = canvas?.getObjects().find(obj => obj.name === 'LIST_ELEMENT');
    // Check the type of the active element
    if (activeElement.name?.startsWith(type) && canvas) {
      // Call the corresponding function based on the element type
      switch (type) {
        case 'PYRAMID':
          addPyramidLevel(canvas);
          break;
        case 'FUNNEL':
          addFunnelLevels(canvas);
          break;
        case 'PROCESS':
          addProcessSteps(canvas);
          break;
        case 'CYCLE':
          addCycleSteps(canvas);
          break;
        case 'TIMELINE':
          addTimelineSteps(canvas);
          break;
        case 'TABLE_ROW':
          addTableRow(canvas);
          break;
        case 'TABLE_COLUMN':
          addTableColumn(canvas);
          break;
        case 'LIST':
          addList(canvas,lastListElement);
          break;
        default:
          break;
      }
    }
  };

  function addList(canvas: fabric.Canvas, lastElement : fabric.Object | undefined) {
    console.log({lastElement})
    if (lastElement) {
      const newX = lastElement.left! + lastElement.getScaledWidth() + 70;
      const newY = lastElement.top;

      addListElement(canvas, newX, newY!);
    } else {
      addListElement(canvas, 0, 0); 
    }
  }
  function addListImage(canvas: fabric.Canvas) {
    let selectedElement = canvas.getActiveObject();
    addImage(canvas, selectedElement!);
    selectedElement &&
      (selectedElement as fabric.Group).remove(
        (selectedElement as fabric.Group)._objects[1]
      );
    (selectedElement as fabric.Group).setCoords();
    canvas.renderAll();
    return true;
  }

  return {
    adjustControlsVisibility,
    handleCopyClick,
    deleteObject,
    plusIcon,
    checkElementForAddLevel,
    tableIcons,
  };
};
