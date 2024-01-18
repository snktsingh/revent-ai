import { theme } from "@/constants/theme";
import { fabric } from "fabric";
export function useTimelineElement(){

    const addTimelineSteps = (canvas: fabric.Canvas) => {
        let lastCircle: any;
        let mainContainer: any;
    
        canvas.forEachObject(obj => {
          if (obj.name == 'timeLineCircle') {
            lastCircle = obj;
          }
          if (obj.name == 'Timeline_Container') {
            mainContainer = obj;
          }
        });
    
        let line = new fabric.Line([50, 100, 200, 100], {
          left: lastCircle.left + 40,
          top: mainContainer.top + 20 + 45,
          strokeWidth: 3,
          stroke: theme.colorSchemes.light.palette.common.steelBlue,
          name: 'TimeLineDirection',
        });
    
        canvas?.add(line);
    
        let circle = new fabric.Circle({
          radius: 20,
          fill: theme.colorSchemes.light.palette.primary.main,
          top: mainContainer.top + 20 + 26,
          left: lastCircle.left + 180,
          stroke: theme.colorSchemes.light.palette.common.black,
          name: 'timeLineCircle',
        });
    
        canvas?.add(circle);
    
        function addText(
          left: number,
          top: number,
          width: number,
          fontSize: number,
          textContent: string,
          timelineName: string
        ) {
          let text = new fabric.Textbox(textContent, {
            fontSize,
            originX: 'left',
            originY: 'top',
            top,
            left,
            width,
            fill: 'black',
            name: timelineName,
          });
          return canvas?.add(text);
        }
    
        addText(
          lastCircle.left + 170,
          mainContainer.top + 20,
          100,
          14,
          'Add Timeline',
          'TimeLineHeading'
        );
        addText(
          lastCircle.left + 170,
          mainContainer.top + 20 + 79,
          150,
          16,
          'Add Text',
          'TimeLineText'
        );
    
        canvas.forEachObject(obj => {
          if (obj.name == 'Timeline_Container') {
            obj.set({
              width: obj.width! + 100,
            });
          }
        });
    
        canvas?.renderAll();
      };
    
      const addTimeline = (canvas: fabric.Canvas | null) => {
        function addText(
          left: number,
          top: number,
          width: number,
          fontSize: number,
          textContent: string,
          timelineName: string
        ) {
          let text = new fabric.Textbox(textContent, {
            fontSize,
            originX: 'left',
            originY: 'top',
            top,
            left,
            width,
            fill: 'black',
            name: timelineName,
          });
          return canvas?.add(text);
        }
    
        function addLine(left: number, top: number, width: number) {
          let line = new fabric.Line([50, 100, width, 100], {
            left,
            top,
            strokeWidth: 3,
            stroke: theme.colorSchemes.light.palette.common.steelBlue,
            name: 'TimeLineDirection',
          });
          return canvas?.add(line);
        }
    
        function addCircle(left: number, top: number) {
          let circle = new fabric.Circle({
            radius: 20,
            fill: theme.colorSchemes.light.palette.primary.main,
            top,
            left,
            stroke: theme.colorSchemes.light.palette.common.black,
            name: 'timeLineCircle',
          });
          return canvas?.add(circle);
        }
    
        const mainTimelineContainer = new fabric.Rect({
          left: 20,
          top: 120,
          width: 550,
          height: 150,
          fill: 'transparent',
          strokeWidth: 1,
          stroke: 'transparent',
          name: 'Timeline_Container',
        });
    
        canvas?.add(mainTimelineContainer);
        canvas?.setActiveObject(mainTimelineContainer);
    
        let mTop: number = mainTimelineContainer.top!;
        addLine(29, mTop + 20 + 45, 150);
        addLine(170, mTop + 20 + 45, 200);
        addCircle(130, mTop + 20 + 26);
        addCircle(321, mTop + 20 + 26);
        addText(102, mTop + 20, 100, 14, 'Add Timeline', 'TimeLineHeading');
        addText(111, mTop + 20 + 79, 150, 16, 'Add Text', 'TimeLineText');
        addText(301, mTop + 20, 100, 14, 'Add Timeline', 'TimeLineHeading');
        addText(307, mTop + 20 + 79, 150, 16, 'Add Text', 'TimeLineText');
      };
      return { addTimeline, addTimelineSteps };
}