import {
  CYCLE,
  CYCLE_ARROW,
  CYCLE_CIRCLE,
  CYCLE_TEXT,
  FUNNEL,
  FUNNEL_LEVEL,
  FUNNEL_TEXT,
  HUB_AND_SPOKE,
  HUB_AND_SPOKE_BOX,
  HUB_AND_SPOKE_BOX_HEADING,
  HUB_AND_SPOKE_BOX_TEXT,
  HUB_AND_SPOKE_TEXT_BOX,
  PROCESS,
  PROCESS_ARROW,
  PROCESS_BOX,
  PROCESS_TEXT,
  PYRAMID,
  PYRAMID_LEVEL,
  PYRAMID_TEXT,
  STATISTICS,
  STATISTICS_BOX,
  STATISTICS_TEXT,
  STATISTICS_TITLE_TEXT,
  TIMELINE,
  TIMELINE_CIRCLE,
  TIMELINE_DIRECTION,
  TIMELINE_HEADING,
  TIMELINE_TEXT,
} from '@/constants/elementNames';
import { fabric } from 'fabric';
import { useCycleElement } from '../../elements/cycleElement';

export const useRemoveLevels = () => {
  const { addCircle, addText, addArrow } = useCycleElement();

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
      } else if (activeObject?.name.startsWith(TIMELINE)) {
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
            width:
              circleCount <= 4 ? activeObject.width! - 170 : activeObject.width,
            height:
              circleCount === 5
                ? activeObject.height! - 160
                : activeObject.height!,
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
      } else if (activeObject?.name.startsWith(PROCESS)) {
        let lastLevel: fabric.Object | undefined;
        let lastTextBox: fabric.Object | undefined;
        let lastArrow: fabric.Object | undefined;
        let rectCount: number = 0;
        canvas.forEachObject(obj => {
          if (obj.name === `${PROCESS_BOX}_${id}`) {
            lastLevel = obj;
            rectCount++;
          } else if (obj.name === `${PROCESS_TEXT}_${id}`) {
            lastTextBox = obj;
          } else if (obj.name === `${PROCESS_ARROW}_${id}`) {
            lastArrow = obj;
          }
        });
        if (lastLevel && lastTextBox && lastArrow) {
          const mainContainer = new fabric.Rect({
            left: activeObject.left!,
            top: activeObject.top!,
            name: `${PROCESS}_${id}`,
            width:
              rectCount <= 3 ? activeObject.width! - 245 : activeObject.width,
            height:
              rectCount === 4
                ? activeObject.height! - 170
                : activeObject.height,
            fill: 'transparent',
            strokeWidth: 1,
            stroke: 'transparent',
          });
          canvas.add(mainContainer);
          canvas.remove(activeObject);
          canvas.remove(lastLevel);
          canvas.remove(lastTextBox);
          canvas.remove(lastArrow);
        }
      } else if (activeObject?.name.startsWith(CYCLE)) {
        let circleCount: number = 0;

        canvas.forEachObject(obj => {
          if (obj.name === `${CYCLE_CIRCLE}_${id}`) {
            circleCount++;
          }
        });

        if (circleCount) {
          let currentID = +id;

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
          console.log(circleCount);
          switch (circleCount - 1) {
            case 3:
              canvas.remove(activeObject!);
              let NewContainer = new fabric.Rect({
                left: 390,
                top: 90,
                width: 293,
                height: 259,
                fill: 'transparent',
                strokeWidth: 1,
                stroke: 'transparent',
                name: `${CYCLE}_${currentID}`,
              });

              canvas.add(NewContainer);
              canvas?.add(addArrow(507, 116, 0, currentID));
              canvas?.add(addArrow(469, 264, 236, currentID));
              canvas?.add(addArrow(624, 224, 120, currentID));
              addCircle(389, 92, 1, canvas, currentID);
              addCircle(581, 92, 2, canvas, currentID);
              addCircle(484, 250, 3, canvas, currentID);
              canvas.bringToFront(texts[0]);
              canvas.bringToFront(texts[1]);
              canvas.bringToFront(texts[2]);
              texts[0]
                .set({
                  left: 389 + 15,
                  top: 92 + 20,
                })
                .setCoords();
              texts[1]
                .set({
                  left: 581 + 15,
                  top: 92 + 20,
                })
                .setCoords();
              texts[2]
                .set({
                  left: 484 + 15,
                  top: 250 + 20,
                })
                .setCoords();
              canvas.remove(texts[3]);
              break;
            case 4:
              canvas.remove(mainContainer!);
              let NewContainer4 = new fabric.Rect({
                width: 375,
                height: 324,
                top: 60,
                left: 370,
                fill: 'transparent',
                strokeWidth: 1,
                stroke: 'transparent',
                name: `${CYCLE}_${currentID}`,
              });
              canvas.add(NewContainer4);
              addCircle(505, 60, 2, canvas, currentID);
              addCircle(636, 172, 3, canvas, currentID);
              addCircle(505, 284, 4, canvas, currentID);
              addCircle(378, 172, 1, canvas, currentID);
              canvas?.add(addArrow(442, 157, 311, currentID));
              canvas?.add(addArrow(628, 120, 29, currentID));
              canvas?.add(addArrow(479, 323, 221, currentID));
              canvas?.add(addArrow(666, 285, 124, currentID));
              canvas.bringToFront(texts[0]);
              canvas.bringToFront(texts[1]);
              canvas.bringToFront(texts[2]);
              canvas.bringToFront(texts[3]);
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
              texts[3].set({
                left: 520,
                top: 295,
              }).setCoords();
              canvas.remove(texts[4]);
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
              addCircle(480, 39, 2, canvas, currentID);
              addCircle(626, 155, 3, canvas, currentID);
              addCircle(341, 155, 1, canvas, currentID);
              addCircle(402, 329, 5, canvas, currentID);
              addCircle(583, 329, 4, canvas, currentID);
              canvas?.add(addArrow(401, 125, -51, currentID));
              canvas?.add(addArrow(630, 84, 31, currentID));
              canvas?.add(addArrow(700, 282, 111, currentID));
              canvas?.add(addArrow(568, 410, 180, currentID));
              canvas?.add(addArrow(398, 330, 240, currentID));
              canvas.bringToFront(texts[0]);
              canvas.bringToFront(texts[1]);
              canvas.bringToFront(texts[2]);
              canvas.bringToFront(texts[3]);
              canvas.bringToFront(texts[4]);
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
              texts[4].set({
                left : 423,
                top : 335
              }).setCoords();
              canvas.remove(texts[5])
              break;
            default:
              break;
          }
        }
      } else if (activeObject?.name.startsWith(HUB_AND_SPOKE)) {
        let lastLevelTextRect: fabric.Object | undefined;
        let lastLevelHeadingRect: fabric.Object | undefined;
        let lastText: fabric.Object | undefined;
        let lastHeadingText: fabric.Object | undefined;
        canvas.forEachObject(obj => {
          if (obj.name === `${HUB_AND_SPOKE_TEXT_BOX}_${id}`) {
            lastLevelTextRect = obj;
          } else if (obj.name === `${HUB_AND_SPOKE_BOX}_${id}`) {
            lastLevelHeadingRect = obj;
          } else if (obj.name === `${HUB_AND_SPOKE_BOX_HEADING}_${id}`) {
            lastHeadingText = obj;
          } else if (obj.name === `${HUB_AND_SPOKE_BOX_TEXT}_${id}`) {
            lastText = obj;
          }
        });
        if (
          lastText &&
          lastHeadingText &&
          lastLevelHeadingRect &&
          lastLevelTextRect
        ) {
          //   const mainContainer = new fabric.Rect({
          //     left: activeObject.left! + 15,
          //     top: activeObject.top! + 40,
          //     name: `${FUNNEL}_${id}`,
          //     width: activeObject.width! - 20,
          //     height: activeObject?.height! - 40,
          //     fill: 'transparent',
          //     strokeWidth: 1,
          //     stroke: 'transparent',
          //   });
          //   canvas.add(mainContainer);
          canvas.discardActiveObject();
          canvas.remove(lastText);
          canvas.remove(lastHeadingText);
          canvas.remove(lastLevelHeadingRect);
          canvas.remove(lastLevelTextRect);
        }
      } else if (activeObject?.name.startsWith(STATISTICS)) {
        let lastLevelTextRect: fabric.Object | undefined;
        let lastText: fabric.Object | undefined;
        let lastHeadingText: fabric.Object | undefined;
        canvas.forEachObject(obj => {
          if (obj.name === `${STATISTICS_BOX}_${id}`) {
            lastLevelTextRect = obj;
          } else if (obj.name === `${STATISTICS_TITLE_TEXT}_${id}`) {
            lastHeadingText = obj;
          } else if (obj.name === `${STATISTICS_TEXT}_${id}`) {
            lastText = obj;
          }
        });
        if (lastText && lastHeadingText && lastLevelTextRect) {
          canvas.discardActiveObject();
          canvas.remove(lastText);
          canvas.remove(lastHeadingText);
          canvas.remove(lastLevelTextRect);
        }
      }
    }

    canvas.renderAll();
  };

  return { handleRemovingLastLevel };
};
