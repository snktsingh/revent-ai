import { QuoteImages, clientListImages, deleteClientListImage, deleteImage, deleteQuoteImage, deleteTeamListImage } from '@/data/data';
import { fabric } from "fabric";
import React, { useState } from 'react';
import { useDelAndCopy } from '@/pages/canvas/canvasBody/elements/deleteAndCopyElements';
import {
  BULLET_POINTS,
  CLIENT_LIST_MAIN,
  CYCLE,
  CYCLE_TEXT,
  FUNNEL,
  FUNNEL_BASE,
  FUNNEL_LEVEL,
  FUNNEL_TEXT,
  HUB_AND_SPOKE,
  HUB_AND_SPOKE_BOX,
  IMAGE,
  LIST_IMG,
  LIST_MAIN,
  PARAGRAPH,
  PROCESS,
  PROCESS_TEXT,
  PYRAMID,
  PYRAMID_LEVEL,
  PYRAMID_TEXT,
  QUOTE,
  QUOTE_IMG,
  STATISTICS,
  STATISTICS_BOX,
  TABLE,
  TIMELINE,
  TIMELINE_TEXT,
} from '@/constants/elementNames';
import {
  useCycleElement,
  useFunnelElement,
  useImageElement,
  useListElement,
  useProcessElement,
  usePyramidElement,
  useQuoteElement,
  useTableElement,
  useTimelineElement,
} from '@/pages/canvas/canvasBody/elements/elementExports';
import { updateCheckboxForAI } from '@/redux/reducers/apiData';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  updateClientListId,
  updateListId,
} from '@/redux/reducers/fabricElements';
import { useClientListElement } from '@/pages/canvas/canvasBody/elements/clientListElement';
import { useHubAndSpoke } from '@/pages/canvas/canvasBody/elements/hubAndSpoke';
import { useStatisticsElement } from '@/pages/canvas/canvasBody/elements/statisticElement';

