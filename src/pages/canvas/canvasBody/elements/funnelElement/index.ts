import {
  FUNNEL,
  FUNNEL_BASE,
  FUNNEL_LEVEL,
  FUNNEL_TEXT,
} from '@/constants/elementNames';
import { customStyles } from '@/constants/theme';
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
    let lastText : any;
    let funnelGroup = canvas.getActiveObject();
    let elementName = funnelGroup?.name?.split('_');
    let currentID = elementName && elementName[1];
    let levels: number = 0;
    canvas.forEachObject(object => {
      if (object.name == `${FUNNEL_LEVEL}_${currentID}`) {
        lastLevel = object;
        levels++;    
      }

      if(object.name == `${FUNNEL_TEXT}_${currentID}`) {
        lastText = object;
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
      left: trapezoid.left! + 15,
      top: trapezoid?.top! + 5,
      width: lastText.width + 40,
      editable: true,
      textAlign: 'center',
      name: `${FUNNEL_TEXT}_${currentID}`,
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
      hasBorders: false,
      fixedWidth: 140,
      fixedHeight: 50,
      splitByGrapheme: true,
      level: `${FUNNEL_TEXT}_${currentID}_${levels + 1}`,
      fontFamily : customStyles.fonts.robotoSansSerif,
    });

    // let container = new fabric.Rect({
    //   left: trapezoid.left,
    //   top: trapezoid.top! - 10,
    //   name: `${FUNNEL}_${currentID}`,
    //   width: trapezoid.width,
    //   height: funnelGroup?.height! + 50,
    //   fill: 'transparent',
    //   strokeWidth: 1,
    //   stroke: 'transparent',
    // });
    // if(funnelGroup){
    //   canvas.remove(funnelGroup)
    // };
    // canvas.add(container);
    canvas.forEachObject(object => {
      if (object.name == `${FUNNEL_LEVEL}_${currentID}`) {
        lastLevel = object;
        levels++;
        object.bringToFront();
      }

      if(object.name == `${FUNNEL_TEXT}_${currentID}`) {
        object.bringToFront();
      }
    });
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

    function addText(left: number, top: number, textC: string, width : number, level: number) {
      let text = new AutoResizingTextbox(textC, {
        fontSize: 18,
        left,
        top: top - 15,
        width,
        editable: true,
        textAlign: 'center',
        name: `${FUNNEL_TEXT}_${funnelId}`,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        hasBorders: false,
        fixedWidth: 140,
        fixedHeight: 50,
        splitByGrapheme: true,
        level: `${FUNNEL_TEXT}_${funnelId}_${level}`,
        fontFamily : customStyles.fonts.robotoSansSerif,
      });
      return canvas?.add(text);
    }

    const mainContainer = new fabric.Rect({
      left: 285,
      top: 20,
      name: `${FUNNEL}_${funnelId}`,
      width: 500,
      height: 430,
      fill: 'transparent',
      strokeWidth: 1,
      stroke: 'transparent',
    });

    canvas?.add(mainContainer);
    canvas?.add(...Funnel);


    addText(Funnel[0].left! + 15, 305, 'Add Text', 170, 1);
    addText(Funnel[1].left! + 15, 253, 'Add Text', 210, 2);

    canvas?.renderAll();
    dispatch(updateFunnelId());
  };

  return { addFunnel, addFunnelLevels };
}
