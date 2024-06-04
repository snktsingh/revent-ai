import {
  FUNNEL,
  FUNNEL_LEVEL,
  FUNNEL_TEXT,
  PYRAMID,
  PYRAMID_LEVEL,
  PYRAMID_TEXT,
  TIMELINE,
  TIMELINE_CIRCLE,
  TIMELINE_DIRECTION,
  TIMELINE_HEADING,
  TIMELINE_TEXT,
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

      else if (activeObject?.name.startsWith(TIMELINE)) {
        let lastLevel: fabric.Object | undefined;
        let lastTextBox: fabric.Object | undefined;
        let lastTimelineTextBox: fabric.Object | undefined;
        let lastLine: fabric.Object | undefined;
        let circleCount = 0;
        canvas.forEachObject(obj => {
          if (obj.name === `${TIMELINE_CIRCLE}_${id}`) {
            lastLevel = obj;
            circleCount++;
          } else if (obj.name === `${TIMELINE_TEXT}_${id}`) {
            lastTextBox = obj;
          } else if (obj.name === `${TIMELINE_HEADING}_${id}`) {
            lastTimelineTextBox = obj;
          } else if (obj.name === `${TIMELINE_DIRECTION}_${id}`) {
            lastLine = obj;
          }
          console.log({ lastLevel, lastTextBox });
        });
        if (lastLevel && lastTextBox && lastTimelineTextBox && lastLine) {
          const mainContainer = new fabric.Rect({
            left: activeObject.left,
            top: activeObject.top,
            name: `${TIMELINE}_${id}`,
            width: circleCount <= 4? activeObject.width! - 170 : activeObject.width,
            height: circleCount === 5? activeObject.height! - 160 : activeObject.height!,
            fill: 'transparent',
            strokeWidth: 1,
            stroke: 'transparent',
          });
          canvas.add(mainContainer);
          canvas.remove(activeObject);
          canvas.remove(lastLevel);
          canvas.remove(lastTextBox);
          canvas.remove(lastTimelineTextBox);
          canvas.remove(lastLine);
        }
      }


    }

    canvas.renderAll();
  };

  return { handleRemovingLastLevel };
};
