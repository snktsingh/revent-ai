import {
  STATISTICS_BOX,
  STATISTICS_TEXT,
  STATISTICS_TITLE_TEXT,
  STATISTICS,
} from '@/constants/elementNames';
import { updateStatisticsId } from '@/redux/reducers/fabricElements';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import AutoResizingTextbox from '@/utils/fabric-utils/AutoResizingTextbox';
import { fabric } from 'fabric';

export const useStatisticsElement = () => {
  const dispatch = useAppDispatch();
  const { statisticsId } = useAppSelector(state => state.elementsIds);

  const addRectBox = (left: number, top: number, level: number, id: number) => {
    const rect = new fabric.Rect({
      left: left,
      top: top,
      width: 230,
      height: 120,
      name: `${STATISTICS_BOX}_${id}`,
      stroke: '#406098',
      fill: 'transparent',
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
      rx: 5,
      ry: 5,
    });
    return rect;
  };

  const addTitleText = (left: number, top: number, id: number) => {
    const textBox = new AutoResizingTextbox('100%', {
      fontSize: 16,
      left: left,
      top: top,
      width: 248,
      name: `${STATISTICS_TITLE_TEXT}_${id}`,
      fill: '#406098',
      fixedWidth: 228,
      fixedHeight: 20,
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
      hasBorders: false,
      splitByGrapheme: true,
      fontWeight: 'bold',
      fontFamily: 'Red Hat Display, sans-serif',
    });
    return textBox;
  };

  const addSubText = (left: number, top: number, id: number) => {
    const textBox = new AutoResizingTextbox(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt aliqua. Mauris nunc congue nisi vitae suscipi.',
      {
        fontSize: 15,
        left: left,
        top: top,
        width: 229,
        name: `${STATISTICS_TEXT}_${id}`,
        fill: 'black',
        fixedWidth: 230,
        fixedHeight: 90,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        hasBorders: false,
        splitByGrapheme: true,
        fontFamily: 'Red Hat Display, sans-serif',
      }
    );
    return textBox;
  };

  //new statistic element

  const addNewStatisticsElement = (canvas: fabric.Canvas) => {
    const rectWidth = 230;

    const mainContainer = new fabric.Rect({
      left: 23,
      top: 82,
      width: rectWidth * 3 + 80,
      height: 300,
      fill: 'transparent',
      strokeWidth: 1,
      stroke: 'transparent',
      name: `${STATISTICS}_${statisticsId}`,
    });

    canvas.add(mainContainer);
    const rect1 = addRectBox(45, 100, 1, statisticsId);
    const rect2 = addRectBox(
      rect1.left! + rectWidth + 20,
      100,
      2,
      statisticsId
    );
    const rect3 = addRectBox(
      rect2.left! + rectWidth + 20,
      100,
      3,
      statisticsId
    );
    canvas.add(rect1, rect2, rect3);
    const rect1Heading = addTitleText(
      rect1.left! + 2,
      rect1.top! + 2,
      statisticsId
    );
    const rect1Text = addSubText(
      rect1.left! + 2,
      rect1.top! + 30,
      statisticsId
    );
    const rect2Heading = addTitleText(
      rect2.left! + 2,
      rect2.top! + 2,
      statisticsId
    );
    const rect2Text = addSubText(
      rect2.left! + 2,
      rect2.top! + 30,
      statisticsId
    );
    const rect3Heading = addTitleText(
      rect3.left! + 2,
      rect3.top! + 2,
      statisticsId
    );
    const rect3Text = addSubText(
      rect3.left! + 2,
      rect3.top! + 30,
      statisticsId
    );
    canvas.add(
      rect1Heading,
      rect1Text,
      rect2Heading,
      rect2Text,
      rect3Heading,
      rect3Text
    );
    canvas.renderAll();
    dispatch(updateStatisticsId());
  };

  //add statistics levels
  const addStatisticsLevels = (canvas: fabric.Canvas) => {
    let lastRect: fabric.Object | undefined;
    let level: number = 0;
    const activeObject = canvas.getActiveObject();
    canvas.getObjects().forEach(obj => {
      if (obj.name?.startsWith(STATISTICS_BOX)) {
        lastRect = obj;
        level++;
      }
    });

    if (lastRect && activeObject) {
        const [_, id] = lastRect?.name?.split('_') as string[];

        switch (level + 1) {
            case 4:
                const rect4 = addRectBox(activeObject.left! + 20, activeObject.top! + 160, 4, +id);
                canvas.add(rect4);
                canvas.add(
                    addTitleText(rect4.left! + 2, rect4.top! + 2, +id),
                    addSubText(rect4.left! + 2, rect4.top! + 30, +id)
                );
                canvas.discardActiveObject();
                canvas.renderAll();
                break;
            case 5:
                const rect5 = addRectBox(lastRect.left! + 230 + 20, lastRect.top! , 5, +id);
                canvas.add(rect5);
                canvas.add(
                    addTitleText(rect5.left! + 2, rect5.top! + 2, +id),
                    addSubText(rect5.left! + 2, rect5.top! + 30, +id)
                );
                canvas.discardActiveObject();
                canvas.renderAll();
                break;
            case 6:
                const rect6 = addRectBox(lastRect.left! + 230 + 20, lastRect.top! , 5, +id);
                canvas.add(rect6);
                canvas.add(
                    addTitleText(rect6.left! + 2, rect6.top! + 2, +id),
                    addSubText(rect6.left! + 2, rect6.top! + 30, +id)
                );
                canvas.discardActiveObject();
                canvas.renderAll();
                break;
        
            default:
                break;
        }
    }
  };

  return {
    addNewStatisticsElement,
    addStatisticsLevels
  };
};
