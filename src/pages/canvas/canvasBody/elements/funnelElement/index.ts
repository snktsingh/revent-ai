import {
  FUNNEL,
  FUNNEL_BASE,
  FUNNEL_LEVEL,
  FUNNEL_TEXT,
} from '@/constants/elementNames';
import { updateFunnelId } from '@/redux/reducers/elementsCount';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fabric } from 'fabric';
export function useFunnelElement() {
  const { funnelId } = useAppSelector(state => state.elementsIds);
  const dispatch = useAppDispatch();
  function addFunnelLevels(canvas: fabric.Canvas) {
    let lastLevel: any;

    let funnelGroup = canvas.getActiveObject();
    let elementName = funnelGroup?.name?.split('_');
    let currentID = elementName && elementName[1];
    if (
      elementName &&
      funnelGroup &&
      elementName[0] === FUNNEL &&
      funnelGroup.type == 'group'
    ) {
      (funnelGroup as fabric.Group).forEachObject(object => {
        if (object.name == `${FUNNEL_LEVEL}_${currentID}`) {
          lastLevel = object;
        }
      });
    }

    let trapezoid = new fabric.Polygon(
      [
        { x: lastLevel.points[0].x - 20, y: 0 },
        { x: lastLevel.points[1].x + 20, y: 0 },
        { x: lastLevel.points[2].x + 20, y: -50 },
        { x: lastLevel.points[3].x - 20, y: -50 },
      ],
      {
        fill: 'transparent',
        stroke: 'black',
        name: `${FUNNEL_LEVEL}_${currentID}`,
        top: funnelGroup?.top! - 50,
        left: funnelGroup?.left! - 20,
      }
    );

    (funnelGroup as fabric.Group)?.addWithUpdate(trapezoid);

    let text = new fabric.Textbox('Add Text', {
      fontSize: 18,
      left: funnelGroup?.left! + funnelGroup?.width! / 2 - 70, 
      top: funnelGroup?.top! + 20,
      width: 140,
      editable: true,
      textAlign: 'center',
      name: `${FUNNEL_TEXT}_${currentID}`,
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
    });

    let top: number = text.top || 0;
    canvas.getObjects().reverse().forEach((object, i) => {
      if (object.name == `${FUNNEL_TEXT}_${currentID}`) {
        (object as fabric.Textbox).set({ top: top + 50, left: text.left });
        top = top + 50;
        object.setCoords();
      }
    });

    canvas.add(text);

    canvas.requestRenderAll();
}

  //new funnel
  const addFunnel = (canvas: fabric.Canvas | null) => {
    function createLevels(n: number) {
      let x1 = -80;
      let x2 = 80;
      let x3 = 100;
      let x4 = -100;
      let levels: fabric.Object[] = [];
      let trapTop = -60;
      for (let i = 1; i <= n; i++) {
        let trapezoid = new fabric.Polygon(
          [
            { x: x1, y: 0 },
            { x: x2, y: 0 },
            { x: x3, y: -50 },
            { x: x4, y: -50 },
          ],
          {
            fill: 'transparent',
            stroke: 'black',
            top: trapTop,
            name: `${FUNNEL_LEVEL}_${funnelId}`,
          }
        );

        trapTop = trapTop - 50;
        x1 = x1 - 20;
        x2 = x2 + 20;
        x3 = x3 + 20;
        x4 = x4 - 20;
        levels.push(trapezoid);
      }

      let rect = new fabric.Rect({
        fill: 'transparent',
        stroke: 'black',
        width: 160,
        height: 100,
        top: -10,
        left: -80,
        name: `${FUNNEL_BASE}_${funnelId}`,
      });
      levels.push(rect);

      return levels;
    }
    let Funnel = createLevels(2);
    let group = new fabric.Group(Funnel, {
      left: 325,
      top: 253,
      name: `${FUNNEL}_${funnelId}`,
    });

    canvas?.add(group);

    function addText(left: number, top: number, textC: string) {
      let text = new fabric.Textbox(textC, {
        fontSize: 18,
        left,
        top,
        width: 140,
        editable: true,
        textAlign: 'center',
        name: `${FUNNEL_TEXT}_${funnelId}`,
        hasControls :false,
        lockMovementX : true,
        lockMovementY:true
      });
      return canvas?.add(text);
    }

    addText(376, 268, 'Add Text');
    addText(377, 319, 'Add Text');

    canvas?.renderAll();
    dispatch(updateFunnelId());
  };

  return { addFunnel, addFunnelLevels };
}