export const useEditBar = () => {
  const [plusIcon, setPlusIcon] = useState<boolean>(false);
  const [minusIcon, setMinusIcon] = useState<boolean>(false);
  const [tableIcons, setTableIcon] = useState<boolean>(false);
  const [aiCheckbox, setAICheckbox] = useState<boolean>(false);
  const [imgChangeICon, setImgChangeICon] = useState<boolean>(false);
  const [levelIcons, setLevelICon] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { addProcessSteps } = useProcessElement();
  const { addPyramidLevel } = usePyramidElement();
  const { addFunnelLevels } = useFunnelElement();
  const { addCycleSteps } = useCycleElement();
  const { addTimelineSteps } = useTimelineElement();
  const { addListElement, addImage } = useListElement();
  const { addClientListElement, addClientImage } = useClientListElement();
  const { addQuoteImage } = useQuoteElement();
  const { imageUploader } = useImageElement();
  const { addHubAndSpokeLevel } = useHubAndSpoke();
  const { addStatisticsLevels } = useStatisticsElement();
  const { addTableRow, addTableColumn, removeTableColumn, removeTableRow } =
    useTableElement();
  const { deleteObject, handleCopyClick } = useDelAndCopy();
  const { canvasJS } = useAppSelector(state => state.canvas);

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
    let listCount = countObjects(canvas, LIST_MAIN);
    let clientListCount = countObjects(canvas, CLIENT_LIST_MAIN);
    let hubAndSpokeCount = countObjects(canvas, HUB_AND_SPOKE_BOX);
    let statisticElCount = countObjects(canvas, STATISTICS_BOX);

    let showPlusIcon = false;
    let showTableIcons = false;
    let showAICheckbox = false;
    let showChangeImgIcon = false;
    let showDelForLevelIcon = false;
    let showMinusIcon = false;

    if (objectName && selectedObject) {
      if (
        (objectName[0] === PYRAMID && pLevels < 6) ||
        (objectName[0] === PROCESS && processStepsTotal < 6) ||
        (objectName[0] === TIMELINE && timelineLevels < 8) ||
        (objectName[0] === FUNNEL && fLevels < 6) ||
        (objectName[0] === CYCLE && cycleSteps < 6) ||
        (objectName[0] === LIST_MAIN && listCount < 8) ||
        (objectName[0] === CLIENT_LIST_MAIN && clientListCount < 11) ||
        (objectName[0] === HUB_AND_SPOKE && hubAndSpokeCount < 6) ||
        (objectName[0] === STATISTICS && statisticElCount < 9)
      ) {
        showPlusIcon = true;
        showDelForLevelIcon = false;
      }

      //Minus Icon
      if (
        (objectName[0] === PYRAMID && pLevels > 2) ||
        (objectName[0] === PROCESS && processStepsTotal > 2) ||
        (objectName[0] === TIMELINE && timelineLevels > 2) ||
        (objectName[0] === FUNNEL && fLevels > 2) ||
        (objectName[0] === CYCLE && cycleSteps > 3) ||
        (objectName[0] === HUB_AND_SPOKE && hubAndSpokeCount > 3) ||
        (objectName[0] === STATISTICS && statisticElCount > 1)
      ) {
          showMinusIcon = true;
      }
    }
    if (
      (objectName && objectName[0] === PYRAMID && pLevels >= 6) ||
      (objectName && objectName[0] === PROCESS && processStepsTotal >= 6) ||
      (objectName && objectName[0] === TIMELINE && timelineLevels >= 8) ||
      (objectName && objectName[0] === FUNNEL && fLevels >= 6) ||
      (objectName && objectName[0] === CYCLE && cycleSteps >= 6) ||
      (objectName && objectName[0] === LIST_MAIN && listCount >= 8) ||
      (objectName &&
        objectName[0] === CLIENT_LIST_MAIN &&
        clientListCount >= 10) ||
      (objectName &&
        objectName[0] === HUB_AND_SPOKE &&
        hubAndSpokeCount >= 8) ||
      (objectName && objectName[0] === STATISTICS && statisticElCount > 9)
    ) {
      showPlusIcon = false;
      showDelForLevelIcon = false;
    }

    if (objectName && objectName[0] === TABLE) {
      showPlusIcon = true;
      showTableIcons = true;
      showDelForLevelIcon = false;
    }

    if (
      objectName &&
      (objectName[0] === BULLET_POINTS || objectName[0] === PARAGRAPH)
    ) {
      showAICheckbox = true;
      showDelForLevelIcon = false;
    }

    if (
      objectName &&
      (selectedObject?.name?.startsWith(QUOTE_IMG) ||
        objectName[0] === LIST_MAIN ||
        selectedObject?.name?.startsWith(IMAGE))
    ) {
      showChangeImgIcon = true;
      showDelForLevelIcon = false;
    }

    if (
      objectName &&
      (selectedObject?.name?.startsWith(PYRAMID_LEVEL) ||
        selectedObject?.name?.startsWith(FUNNEL_LEVEL) ||
        selectedObject?.name?.startsWith(FUNNEL_BASE) ||
        objectName[0] === LIST_IMG)
    ) {
      // showPlusIcon = false;
      showDelForLevelIcon = false;
    }

    setPlusIcon(showPlusIcon);
    setMinusIcon(showMinusIcon);
    setTableIcon(showTableIcons);
    setAICheckbox(showAICheckbox);
    setImgChangeICon(showChangeImgIcon);
    setLevelICon(showDelForLevelIcon);
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

    elName && addElement(canvas, elName[0]);
  };
  const addElement = (canvas: fabric.Canvas | null, type: string) => {
    const activeElement = canvas?.getActiveObject();
    if (!activeElement) return false;
    const lastListElement = canvas
      ?.getObjects()
      .reverse()
      .find(obj => obj.name?.startsWith(LIST_MAIN));
    const lastClientListElement = canvas
      ?.getObjects()
      .reverse()
      .find(obj => obj.name?.startsWith(CLIENT_LIST_MAIN));
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
          addList(canvas, lastListElement);
          break;
        case CLIENT_LIST_MAIN:
          addClientList(canvas, lastClientListElement);
          break;
        case HUB_AND_SPOKE:
          addHubAndSpokeLevel(canvas);
        case STATISTICS:
          addStatisticsLevels(canvas);
          break;
        default:
          break;
      }
    }
  };

  function addList(
    canvas: fabric.Canvas,
    lastElement: fabric.Object | undefined
  ) {
    if (lastElement && lastElement.left && lastElement.top) {
      if (lastElement.left > 530 && lastElement.top < 240) {
        const newX = 28;
        const newY = 275;

        addListElement(canvas, newX, newY!);
        return;
      } else if (lastElement.left > 530 && lastElement.top > 200) {
        console.log('maximum limit added');
      } else {
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
  }

  function handleQuoteImage(canvas: fabric.Canvas) {
    let selectedElement = canvas.getActiveObject();
    addQuoteImage(canvas, selectedElement!);
    selectedElement &&
      (selectedElement as fabric.Group).remove(
        (selectedElement as fabric.Group)._objects[1]
      );
    (selectedElement as fabric.Group).setCoords();
    canvas.renderAll();
  }

  const handleAICheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateCheckboxForAI(e.target.checked));
  };
  //client list
  function addClientList(
    canvas: fabric.Canvas,
    lastElement: fabric.Object | undefined
  ) {
    if (lastElement && lastElement.left && lastElement.top) {
      if (lastElement.left > 640 && lastElement.top < 240) {
        const newX = 28;
        const newY = 250;

        addClientListElement(canvas, newX, newY!);
        return;
      } else if (lastElement.left > 640 && lastElement.top > 200) {
        console.log('maximum limit added');
      } else {
        const newX = lastElement.left + lastElement.getScaledWidth() + 15;
        const newY = lastElement.top;

        addClientListElement(canvas, newX, newY);
      }
    } else {
      addClientListElement(canvas, 0, 0);
    }
  }

  function addClientListImage(canvas: fabric.Canvas) {
    let selectedElement = canvas.getActiveObject();
    addClientImage(canvas, selectedElement!);
    selectedElement &&
      (selectedElement as fabric.Group).remove(
        (selectedElement as fabric.Group)._objects[1]
      );
    (selectedElement as fabric.Group).setCoords();
    canvas.renderAll();
  }

  const handleChangeImageElement = (canvas: fabric.Canvas) => {
    const activeElement = canvas.getActiveObject();
    if (activeElement && activeElement.type === 'image') {
      imageUploader(canvas, activeElement);
    }
  };


  const updateDeletedObject = (canvas : fabric.Canvas) => {
    const activeObject = canvas?.getActiveObject();
    const [_, id] = (activeObject?.name?.split('_') ?? []);
    if(activeObject?.name?.startsWith(`${LIST_MAIN}_`)) {
      deleteTeamListImage(canvasJS.id, +id);
    } 
    else if(activeObject?.name?.startsWith(`${IMAGE}_`)) {
      deleteImage(canvasJS.id, +id);
    }
    else if(activeObject?.name?.startsWith(`${QUOTE_IMG}_`)) {
      deleteQuoteImage(canvasJS.id, +id);
    }
    else if(activeObject?.name?.startsWith(`${CLIENT_LIST_MAIN}_`)) {
      deleteClientListImage(canvasJS.id, +id);
    }
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
    handleQuoteImage,
    levelIcons,
    handleChangeImageElement,
    addClientListImage,
    minusIcon,
    updateDeletedObject
  };
};
