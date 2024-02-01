import { PYRAMID, PYRAMID_LEVEL, PYRAMID_TEXT } from '@/constants/elementNames';
import { updatePyramidId } from '@/redux/reducers/elementsCount';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fabric } from 'fabric';

export function usePyramidElement() {
  const dispatch = useAppDispatch();
  const { pyramidId } = useAppSelector(state => state.elementsIds)
  const addPyramidLevel = (canvas: fabric.Canvas) => {
    const activePyramid = canvas.getActiveObject();
    const ID = activePyramid?.name?.split("_")[1];
    console.log(activePyramid)
    let lastLevel: any;
    let lastText: any;
    canvas.forEachObject(obj => {
      if (obj.name == `${PYRAMID_TEXT}_${ID}`) { 
        lastText = obj;
      }
    });
    let activeObject = canvas.getActiveObject();
    if (activeObject?.type == 'group' && activeObject.name?.startsWith(PYRAMID)) {
      (activeObject as fabric.Group).forEachObject(obj => {
        lastLevel = obj;
      });
    }
    if (lastLevel && lastText) {
      let trapezoid = new fabric.Polygon(
        [
          { x: lastLevel.points[0].x - 40, y: 0 },
          { x: lastLevel.points[1].x + 40, y: 0 },
          { x: lastLevel.points[2].x + 40, y: -60 },
          { x: lastLevel.points[3].x - 40, y: -60 },
        ],
        {
          fill: 'transparent',
          stroke: 'black',
          top:
            (activeObject as fabric.Group)?.getScaledHeight() +
            (activeObject as fabric.Group).top! -
            1,
          left: (activeObject as fabric.Group).left! - 40,
          name: `${PYRAMID_LEVEL}_${ID}`,
        }
      );

      const text = new fabric.Textbox('Add Text', {
        fontSize: 18,
        left: lastText.left,
        top: trapezoid.top! + 20,
        width: 100,
        name: `${PYRAMID_TEXT}_${ID}`,
      });

      (activeObject as fabric.Group).addWithUpdate(trapezoid);
      canvas.add(text);
      canvas?.requestRenderAll();
    }
  };
//new pyramid
  const addPyramid = (canvas: fabric.Canvas | null) => {
    let x1 = -140;
    let x2 = 140;
    let x3 = 100;
    let x4 = -100;

    let trapTop = 0;
    let group: fabric.Group;
    let textsList: fabric.Textbox[] = [];
    let textLeft: number;

    function createLevels(n: number) {
      let levels: fabric.Object[] = [];

      let triangle = new fabric.Triangle({
        width: 200,
        height: 150,
        left: -101,
        top: -150,
        fill: 'transparent',
        stroke: 'black',
      });
      const text = new fabric.Textbox('Add Text', {
        fontSize: 18,
        left: 274,
        top: 137,
        width: 100,
        name: `${PYRAMID_TEXT}_${pyramidId}`,
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
            fill: 'transparent',
            stroke: 'black',
            top: trapTop,
            name: `${PYRAMID_LEVEL}_${pyramidId}`,
          }
        );

        const text = new fabric.Textbox('Add Text', {
          fontSize: 18,
          left: 274,
          top: 213,
          width: 100,
          name: `${PYRAMID_TEXT}_${pyramidId}`,
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

    group = new fabric.Group(pyramidLevels, {
      left: 173,
      top: 46,
      name: `${PYRAMID}_${pyramidId}`,
    });

    canvas?.add(group);

    textsList.forEach(el => {
      canvas?.add(el);
    });

    canvas?.requestRenderAll();
    dispatch(updatePyramidId());
  };
  return { addPyramid, addPyramidLevel }
}
