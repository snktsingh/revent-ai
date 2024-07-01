import { PYRAMID, PYRAMID_LEVEL, PYRAMID_TEXT } from '@/constants/elementNames';
import { customStyles } from '@/constants/theme';
import {
  IExtendedPolygonOptions,
  IExtendedTriangleOptions,
} from '@/interface/fabricTypes';
import { updatePyramidId } from '@/redux/reducers/fabricElements';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import AutoResizingTextbox from '@/utils/fabric-utils/AutoResizingTextbox';
import { fabric } from 'fabric';

export function usePyramidElement() {
  const dispatch = useAppDispatch();
  const { pyramidId } = useAppSelector(state => state.elementsIds);
  const addPyramidLevel = (canvas: fabric.Canvas) => {
    const activePyramid = canvas.getActiveObject();
    const currentID = activePyramid?.name?.split('_')[1];
    let lastLevel: any;
    let lastText: any;
    let levelsCount: number = 0;
    canvas.forEachObject(obj => {
      if (obj.name == `${PYRAMID_LEVEL}_${currentID}`) {
        console.log({ obj });
        levelsCount++;
        lastLevel = obj;
      }

      if (obj.name == `${PYRAMID_TEXT}_${currentID}`) {
        lastText = obj;
        obj.set({
          fill: 'white',
        });
      }
    });
    let activeObject = canvas.getActiveObject();

    if (lastLevel && lastText) {
      let trapezoid = new fabric.Polygon(
        [
          { x: lastLevel.points[0].x - 40, y: 0 },
          { x: lastLevel.points[1].x + 40, y: 0 },
          { x: lastLevel.points[2].x + 40, y: -60 },
          { x: lastLevel.points[3].x - 40, y: -60 },
        ],
        {
          fill: levelsCount % 2 !== 0 ? '#406098' : '#B0BCDE',
          stroke: 'black',
          top: lastLevel.top + 62,
          left: (lastLevel as fabric.Object).left! - 39,
          name: `${PYRAMID_LEVEL}_${currentID}`,
          level: `${PYRAMID_LEVEL}_${currentID}_${levelsCount + 1}`,
          hasControls: false,
          lockMovementX: true,
          lockMovementY: true,
          hasBorders: false,
        } as IExtendedPolygonOptions
      );

      const text = new AutoResizingTextbox('Add Text', {
        fontSize: 18,
        left: trapezoid.left! + 35,
        top: trapezoid.top! + 5,
        width: lastText.width + 70,
        fixedWidth: 150,
        fixedHeight: 50,
        textAlign: 'center',
        name: `${PYRAMID_TEXT}_${currentID}`,
        fill: 'white',
        hasBorders: false,
        splitByGrapheme: true,
        level: `${PYRAMID_TEXT}_${currentID}_${levelsCount + 1}`,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        fontFamily : customStyles.fonts.robotoSansSerif,
      });
      canvas.add(trapezoid);

      // const container = new fabric.Rect({
      //   left: trapezoid.left! - 2,
      //   top: activeObject?.top,
      //   name: `${PYRAMID}_${currentID}`,
      //   width: activeObject?.width! + 80,
      //   height: activeObject?.height! + 60,
      //   fill: 'transparent',
      //   strokeWidth: 1,
      //   stroke: 'transparent',
      // });
      // if (activeObject) {
      //   canvas.remove(activeObject);
      // }
      // canvas.add(container);

      canvas.getObjects().forEach(obj => {
        if (obj.name === `${PYRAMID_LEVEL}_${currentID}`) {
          obj.bringToFront();
        }
        if (obj.name === `${PYRAMID_TEXT}_${currentID}`) {
          obj.bringToFront();
        }
      });

      canvas.add(text);
      canvas.discardActiveObject();
      canvas?.renderAll();
    }
  };
  //new pyramid
  const addPyramid = (canvas: fabric.Canvas | null) => {
    let x1 = -140;
    let x2 = 140;
    let x3 = 100;
    let x4 = -100;

    let trapTop = 120;
    let group: fabric.Group;
    let textsList: fabric.Textbox[] = [];
    let textLeft: number;

    function createLevels(n: number) {
      let levels: fabric.Object[] = [];

      let triangle = new fabric.Triangle({
        width: 200,
        height: 150,
        left: 430,
        top: 40,
        stroke: 'black',
        fill: '#B0BCDE',
        name: `${PYRAMID_LEVEL}_${pyramidId}`,
        level: `${PYRAMID_LEVEL}_${pyramidId}_1`,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        hasBorders: false,
      } as IExtendedTriangleOptions);

      const text = new AutoResizingTextbox('Add Text', {
        fontSize: 18,
        left: 490,
        top: 120,
        width: 100,
        height: 60,
        name: `${PYRAMID_TEXT}_${pyramidId}`,
        fixedWidth: 120,
        fixedHeight: 60,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        fill: 'white',
        hasBorders: false,
        splitByGrapheme: true,
        level: `${PYRAMID_TEXT}_${pyramidId}_1`,
        fontFamily : customStyles.fonts.robotoSansSerif,
      });

      textsList.push(text);
      levels.push(triangle);
      for (let i = 1; i < n; i++) {
        let trapezoid = new fabric.Polygon(
          [
            { x: x1, y: 0 },
            { x: x2, y: 0 },
            { x: x3, y: -60 },
            { x: x4, y: -60 },
          ],

          {
            fill: '#406098',
            stroke: 'black',
            top: 192,
            name: `${PYRAMID_LEVEL}_${pyramidId}`,
            left: 390,
            level: `${PYRAMID_LEVEL}_${pyramidId}_2`,
            hasControls: false,
            lockMovementX: true,
            lockMovementY: true,
            hasBorders: false,
          } as IExtendedPolygonOptions
        );

        const text = new AutoResizingTextbox('Add Text', {
          fontSize: 18,
          left: trapezoid.left! + 32,
          top: 200,
          width: 217,
          name: `${PYRAMID_TEXT}_${pyramidId}`,
          fixedWidth: 150,
          fixedHeight: 50,
          hasControls: false,
          lockMovementX: true,
          lockMovementY: true,
          fill: 'white',
          hasBorders: false,
          level: `${PYRAMID_TEXT}_${pyramidId}_2`,
          textAlign: 'center',
          splitByGrapheme: true,
          fontFamily : customStyles.fonts.robotoSansSerif,
        });

        trapTop = trapTop + 60;
        x1 = x1 - 40;
        x2 = x2 + 40;
        x3 = x3 + 40;
        x4 = x4 - 40;
        textsList.push(text);
        levels.push(trapezoid);
      }

      return levels;
    }

    let pyramidLevels = createLevels(2);

    const mainContainer = new fabric.Rect({
      left: 219,
      top: 32,
      name: `${PYRAMID}_${pyramidId}`,
      width: 630,
      height: 530,
      fill: 'transparent',
      strokeWidth: 1,
      stroke: 'transparent',
    });

    // group = new fabric.Group(pyramidLevels, {
    //   left: 458,
    //   top: 44,
    //   name: `${PYRAMID}_${pyramidId}`,
    // });

    canvas?.add(mainContainer);
    canvas?.add(...pyramidLevels);

    textsList.forEach(el => {
      canvas?.add(el);
    });

    canvas?.requestRenderAll();
    dispatch(updatePyramidId());
  };
  return { addPyramid, addPyramidLevel };
}
