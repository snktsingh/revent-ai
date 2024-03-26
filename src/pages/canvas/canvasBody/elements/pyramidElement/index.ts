import { PYRAMID, PYRAMID_LEVEL, PYRAMID_TEXT } from '@/constants/elementNames';
import { updatePyramidId } from '@/redux/reducers/elementsCount';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import AutoResizingTextbox from '@/utils/fabric-utils/AutoResizingTextbox';
import { fabric } from 'fabric';

export function usePyramidElement() {
  const dispatch = useAppDispatch();
  const { pyramidId } = useAppSelector(state => state.elementsIds);
  const addPyramidLevel = (canvas: fabric.Canvas) => {
    const activePyramid = canvas.getActiveObject();
    const currentID = activePyramid?.name?.split('_')[1];
    console.log(activePyramid);
    let lastLevel: any;
    let lastText: any;
    let levelsCount : number = 0;;
    canvas.forEachObject(obj => {
      if (obj.name == `${PYRAMID_TEXT}_${currentID}`) {
        lastText = obj;
        levelsCount++;
      }
    });
    let activeObject = canvas.getActiveObject();
    if (
      activeObject?.type == 'group' &&
      activeObject.name?.startsWith(PYRAMID)
    ) {
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
          fill: (levelsCount % 2 !== 0)? '#406098' : '#B0BCDE',
          stroke: 'black',
          top:
            (activeObject as fabric.Group)?.getScaledHeight() +
            (activeObject as fabric.Group).top! -
            1,
          left: (activeObject as fabric.Group).left! - 40,
          name: `${PYRAMID_LEVEL}_${currentID}`,
        }
      );
      
      const text = new AutoResizingTextbox('Add Text', {
        fontSize: 18,
        left: lastText.left,
        top: trapezoid.top! + 20,
        width: 150,
        fixedWidth: 150,
        fixedHeight: 100,
        name: `${PYRAMID_TEXT}_${currentID}`,
        fill: 'white'
      });
      (activeObject as fabric.Group).addWithUpdate(trapezoid);

      canvas.getObjects().forEach(obj => {
        if (obj.name === `${PYRAMID_TEXT}_${currentID}`) {
          obj.set({
            left: lastText.left,
          });
        }
      });

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
        stroke: 'black',
        fill: '#B0BCDE',
      });
      const text = new AutoResizingTextbox('Add Text', {
        fontSize: 18,
        left: 365,
        top: 138,
        width: 100,
        name: `${PYRAMID_TEXT}_${pyramidId}`,
        fixedWidth: 100,
        fixedHeight: 200,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        fill: 'white'
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
            top: trapTop,
            name: `${PYRAMID_LEVEL}_${pyramidId}`,
          }
        );

        const text = new AutoResizingTextbox('Add Text', {
          fontSize: 18,
          left: 365,
          top: 213,
          width: 140,
          name: `${PYRAMID_TEXT}_${pyramidId}`,
          fixedWidth: 130,
          fixedHeight: 50,
          hasControls: false,
          lockMovementX: true,
          lockMovementY: true,
          fill: 'white'
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
      left: 265,
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
  return { addPyramid, addPyramidLevel };
}
