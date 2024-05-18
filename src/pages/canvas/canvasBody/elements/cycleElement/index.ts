import {
  CYCLE,
  CYCLE_ARROW,
  CYCLE_CIRCLE,
  CYCLE_TEXT,
} from '@/constants/elementNames';
import { customStyles, theme } from '@/constants/theme';
import { IExtendedCircleOptions } from '@/interface/fabricTypes';
import { updateCycleId } from '@/redux/reducers/fabricElements';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import AutoResizingTextbox from '@/utils/fabric-utils/AutoResizingTextbox';
import { fabric } from 'fabric';
import { useCanvasComponent } from '../../canvasComponent/container';
export function useCycleElement() {
  const dispatch = useAppDispatch();
  const { updateCanvasSlideData } = useCanvasComponent();
  const { activeSlideID } = useAppSelector(state => state.canvas)
  const { cycleId } = useAppSelector(state => state.elementsIds);
  const addArrow = (left: number, top: number, angle: number, id: number) => {
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
      name: `${CYCLE_ARROW}_${id}`,
    });

    return Arrow;
  };

  function addCycleSteps(canvas: fabric.Canvas) {
    const activeCycle = canvas.getActiveObject();
    const currentID: number = +activeCycle?.name?.split('_')[1]!;
    let mainContainer: fabric.Object;
    let arrows: fabric.Object[] = [];
    let Circles: fabric.Object[] = [];
    let texts: fabric.Object[] = [];
    canvas.forEachObject(obj => {
      if (obj.name == `${CYCLE}_${currentID}`) {
        mainContainer = obj;
        canvas.remove(obj);
      }

      if (obj.name == `${CYCLE_ARROW}_${currentID}`) {
        arrows.push(obj);
        canvas.remove(obj);
      }
      if (obj.name == `${CYCLE_CIRCLE}_${currentID}`) {
        Circles.push(obj);
        canvas.remove(obj);
      }
      if (obj.name == `${CYCLE_TEXT}_${currentID}`) {
        texts.push(obj);
      }
    });
    const addCircle = (left: number, top: number, level: number) => {
      const circle = new fabric.Circle({
        radius: 50,
        fill: customStyles.elementColors.duskyBlue,
        stroke: theme.colorSchemes.light.palette.primary.main,
        top,
        left,
        name: `${CYCLE_CIRCLE}_${currentID}`,
        level: `${CYCLE_CIRCLE}_${currentID}_${level}`,
      } as IExtendedCircleOptions);
      return canvas.add(circle);
    };

    const addText = (left: number, top: number, level: number) => {
      const text = new AutoResizingTextbox('Add Text', {
        width: 80,
        fontSize: 16,
        fontFamily: 'Arial',
        fill: theme.colorSchemes.light.palette.common.white,
        top,
        left,
        name: `${CYCLE_TEXT}_${currentID}`,
        fixedHeight: 60,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        hasBorders: false,
        splitByGrapheme: true,
        level: `${CYCLE_TEXT}_${currentID}_${level}`,
      });
      return canvas.add(text);
    };
    switch (Circles && Circles.length + 1) {
      case 4:
        canvas.remove(mainContainer!);
        let NewContainer = new fabric.Rect({
          width: 375,
          height: 324,
          top: 60,
          left: 370,
          fill: 'transparent',
          strokeWidth: 1,
          stroke: 'transparent',
          name: `${CYCLE}_${currentID}`,
        });
        canvas.add(NewContainer);
        addCircle(505, 60, 2);
        addCircle(636, 172, 3);
        addCircle(505, 284, 4);
        addCircle(378, 172, 1);
        canvas?.add(addArrow(442, 157, 311, currentID));
        canvas?.add(addArrow(628, 120, 29, currentID));
        canvas?.add(addArrow(479, 323, 221, currentID));
        canvas?.add(addArrow(666, 285, 124, currentID));
        canvas.bringToFront(texts[0]);
        canvas.bringToFront(texts[1]);
        canvas.bringToFront(texts[2]);
        addText(520, 295, 4);
        texts[0]
          .set({
            left: 398,
            top: 185,
          })
          .setCoords();
        texts[1]
          .set({
            left: 520,
            top: 74,
          })
          .setCoords();
        texts[2]
          .set({
            left: 652,
            top: 186,
          })
          .setCoords();
        break;
      case 5:
        
        canvas.remove(mainContainer!);
        let NewContainer5 = new fabric.Rect({
          width: 406,
          height: 391,
          top: 40,
          left: 330,
          fill: 'transparent',
          strokeWidth: 1,
          stroke: 'transparent',
          name: `${CYCLE}_${currentID}`,
        });
        canvas.add(NewContainer5);
        addCircle(480, 39, 2);
        addCircle(626, 155, 3);
        addCircle(341, 155, 1);
        addCircle(402, 329, 5);
        addCircle(583, 329, 4);
        canvas?.add(addArrow(401, 125, -51, currentID));
        canvas?.add(addArrow(630, 84, 31, currentID));
        canvas?.add(addArrow(700, 282, 111, currentID));
        canvas?.add(addArrow(568, 410, 180, currentID));
        canvas?.add(addArrow(398, 330, 240, currentID));
        canvas.bringToFront(texts[0]);
        canvas.bringToFront(texts[1]);
        canvas.bringToFront(texts[2]);
        canvas.bringToFront(texts[3]);
        addText(423, 335, 5);
        texts[0]
          .set({
            left: 357,
            top: 162,
          })
          .setCoords();
        texts[1]
          .set({
            left: 500,
            top: 44,
          })
          .setCoords();
        texts[2]
          .set({
            left: 647,
            top: 162,
          })
          .setCoords();
        texts[3]
          .set({
            left: 603,
            top: 335,
          })
          .setCoords();
        break;
      case 6:
        mainContainer!.set({
          
        });
        canvas.remove(mainContainer!);
        let NewContainer6 = new fabric.Rect({
          width: 524,
          height: 409,
          top: 36,
          left: 247,
          fill: 'transparent',
          strokeWidth: 1,
          stroke: 'transparent',
          name: `${CYCLE}_${currentID}`,
        });
        canvas.add(NewContainer6);
        addCircle(361, 36, 2);
        addCircle(561, 36, 3);
        addCircle(248, 181, 1);
        addCircle(671, 181, 4);
        addCircle(361, 339, 6);
        addCircle(561, 344, 5);
        canvas?.add(addArrow(488, 50, 358, currentID));
        canvas?.add(addArrow(311, 152, 311, currentID));
        canvas?.add(addArrow(684, 114, 51, currentID));
        canvas?.add(addArrow(334, 348, 235, currentID));
        canvas?.add(addArrow(714, 313, 124, currentID));
        canvas?.add(addArrow(536, 420, 180, currentID));
        canvas.bringToFront(texts[0]);
        canvas.bringToFront(texts[1]);
        canvas.bringToFront(texts[2]);
        canvas.bringToFront(texts[3]);
        canvas.bringToFront(texts[4]);
        addText(377, 356, 6);
        texts[0]
          .set({
            left: 262,
            top: 196,
          })

        texts[1]
          .set({
            left: 376,
            top: 50,
          })
          .setCoords();
        texts[2]
          .set({
            left: 581,
            top: 53,
          })
          .setCoords();
        texts[3]
          .set({
            left: 683,
            top: 199,
          })
          .setCoords();
        texts[4]
          .set({
            left: 577,
            top: 356,
          })
          .setCoords();
        break;
      default:
        break;
      }
      
    updateCanvasSlideData(canvas, activeSlideID);
    canvas?.renderAll();
  }

  //new cycle

  const addCycle = (canvas: fabric.Canvas | null) => {
    function createCircleWithText(left: number, top: number, level: number) {
      const text = new AutoResizingTextbox(`Add Text`, {
        left: left + 15,
        top: top + 20,
        fontSize: 16,
        fontFamily: 'Arial',
        editable: true,
        width: 80,
        fill: theme.colorSchemes.light.palette.common.white,
        name: `${CYCLE_TEXT}_${cycleId}`,
        fixedHeight: 60,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        hasBorders: false,
        splitByGrapheme: true,
        level: `${CYCLE_TEXT}_${cycleId}_${level}`,
      });

      const circle = new fabric.Circle({
        radius: 50,
        fill: customStyles.elementColors.duskyBlue,
        stroke: theme.colorSchemes.light.palette.primary.main,
        top,
        left,
        name: `${CYCLE_CIRCLE}_${cycleId}`,
        level: `${CYCLE_CIRCLE}_${cycleId}_${level}`,
      } as IExtendedCircleOptions);

      canvas?.add(circle, text);
    }
    const mainCycleContainer = new fabric.Rect({
      left: 390,
      top: 90,
      width: 293,
      height: 259,
      fill: 'transparent',
      strokeWidth: 1,
      stroke: 'transparent',
      name: `${CYCLE}_${cycleId}`,
    });

    canvas?.add(mainCycleContainer);
    canvas?.setActiveObject(mainCycleContainer);

    canvas?.add(addArrow(507, 116, 0, cycleId));
    canvas?.add(addArrow(469, 264, 236, cycleId));
    canvas?.add(addArrow(624, 224, 120, cycleId));
    createCircleWithText(389, 92, 1);
    createCircleWithText(581, 92, 2);
    createCircleWithText(484, 250, 3);

    canvas?.requestRenderAll();
    dispatch(updateCycleId());
  };
  return { addCycle, addCycleSteps };
}
