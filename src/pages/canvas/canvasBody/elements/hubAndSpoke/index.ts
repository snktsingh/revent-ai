import {
  HUB_AND_SPOKE,
  HUB_AND_SPOKE_BOX,
  HUB_AND_SPOKE_BOX_HEADING,
  HUB_AND_SPOKE_BOX_TEXT,
  HUB_AND_SPOKE_CIRCLE,
  HUB_AND_SPOKE_MAIN,
  HUB_AND_SPOKE_MAIN_TEXT,
  HUB_AND_SPOKE_TEXT_BOX,
} from '@/constants/elementNames';
import { IExtendedRectOptions } from '@/interface/fabricTypes';
import { updateHubAndSpokeId } from '@/redux/reducers/fabricElements';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import AutoResizingTextbox from '@/utils/fabric-utils/AutoResizingTextbox';
import { fabric } from 'fabric';

export const useHubAndSpoke = () => {
  const dispatch = useAppDispatch();
  const { hubAndSpokeId } = useAppSelector(state => state.elementsIds);
  const { canvasJS } = useAppSelector(state => state.canvas);

  const addTitleRectBox = (left: number, top: number, level: number, id : number) => {
    const rect = new fabric.Rect({
      left: left,
      top: top,
      width: 250,
      height: 30,
      name: `${HUB_AND_SPOKE_BOX}_${id}`,
      level: `${HUB_AND_SPOKE_BOX}_${id}_${level}`,
      fill: '#406098',
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
      hasBorders: false,
      rx: 5,
      ry: 5,
    } as IExtendedRectOptions);
    return rect;
  };

  const addTextRectBox = (left: number, top: number, level: number, id : number) => {
    const rect = new fabric.Rect({
      left: left,
      top: top,
      width: 250,
      height: 90,
      name: `${HUB_AND_SPOKE_TEXT_BOX}_${id}`,
      level: `${HUB_AND_SPOKE_TEXT_BOX}_${id}_${level}`,
      fill: '#406098',
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
      hasBorders: false,
      rx: 5,
      ry: 5,
    } as IExtendedRectOptions);
    return rect;
  };



  const addCircle = (left: number, top: number, id : number) => {
    const circle = new fabric.Circle({
      radius: 60,
      left,
      top,
      fill: '#B0BCDE',
      height: 120,
      name: `${HUB_AND_SPOKE_CIRCLE}_${id}`,
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
      hasBorders: false,
    });
    return circle;
  };

  const addHeadingText = (left: number, top: number, id : number, level : number) => {
    const textBox = new AutoResizingTextbox('Add Title', {
      fontSize: 16,
      left: left,
      top: top,
      width: 248,
      name: `${HUB_AND_SPOKE_BOX_HEADING}_${id}`,
      level: `${HUB_AND_SPOKE_BOX_HEADING}_${id}_${level}`,
      fill: 'white',
      fixedWidth: 248,
      fixedHeight: 20,
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
      hasBorders: false,
      splitByGrapheme: true,
    });
    return textBox;
  };

  const addSubText = (left: number, top: number, id : number, level : number) => {
    const textBox = new AutoResizingTextbox('Add Text', {
      fontSize: 15,
      left: left,
      top: top,
      width: 250,
      name: `${HUB_AND_SPOKE_BOX_TEXT}_${id}`,
      level: `${HUB_AND_SPOKE_BOX_TEXT}_${id}_${level}`,
      fill: 'white',
      fixedWidth: 250,
      fixedHeight: 90,
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
      hasBorders: false,
      splitByGrapheme: true,
    });
    return textBox;
  };

  const addHubAndSpokeText = (left: number, top: number) => {
    const textBox = new AutoResizingTextbox('Add \nHeading', {
      fontSize: 25,
      left: left,
      top: top,
      width: 100,
      name: `${HUB_AND_SPOKE_MAIN_TEXT}_${hubAndSpokeId}`,
      fill: 'white',
      fixedWidth: 100,
      fixedHeight: 90,
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
      hasBorders: false,
      splitByGrapheme: true,
      textAlign: 'center',
    });
    return textBox;
  };

  //new Hub and Spoke
  const addNewHubAndSokeElement = (canvas: fabric.Canvas) => {
    const titleRectWidth = 250;
    const titleRectHeight = 30;
    const textRectWidth = 250;

    const mainContainer = new fabric.Rect({
      left: 23,
      top: 80,
      width: titleRectWidth * 3 + 80,
      height: 300,
      fill: 'transparent',
      strokeWidth: 1,
      stroke: 'transparent',
      name: `${HUB_AND_SPOKE}_${hubAndSpokeId}`,
    });

    canvas.add(mainContainer);
    const titleRect1 = addTitleRectBox(45, 100, 1, hubAndSpokeId);
    const rect1Heading = addHeadingText(titleRect1.left! + 2, titleRect1.top! + 2, hubAndSpokeId, 1);
    const titleRect2 = addTitleRectBox(titleRect1.left! + titleRectWidth + 20, 100, 2, hubAndSpokeId);
    const rect2Heading = addHeadingText(titleRect2.left! + 2, titleRect2.top! + 2, hubAndSpokeId, 2);
    const titleRect3 = addTitleRectBox(titleRect2.left! + titleRectWidth + 20, 100, 3, hubAndSpokeId);
    const rect3Heading = addHeadingText(titleRect3.left! + 2, titleRect3.top! + 2, hubAndSpokeId, 3);

    const circle = addCircle(titleRect1.left! + titleRectWidth + 80, 230, hubAndSpokeId);

    const textRect1 = addTextRectBox(titleRect1.left! , titleRect1.top! + titleRectHeight + 3, 1, hubAndSpokeId);
    const text1 = addSubText(textRect1.left! + 2, textRect1.top! + 2, hubAndSpokeId, 1);
    const textRect2 = addTextRectBox(titleRect2.left! , titleRect2.top! + titleRectHeight + 3, 2, hubAndSpokeId);
    const text2 = addSubText(textRect2.left! + 2, textRect2.top! + 2, hubAndSpokeId, 2);
    const textRect3 = addTextRectBox(titleRect3.left! , titleRect3.top! + titleRectHeight + 3, 3, hubAndSpokeId);
    const text3 = addSubText(textRect3.left! + 2, textRect3.top! + 2, hubAndSpokeId, 3);

    canvas.add(circle);
    canvas.add(titleRect1, textRect1);
    canvas.add(rect1Heading);
    canvas.add(text1);
    canvas.add(titleRect2, textRect2);
    canvas.add(rect2Heading);
    canvas.add(text2);
    canvas.add(titleRect3, textRect3);
    canvas.add(rect3Heading);
    canvas.add(text3);
    canvas.add(addHubAndSpokeText(circle.left! + 10, circle.top! + 20));
    dispatch(updateHubAndSpokeId());
    canvas.renderAll();
  };

  // add Hub and Spoke Levels
  const addHubAndSpokeLevel = (canvas: fabric.Canvas) => {
    let lastRect: fabric.Object | undefined;
    let level : number = 0;
    const activeObject =  canvas.getActiveObject();
    canvas.getObjects().forEach(obj => {
      if (obj.name?.startsWith(HUB_AND_SPOKE_TEXT_BOX)) {
        lastRect = obj;
        level++;
      }
    });

    if (lastRect && activeObject) {
      const [_, id] = lastRect?.name?.split('_') as string[];
      const titleRectWidth = 250;
      const titleRectHeight = 30;
      const textRectHeight = 90;


      switch (+level + 1) {
        case 4:
          const rect = addTitleRectBox(lastRect.left!, lastRect.top! + textRectHeight + 10, 4, +id);
          const textRect = addTextRectBox(rect.left!, rect.top! + titleRectHeight + 3, 4, +id)
          canvas.add(rect, textRect);
          canvas.add(addHeadingText(rect.left! + 2, rect.top! + 2, +id, 4));
          canvas.add(addSubText(textRect.left! + 2, textRect.top! + 2, +id, 4));
          canvas.discardActiveObject()
          canvas.renderAll();
          break;
        case 5:
          const mainContainer = canvas.getActiveObject();
          const newContainer = new fabric.Rect({
            ...mainContainer,
            height: mainContainer?.height! + 130,
          });
          canvas.add(newContainer);
          canvas.remove(mainContainer!);
          const rect5 = addTitleRectBox(lastRect.left!, lastRect.top! + textRectHeight + 10, 5, +id);
          const textRect5 = addTextRectBox(rect5.left!, rect5.top! + titleRectHeight + 3, 5, +id)
          canvas.add(rect5, textRect5);
          canvas.add(addHeadingText(rect5.left! + 2, rect5.top! + 2, +id, 5));
          canvas.add(addSubText(textRect5.left! + 2, textRect5.top! + 2, +id, 5));
          canvas.discardActiveObject()
          canvas.renderAll();
          break;
        case 6:
          const rect6 = addTitleRectBox(lastRect.left! - titleRectWidth - 20, lastRect.top! - titleRectHeight - 3, 6, +id);
          const textRect6 = addTextRectBox(rect6.left!, rect6.top! + titleRectHeight + 3, 6, +id);
          canvas.add(rect6, textRect6);
          canvas.add(addHeadingText(rect6.left! + 2, rect6.top! + 2, +id, 6));
          canvas.add(addSubText(rect6.left! + 2, rect6.top! + 30, +id, 6));
          canvas.discardActiveObject()
          canvas.renderAll();
          break;
        case 7:
          const rect7 = addTitleRectBox(lastRect.left! - titleRectWidth - 20, lastRect.top! - titleRectHeight - 3, 7, +id);
          const textRect7 = addTextRectBox(rect7.left!, rect7.top! + titleRectHeight + 3, 7, +id);
          canvas.add(rect7, textRect7);
          canvas.add(addHeadingText(rect7.left! + 2, rect7.top! + 2, +id, 7));
          canvas.add(addSubText(textRect7.left! + 2, textRect7.top! + 30, +id, 7));
          canvas.discardActiveObject()
          canvas.renderAll();
          break;
        case 8:
          const rect8 = addTitleRectBox(lastRect.left!, lastRect.top! - titleRectHeight - 3 - 120 - 10 -3, 8, +id);
          const textRect8 = addTextRectBox(rect8.left!, rect8.top! + titleRectHeight + 3, 8, +id);
          canvas.add(rect8, textRect8);
          canvas.add(addHeadingText(rect8.left! + 2, rect8.top! + 2, +id, 8));
          canvas.add(addSubText(textRect8.left! + 2, textRect8.top! + 30, +id, 8));
          canvas.discardActiveObject()
          canvas.renderAll();
          break;
        default:
          break;
      }
    }
  };

  return {
    addNewHubAndSokeElement,
    addHubAndSpokeLevel,
  };
};
