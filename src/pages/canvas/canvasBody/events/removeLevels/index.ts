import {
  FUNNEL,
  FUNNEL_LEVEL,
  FUNNEL_TEXT,
  PYRAMID,
  PYRAMID_LEVEL,
  PYRAMID_TEXT,
} from '@/constants/elementNames';
import { fabric } from 'fabric';

export const useRemoveLevels = () => {
  const handleRemovingLastLevel = (canvas: fabric.Canvas) => {
    const activeObject = canvas.getActiveObject();

    if (activeObject && activeObject.name) {
      const [_, id] = activeObject.name.split('_');
      if (activeObject?.name.startsWith(PYRAMID)) {
        let lastLevel: fabric.Object | undefined;
        let lastTextBox: fabric.Object | undefined;
        canvas.forEachObject(obj => {
          if (obj.name === `${PYRAMID_LEVEL}_${id}`) {
            lastLevel = obj;
          } else if (obj.name === `${PYRAMID_TEXT}_${id}`) {
            lastTextBox = obj;
          }
          console.log({ lastLevel, lastTextBox });
        });
        if (lastLevel && lastTextBox) {
          const mainContainer = new fabric.Rect({
            left: activeObject.left! + 40,
            top: activeObject.top!,
            name: `${PYRAMID}_${id}`,
            width: activeObject.width! - 80,
            height: activeObject?.height! - 60,
            fill: 'transparent',
            strokeWidth: 1,
            stroke: 'transparent',
          });
          canvas.add(mainContainer);
          canvas.remove(activeObject);
          canvas.remove(lastLevel);
          canvas.remove(lastTextBox);
        }
      } else if (activeObject?.name.startsWith(FUNNEL)) {
        let lastLevel: fabric.Object | undefined;
        let lastTextBox: fabric.Object | undefined;
        canvas.forEachObject(obj => {
          if (obj.name === `${FUNNEL_LEVEL}_${id}`) {
            lastLevel = obj;
          } else if (obj.name === `${FUNNEL_TEXT}_${id}`) {
            lastTextBox = obj;
          }
          console.log({ lastLevel, lastTextBox });
        });
        if (lastLevel && lastTextBox) {
          const mainContainer = new fabric.Rect({
            left: activeObject.left! + 15,
            top: activeObject.top! + 40,
            name: `${FUNNEL}_${id}`,
            width: activeObject.width! - 20,
            height: activeObject?.height! - 40,
            fill: 'transparent',
            strokeWidth: 1,
            stroke: 'transparent',
          });
          canvas.add(mainContainer);
          canvas.remove(activeObject);
          canvas.remove(lastLevel);
          canvas.remove(lastTextBox);
        }
      }
    }

    canvas.renderAll();
  };

  return { handleRemovingLastLevel };
};
