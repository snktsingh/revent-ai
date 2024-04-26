import {
  PROCESS,
  PROCESS_ARROW,
  PROCESS_BOX,
  PROCESS_TEXT,
} from '@/constants/elementNames';
import { customStyles, theme } from '@/constants/theme';
import { updateProcessId } from '@/redux/reducers/fabricElements';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import AutoResizingTextbox from '@/utils/fabric-utils/AutoResizingTextbox';
import { fabric } from 'fabric';
export const useProcessElement = () => {
  const dispatch = useAppDispatch();
  const { processId } = useAppSelector(state => state.elementsIds);
  const addProcessSteps = (canvas: fabric.Canvas) => {
    const activeProcess = canvas.getActiveObject();
    const currentID = activeProcess?.name?.split('_')[1];
    let lastRect: any;
    let mainContainer: any;
    let rectCount = 0;

    canvas.forEachObject(obj => {
      if (obj.name === `${PROCESS_BOX}_${currentID}`) {
        lastRect = obj;
        rectCount++;
      }
      if (obj.name == `${PROCESS}_${currentID}`) {
        mainContainer = obj;
      }
    });

    

    const ArrowPoints = [
      { x: 100, y: 100 },
      { x: 125, y: 100 },
      { x: 125, y: 87.5 },
      { x: 150, y: 112.5 },
      { x: 125, y: 137.5 },
      { x: 125, y: 125 },
      { x: 100, y: 125 },
    ];

    const Arrow = new fabric.Polygon(ArrowPoints, {
      fill: customStyles.elementColors.cloudyBlue,
      left: lastRect.left + 205,
      top: lastRect.top + 30,
      angle: 0,
      name: `${PROCESS_ARROW}_${currentID}`,
      width: 20,
    });

    let rect = new fabric.Rect({
      left: Arrow.left! + 80,
      top: lastRect.top,
      width: 170,
      height: 130,
      fill: customStyles.elementColors.duskyBlue,
      rx: 10,
      ry: 10,
      name: `${PROCESS_BOX}_${currentID}`,
      hasControls :false,
        lockMovementX : true,
        lockMovementY:true
    });

    let text = new AutoResizingTextbox('Add Text', {
      fontSize: 15,
      left: rect.left! + 5,
      top: rect.top! + 5,
      fill: theme.colorSchemes.light.palette.common.white,
      width: 110,
      height: 100,
      name: `${PROCESS_TEXT}_${currentID}`,
      fixedWidth: 200,
      fixedHeight: 100,
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
      hasBorders: false
    });

    if(rectCount === 3) {
       rect.left = mainContainer.left!;
       rect.top = mainContainer.top! + 180;
       text.left = rect.left! + 5;
       text.top = rect.top! + 5
    }

    canvas.forEachObject(obj => {
      if (obj.name == `${PROCESS}_${currentID}`) {
        obj.set({
          width: rectCount < 3 ? obj.width! + 245 : obj.width,
          height: rectCount === 3 ? 325 : obj.height
        });
      }
    }); 

    canvas.add(rect);
    rectCount !== 3 && canvas.add(Arrow);
    canvas.add(text);
    canvas.discardActiveObject()
    canvas.renderAll();
  };
  // new process

  function addProcess(canvas: fabric.Canvas | null) {
    function addRectangle(
      left: number,
      top: number,
      width: number,
      height: number
    ) {
      let rect = new fabric.Rect({
        left: left,
        top: top,
        width,
        height,
        fill: customStyles.elementColors.duskyBlue,
        rx: 10,
        ry: 10,
        name: `${PROCESS_BOX}_${processId}`,
      });
      return canvas?.add(rect);
    }
    function addText(left: number, top: number) {
      const text = new AutoResizingTextbox('Add Text', {
        fontSize: 15,
        left,
        top,
        fill: theme.colorSchemes.light.palette.common.white,
        width: 110,
        height: 100,
        name: `${PROCESS_TEXT}_${processId}`,
        fixedHeight: 100,
        fixedWidth: 200,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        hasBorders: false,
      });
      return canvas?.add(text);
    }
    const addArrow = (left: number, top: number, angle: number) => {
      const ArrowPoints = [
        { x: 100, y: 100 },
        { x: 125, y: 100 },
        { x: 125, y: 87.5 },
        { x: 150, y: 112.5 },
        { x: 125, y: 137.5 },
        { x: 125, y: 125 },
        { x: 100, y: 125 },
      ];

      const Arrow = new fabric.Polygon(ArrowPoints, {
        fill: customStyles.elementColors.cloudyBlue,
        left,
        top,
        angle,
        name: `${PROCESS_ARROW}_${processId}`,
        width: 20,
        hasControls :false,
        lockMovementX : true,
        lockMovementY:true
      });

      return Arrow;
    };

    const mainProcessContainer = new fabric.Rect({
      left: 20,
      top: 50,
      width: 510,
      height: 150,
      fill: 'transparent',
      strokeWidth: 1,
      stroke: 'transparent',
      name: `${PROCESS}_${processId}`,
    });

    canvas?.add(mainProcessContainer);
    canvas?.setActiveObject(mainProcessContainer);

    canvas?.add(addArrow(225, mainProcessContainer.top! + 55, 0));
    addRectangle(
      mainProcessContainer.left!,
      mainProcessContainer.top! + 20,
      170,
      130
    );
    addRectangle(305, mainProcessContainer.top! + 20, 170, 130);
    addText(mainProcessContainer.left! + 10, mainProcessContainer.top! + 25);
    addText(315, mainProcessContainer.top! + 25);
    canvas?.renderAll();
    dispatch(updateProcessId());
  }

  return { addProcess, addProcessSteps };
};
