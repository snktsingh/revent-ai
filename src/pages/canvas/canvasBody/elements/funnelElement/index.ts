import {
  FUNNEL,
  FUNNEL_BASE,
  FUNNEL_LEVEL,
  FUNNEL_TEXT,
} from '@/constants/elementNames';
import { IExtendedPolygonOptions } from '@/interface/fabricTypes';
import { updateFunnelId } from '@/redux/reducers/fabricElements';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import AutoResizingTextbox from '@/utils/fabric-utils/AutoResizingTextbox';
import { fabric } from 'fabric';
export function useFunnelElement() {
  const { funnelId } = useAppSelector(state => state.elementsIds);
  const dispatch = useAppDispatch();
  function addFunnelLevels(canvas: fabric.Canvas) {
    let lastLevel: any;

    let funnelGroup = canvas.getActiveObject();
    let elementName = funnelGroup?.name?.split('_');
    let currentID = elementName && elementName[1];
    let levels: number = 0;
    canvas.forEachObject(object => {
      if (object.name == `${FUNNEL_LEVEL}_${currentID}`) {
        lastLevel = object;
        levels++;
      }
    });

    let trapezoid = new fabric.Polygon(
      [
        { x: lastLevel.points[0].x - 20, y: 0 },
        { x: lastLevel.points[1].x + 20, y: 0 },
        { x: lastLevel.points[2].x + 20, y: -50 },
        { x: lastLevel.points[3].x - 20, y: -50 },
      ],
      {
        fill: '#B0BCDE',
        stroke: 'black',
        name: `${FUNNEL_LEVEL}_${currentID}`,
        top: lastLevel?.top! - 53,
        left: lastLevel?.left! - 20,
        level: `${FUNNEL_LEVEL}_${currentID}_${levels + 1}`,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
      } as IExtendedPolygonOptions
    );

    
    let text = new AutoResizingTextbox('Add Text', {
      fontSize: 18,
      left: funnelGroup?.left! + funnelGroup?.width! / 2 - 70,
      top: trapezoid?.top! + 20,
      width: 140,
      editable: true,
      textAlign: 'center',
      name: `${FUNNEL_TEXT}_${currentID}`,
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
      hasBorders: false,
      fixedWidth: 140,
      fixedHeight: 30,
      splitByGrapheme: true,
      level: `${FUNNEL_TEXT}_${currentID}_${levels + 1}`,
    });

    // let top: number = text.top || 0;
    // canvas
    //   .getObjects()
    //   .reverse()
    //   .forEach((object, i) => {
    //     if (object.name == `${FUNNEL_TEXT}_${currentID}`) {
    //       (object as fabric.Textbox).set({ top: top + 50, left: text.left });
    //       top = top + 50;
    //       object.setCoords();
    //     }
    //   });
    funnelGroup?.set({
      width: trapezoid.width,
      height: funnelGroup.height! + 48,
      left: trapezoid.left,
      top: trapezoid.top! - 10,
    }).setCoords();
    
    canvas?.add(trapezoid);
    canvas.add(text);
    canvas.discardActiveObject();
    canvas.renderAll();
  }

  //new funnel
  const addFunnel = (canvas: fabric.Canvas | null) => {
    function createLevels(n: number) {
      let x1 = -80;
      let x2 = 80;
      let x3 = 100;
      let x4 = -100;
      let levels: fabric.Object[] = [];
      let trapTop = 290;
      let trapLeft = 445;
      for (let i = 1; i <= n; i++) {
        let trapezoid = new fabric.Polygon(
          [
            { x: x1, y: 0 },
            { x: x2, y: 0 },
            { x: x3, y: -50 },
            { x: x4, y: -50 },
          ],
          {
            fill: '#B0BCDE',
            stroke: 'black',
            top: trapTop,
            name: `${FUNNEL_LEVEL}_${funnelId}`,
            left: trapLeft,
            level: `${FUNNEL_LEVEL}_${funnelId}_${i}`,
            hasControls: false,
            lockMovementX: true,
            lockMovementY: true,
          } as IExtendedPolygonOptions
        );

        trapTop = trapTop - 54;
        trapLeft -= 20;
        x1 = x1 - 20;
        x2 = x2 + 20;
        x3 = x3 + 20;
        x4 = x4 - 20;
        levels.push(trapezoid);
      }

      let rect = new fabric.Rect({
        fill: '#406098',
        stroke: 'black',
        width: 160,
        height: 100,
        left: 466,
        top: 343,
        name: `${FUNNEL_BASE}_${funnelId}`,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
      });
      levels.push(rect);

      return levels;
    }
    let Funnel = createLevels(2);
    // let group = new fabric.Group(Funnel, {
    //   left: 411,
    //   top: 249,
    //   name: `${FUNNEL}_${funnelId}`,
    // });

    function addText(left: number, top: number, textC: string, level: number) {
      let text = new AutoResizingTextbox(textC, {
        fontSize: 18,
        left,
        top,
        width: 140,
        editable: true,
        textAlign: 'center',
        name: `${FUNNEL_TEXT}_${funnelId}`,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        hasBorders: false,
        fixedWidth: 140,
        fixedHeight: 30,
        splitByGrapheme: true,
        level: `${FUNNEL_TEXT}_${funnelId}_${level}`,
      });
      return canvas?.add(text);
    }

    const mainContainer = new fabric.Rect({
      left: 395,
      top: 220,
      name: `${FUNNEL}_${funnelId}`,
      width: 300,
      height: 230,
      fill: 'transparent',
      strokeWidth: 1,
      stroke: 'transparent',
    });

    canvas?.add(mainContainer);
    canvas?.add(...Funnel);

    addText(475, 305, 'Add Text', 1);
    addText(475, 253, 'Add Text', 2);

    canvas?.renderAll();
    dispatch(updateFunnelId());
  };

  return { addFunnel, addFunnelLevels };
}
