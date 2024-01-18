import { theme } from "@/constants/theme";
import { fabric } from "fabric";
export function useCycleElement(){
    const addArrow = (left: number, top: number, angle: number) => {
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
          fill: theme.colorSchemes.light.palette.common.steelBlue,
          left,
          top,
          angle,
          name: 'Cycle_Arrow',
        });
    
        return Arrow;
      };
    
      function addCycleSteps(canvas: fabric.Canvas) {
        let mainContainer: fabric.Object;
        let arrows: fabric.Object[] = [];
        let Circles: fabric.Object[] = [];
        let texts: fabric.Object[] = [];
        canvas.forEachObject(obj => {
          if (obj.name == 'Cycle_Container') {
            mainContainer = obj;
            canvas.remove(obj);
          }
    
          if (obj.name == 'Cycle_Arrow') {
            arrows.push(obj);
            canvas.remove(obj);
          }
          if (obj.name == 'Cycle_Circle') {
            Circles.push(obj);
            canvas.remove(obj);
          }
          if (obj.name == 'Cycle_Text') {
            texts.push(obj);
          }
        });
        const addCircle = (left: number, top: number) => {
          const circle = new fabric.Circle({
            radius: 50,
            fill: theme.colorSchemes.light.palette.primary.main,
            stroke: theme.colorSchemes.light.palette.primary.main,
            top,
            left,
            name: 'Cycle_Circle',
          });
          return canvas.add(circle);
        };
    
        const addText = (left: number, top: number) => {
          const text = new fabric.Textbox('Add Text', {
            width: 80,
            fontSize: 16,
            fontFamily: 'Arial',
            fill: theme.colorSchemes.light.palette.common.white,
            top,
            left,
            name: 'Cycle_Text',
          });
          return canvas.add(text);
        };
        switch (Circles.length + 1) {
          // case 3:
          //   createCircleWithText(100, 100);
          //   canvas?.add(addArrow(220, 124, 0));
          //   canvas?.add(addArrow(197, 208, 56));
          //   canvas?.add(addArrow(337, 232, 120));
          //   createCircleWithText(292, 100);
          //   createCircleWithText(195, 258);
          //   break;
          case 4:
            mainContainer!.set({
              width: 382,
              height: 324,
              top: 35,
              left: 178,
            });
            canvas.add(mainContainer!);
    
            addCircle(305, 35);
            addCircle(305, 259);
            addCircle(178, 148);
            addCircle(436, 148);
            canvas?.add(addArrow(242, 132, 311));
            canvas?.add(addArrow(428, 85, 29));
            canvas?.add(addArrow(279, 298, 221));
            canvas?.add(addArrow(466, 263, 124));
            canvas.bringToFront(texts[0]);
            canvas.bringToFront(texts[1]);
            canvas.bringToFront(texts[2]);
            addText(320, 275);
            texts[0]
              .set({
                left: 198,
                top: 165,
              })
              .setCoords();
            texts[1]
              .set({
                left: 320,
                top: 54,
              })
              .setCoords();
            texts[2]
              .set({
                left: 452,
                top: 166,
              })
              .setCoords();
    
            canvas?.requestRenderAll();
            break;
          case 5:
            mainContainer!.set({
              width: 386,
              height: 391,
              top: 17,
              left: 191,
            });
            canvas.add(mainContainer!);
            addCircle(330, 17);
            addCircle(476, 133);
            addCircle(191, 133);
            addCircle(262, 307);
            addCircle(452, 307);
            canvas?.add(addArrow(256, 116, -51));
            canvas?.add(addArrow(465, 76, 31));
            canvas?.add(addArrow(251, 320, 232));
            canvas?.add(addArrow(560, 265, 114));
            canvas?.add(addArrow(426, 394, 179));
            canvas.bringToFront(texts[0]);
            canvas.bringToFront(texts[1]);
            canvas.bringToFront(texts[2]);
            canvas.bringToFront(texts[3]);
            addText(277, 325);
            texts[0]
              .set({
                left: 217,
                top: 162,
              })
              .setCoords();
            texts[1]
              .set({
                left: 354,
                top: 36,
              })
              .setCoords();
            texts[2]
              .set({
                left: 501,
                top: 153,
              })
              .setCoords();
            texts[3]
              .set({
                left: 478,
                top: 322,
              })
              .setCoords();
            canvas?.requestRenderAll();
            break;
          case 6:
            mainContainer!.set({
              width: 524,
              height: 409,
              top: 24,
              left: 148,
            });
            canvas.add(mainContainer!);
            addCircle(261, 24);
            addCircle(461, 24);
            addCircle(148, 169);
            addCircle(571, 169);
            addCircle(261, 327);
            addCircle(461, 332);
            canvas?.add(addArrow(388, 38, 358));
            canvas?.add(addArrow(211, 140, 311));
            canvas?.add(addArrow(584, 102, 51));
            canvas?.add(addArrow(234, 336, 235));
            canvas?.add(addArrow(614, 301, 124));
            canvas?.add(addArrow(436, 408, 180));
            canvas.bringToFront(texts[0]);
            canvas.bringToFront(texts[1]);
            canvas.bringToFront(texts[2]);
            canvas.bringToFront(texts[3]);
            canvas.bringToFront(texts[4]);
            addText(274, 346);
            texts[0]
              .set({
                left: 162,
                top: 186,
              })
              .setCoords();
            texts[1]
              .set({
                left: 276,
                top: 40,
              })
              .setCoords();
            texts[2]
              .set({
                left: 481,
                top: 43,
              })
              .setCoords();
            texts[3]
              .set({
                left: 580,
                top: 189,
              })
              .setCoords();
            texts[4]
              .set({
                left: 474,
                top: 346,
              })
              .setCoords();
            canvas?.requestRenderAll();
            break;
          default:
            break;
        }
    
        canvas?.renderAll();
      }
    
      const addCycle = (canvas: fabric.Canvas | null) => {
        function createCircleWithText(left: number, top: number) {
          const text = new fabric.Textbox(`Add Text`, {
            left: left + 20,
            top: top + 20,
            fontSize: 16,
            fontFamily: 'Arial',
            editable: true,
            width: 80,
            height: 30,
            fill: theme.colorSchemes.light.palette.common.white,
            name: 'Cycle_Text',
          });
    
          const circle = new fabric.Circle({
            radius: 50,
            fill: theme.colorSchemes.light.palette.primary.main,
            stroke: theme.colorSchemes.light.palette.primary.main,
            top,
            left,
            name: 'Cycle_Circle',
          });
    
          canvas?.add(circle, text);
        }
        const mainCycleContainer = new fabric.Rect({
          left: 267,
          top: 92,
          width: 293,
          height: 259,
          fill: 'transparent',
          strokeWidth: 1,
          stroke: 'transparent',
          name: 'Cycle_Container',
        });
    
        canvas?.add(mainCycleContainer);
        canvas?.setActiveObject(mainCycleContainer);
    
        canvas?.add(addArrow(387, 116, 0));
        canvas?.add(addArrow(349, 264, 236));
        canvas?.add(addArrow(504, 224, 120));
        createCircleWithText(267, 92);
        createCircleWithText(459, 92);
        createCircleWithText(362, 250);
    
        canvas?.requestRenderAll();
      };
    return { addCycle, addCycleSteps };
}