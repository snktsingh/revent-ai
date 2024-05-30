import {
  HUB_AND_SPOKE,
  HUB_AND_SPOKE_BOX,
  HUB_AND_SPOKE_BOX_HEADING,
  HUB_AND_SPOKE_BOX_TEXT,
  HUB_AND_SPOKE_CIRCLE,
  HUB_AND_SPOKE_MAIN,
  HUB_AND_SPOKE_MAIN_TEXT,
} from '@/constants/elementNames';
import { updateHubAndSpokeId } from '@/redux/reducers/fabricElements';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import AutoResizingTextbox from '@/utils/fabric-utils/AutoResizingTextbox';
import { fabric } from 'fabric';

export const useHubAndSpoke = () => {
  const dispatch = useAppDispatch();
  const { hubAndSpokeId } = useAppSelector(state => state.elementsIds);
  const { canvasJS } = useAppSelector(state => state.canvas);

  const addRectBox = (left: number, top: number, level: number, id : number) => {
    const rect = new fabric.Rect({
      left: left,
      top: top,
      width: 250,
      height: 120,
      name: `${HUB_AND_SPOKE_BOX}_${id}`,
      fill: '#406098',
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
      hasBorders: false,
      rx: 5,
      ry: 5,
    });
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

  const addHeadingText = (left: number, top: number, id : number) => {
    const textBox = new AutoResizingTextbox('Add Title', {
      fontSize: 16,
      left: left,
      top: top,
      width: 248,
      name: `${HUB_AND_SPOKE_BOX_HEADING}_${id}`,
      fill: 'white',
      fixedWidth: 248,
      fixedHeight: 20,
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
      hasBorders: false,
      splitByGrapheme: true,
      backgroundColor: '#B0BCDE',
    });
    return textBox;
  };

  const addSubText = (left: number, top: number, id : number) => {
    const textBox = new AutoResizingTextbox('Add Text', {
      fontSize: 15,
      left: left,
      top: top,
      width: 250,
      name: `${HUB_AND_SPOKE_BOX_TEXT}_${id}`,
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
    const textBox = new AutoResizingTextbox('Hub \nand \n Spoke', {
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
    const rectWidth = 250;

    const mainContainer = new fabric.Rect({
      left: 23,
      top: 80,
      width: rectWidth * 3 + 80,
      height: 300,
      fill: 'transparent',
      strokeWidth: 1,
      stroke: 'transparent',
      name: `${HUB_AND_SPOKE}_${hubAndSpokeId}`,
    });

    canvas.add(mainContainer);
    const rect1 = addRectBox(45, 100, 1, hubAndSpokeId);
    const rect2 = addRectBox(rect1.left! + rectWidth + 20, 100, 2, hubAndSpokeId);
    const rect3 = addRectBox(rect2.left! + rectWidth + 20, 100, 3, hubAndSpokeId);
    const circle = addCircle(rect1.left! + rectWidth + 80, 230, hubAndSpokeId);
    canvas.add(circle);
    const rect1Heading = addHeadingText(rect1.left! + 2, rect1.top! + 2, hubAndSpokeId);
    const rect1Text = addSubText(rect1.left! + 2, rect1.top! + 30, hubAndSpokeId);
    const rect2Heading = addHeadingText(rect2.left! + 2, rect2.top! + 2, hubAndSpokeId);
    const rect2Text = addSubText(rect2.left! + 2, rect2.top! + 30, hubAndSpokeId);
    const rect3Heading = addHeadingText(rect3.left! + 2, rect3.top! + 2, hubAndSpokeId);
    const rect3Text = addSubText(rect3.left! + 2, rect3.top! + 30, hubAndSpokeId);
    canvas.add(rect1);
    canvas.add(rect2);
    canvas.add(rect3);
    canvas.add(rect1Heading);
    canvas.add(rect1Text);
    canvas.add(rect2Heading);
    canvas.add(rect2Text);
    canvas.add(rect3Heading);
    canvas.add(rect3Text);
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
      if (obj.name?.startsWith(HUB_AND_SPOKE_BOX)) {
        lastRect = obj;
        level++;
      }
    });

    if (lastRect && activeObject) {
      const [_, id] = lastRect?.name?.split('_') as string[];

      switch (+level + 1) {
        case 4:
          const rect = addRectBox(lastRect.left!, lastRect.top! + 120 + 10, 4, +id);
          canvas.add(rect);
          canvas.add(addHeadingText(rect.left! + 2, rect.top! + 2, +id));
          canvas.add(addSubText(rect.left! + 2, rect.top! + 30, +id));
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
          const rect5 = addRectBox(lastRect.left!, lastRect.top! + 120 + 10, 5, +id);
          canvas.add(rect5);
          canvas.add(addHeadingText(rect5.left! + 2, rect5.top! + 2, +id));
          canvas.add(addSubText(rect5.left! + 2, rect5.top! + 30, +id));
          canvas.discardActiveObject()
          canvas.renderAll();
          break;
        case 6:
          const rect6 = addRectBox(lastRect.left! - 250 - 20, lastRect.top!, 6, +id);
          canvas.add(rect6);
          canvas.add(addHeadingText(rect6.left! + 2, rect6.top! + 2, +id));
          canvas.add(addSubText(rect6.left! + 2, rect6.top! + 30, +id));
          canvas.discardActiveObject()
          canvas.renderAll();
          break;
        case 7:
          const rect7 = addRectBox(lastRect.left! - 250 - 20, lastRect.top!, 7, +id);
          canvas.add(rect7);
          canvas.add(addHeadingText(rect7.left! + 2, rect7.top! + 2, +id));
          canvas.add(addSubText(rect7.left! + 2, rect7.top! + 30, +id));
          canvas.discardActiveObject()
          canvas.renderAll();
          break;
        case 8:
          const rect8 = addRectBox(lastRect.left!, lastRect.top! - 120 -10, 8, +id);
          canvas.add(rect8);
          canvas.add(addHeadingText(rect8.left! + 2, rect8.top! + 2, +id));
          canvas.add(addSubText(rect8.left! + 2, rect8.top! + 30, +id));
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
