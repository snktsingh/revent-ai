import React, { useState } from 'react';
import { useDelAndCopy } from '@/pages/canvas/canvasBody/elements/deleteAndCopyElements';
import {
  BULLET_POINTS,
  CYCLE,
  CYCLE_TEXT,
  FUNNEL,
  FUNNEL_TEXT,
  LIST_IMG,
  LIST_MAIN,
  PARAGRAPH,
  PROCESS,
  PROCESS_TEXT,
  PYRAMID,
  PYRAMID_TEXT,
  QUOTE,
  QUOTE_IMG,
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
  useQuoteElement,
  useTableElement,
  useTimelineElement,
} from '@/pages/canvas/canvasBody/elements/elementExports';
import { updateCheckboxForAI } from '@/redux/reducers/apiData';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { updateListId } from '@/redux/reducers/fabricElements';

export const useEditBar = () => {
  const [plusIcon, setPlusIcon] = useState<boolean>(false);
  const [tableIcons, setTableIcon] = useState<boolean>(false);
  const [aiCheckbox, setAICheckbox] = useState<boolean>(false);
  const [imgChangeICon, setImgChangeICon] = useState<boolean>(false);
const dispatch = useAppDispatch();
  const { addProcessSteps } = useProcessElement();
  const { addPyramidLevel } = usePyramidElement();
  const { addFunnelLevels } = useFunnelElement();
  const { addCycleSteps } = useCycleElement();
  const { addTimelineSteps } = useTimelineElement();
  const { addListElement, addImage } = useListElement();
  const { addQuoteImage } = useQuoteElement();
  const { addTableRow, addTableColumn, removeTableColumn, removeTableRow } =
    useTableElement();
  const { listID } = useAppSelector( state => state.elementsIds )
  const { deleteObject, handleCopyClick } = useDelAndCopy();

  const adjustControlsVisibility = (canvas: fabric.Canvas): void => {
    const selectedObject = canvas.getActiveObject();

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
    let showAICheckbox = false;
    let showChangeImgIcon = false;

    if (objectName && selectedObject) {
      if (
        (objectName[0] === PYRAMID && pLevels < 6) ||
        (objectName[0] === PROCESS && processStepsTotal < 6) ||
        (objectName[0] === TIMELINE && timelineLevels < 6) ||
        (objectName[0] === FUNNEL && fLevels < 6) ||
        (objectName[0] === CYCLE && cycleSteps < 6) ||
        objectName[0] === LIST_MAIN
      ) {
        showPlusIcon = true; 
      }
    }

    if (
      (objectName && objectName[0] === PYRAMID && pLevels >= 6) ||
      (objectName && objectName[0] === PROCESS && processStepsTotal >= 6) ||
      (objectName && objectName[0] === TIMELINE && timelineLevels >= 6) ||
      (objectName && objectName[0] === FUNNEL && fLevels >= 6) ||
      (objectName && objectName[0] === CYCLE && cycleSteps >= 6)
    ) {
      showPlusIcon = false; 
    }

    if (objectName && objectName[0] === TABLE) {
      showPlusIcon = true;
      showTableIcons = true;
    }

    if(objectName && (objectName[0] === BULLET_POINTS || objectName[0] === PARAGRAPH)){
      showAICheckbox = true;
    }

    if(objectName && (selectedObject?.name?.startsWith(QUOTE_IMG) || objectName[0] === LIST_IMG)){
      showChangeImgIcon = true;
    }

    setPlusIcon(showPlusIcon); 
    setTableIcon(showTableIcons); 
    setAICheckbox(showAICheckbox);
    setImgChangeICon(showChangeImgIcon);
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
    const lastListElement = canvas?.getObjects().reverse().find(obj => obj.name?.startsWith(LIST_MAIN));
    if (activeElement.name?.startsWith(type) && canvas) {
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
        case LIST_MAIN:
          addList(canvas,lastListElement);
          dispatch(updateListId());
          break;
        default:
          break;
      }
    }
  };

  function addList(canvas: fabric.Canvas, lastElement : fabric.Object | undefined) {
    if (lastElement && lastElement.left && lastElement.top) {
      if(lastElement.left > 600 && lastElement.top < 240){
        const newX = 33;
        const newY = 245;
  
        addListElement(canvas, newX, newY!);
        return;
      }else if(lastElement.left > 600 && lastElement.top > 200){
          console.log('maximum limit added')
      }else{
        const newX = lastElement.left + lastElement.getScaledWidth() + 50;
        const newY = lastElement.top;
  
        addListElement(canvas, newX, newY);
      }
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
  };

  function handleQuoteImage(canvas: fabric.Canvas) {
    let selectedElement = canvas.getActiveObject();
    addQuoteImage(canvas, selectedElement!);
    selectedElement &&
      (selectedElement as fabric.Group).remove(
        (selectedElement as fabric.Group)._objects[1]
      );
    (selectedElement as fabric.Group).setCoords();
    canvas.renderAll();
  };

  const handleAICheckbox = (e : React.ChangeEvent<HTMLInputElement>) => {
      dispatch(updateCheckboxForAI(e.target.checked))
  };

  return {
    adjustControlsVisibility,
    handleCopyClick,
    deleteObject,
    plusIcon,
    checkElementForAddLevel,
    tableIcons,
    handleAICheckbox,
    aiCheckbox,
    imgChangeICon,
    addListImage,
    handleQuoteImage
  };
};
