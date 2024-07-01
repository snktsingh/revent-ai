import { TIMELINE, TIMELINE_CIRCLE, TIMELINE_DIRECTION, TIMELINE_HEADING, TIMELINE_TEXT } from "@/constants/elementNames";
import { customStyles, theme } from "@/constants/theme";
import { updateTimelineId } from "@/redux/reducers/fabricElements";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fabric } from "fabric";
export function useTimelineElement(){
  const dispatch = useAppDispatch();
  const { timelineId } = useAppSelector(state => state.elementsIds);
    const addTimelineSteps = (canvas: fabric.Canvas) => {
        const activeTimeline = canvas?.getActiveObject();
        const currentID = activeTimeline?.name?.split("_")[1];
        let lastCircle: any;
        let mainContainer: any;
        let circleCount = 0;
        let firstLine : any;
        let lineFound : boolean = true;
    
        canvas.forEachObject(obj => {
          if (obj.name == `${TIMELINE_CIRCLE}_${currentID}`) {
            lastCircle = obj;
            circleCount++;
          }
          if (obj.name == `${TIMELINE}_${currentID}`) {
            mainContainer = obj;
          }
          if( obj.name == `${TIMELINE_DIRECTION}_${currentID}` ){
            if(lineFound) {
              firstLine = obj;
            }
            lineFound = false;

          }
        });

        
        let lineWidth = circleCount === 4? 150 : 200;
        let line = new fabric.Line([50, 100, lineWidth, 100], {
          left: lastCircle.left + 40,
          top: lastCircle.top + 18,
          strokeWidth: 3,
          stroke: customStyles.elementColors.cloudyBlue,
          name: `${TIMELINE_DIRECTION}_${currentID}`,
        });
    
        
        let circle = new fabric.Circle({
          radius: 20,
          fill: customStyles.elementColors.duskyBlue,
          top: lastCircle.top,
          left: lastCircle.left + 180,
          stroke: theme.colorSchemes.light.palette.common.black,
          name: `${TIMELINE_CIRCLE}_${currentID}`,
        });
    
        
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
            fill: theme.colorSchemes.light.palette.common.black,
            name: timelineName,
            hasControls :false,
            splitByGrapheme: true,
            fontFamily : customStyles.fonts.robotoSansSerif,
          });
          return canvas?.add(text);
        }

        if(circleCount === 4) {
          line.left = firstLine.left! ;
          line.top = mainContainer.top! + 220;

          circle.left = firstLine.left! + 102;
          circle.top = mainContainer.top! + 201;

          addText(
            circle.left! - 20,
            circle.top! - 25,
            100,
            14,
            'Add Timeline',
            `${TIMELINE_HEADING}_${currentID}`
          );

          addText(
            circle.left! - 20,
            circle.top! + 53,
            150,
            16,
            'Add Text',
            `${TIMELINE_TEXT}_${currentID}`
          );
        }
        
        canvas?.add(line);
        canvas?.add(circle);
        circleCount !== 4 && addText(
          lastCircle.left + 170,
          lastCircle.top - 25,
          100,
          14,
          'Add Timeline',
          `${TIMELINE_HEADING}_${currentID}`
        );
        circleCount !== 4 && addText(
          lastCircle.left + 170,
          lastCircle.top + 53,
          150,
          16,
          'Add Text',
          `${TIMELINE_TEXT}_${currentID}`
        );
    
        // canvas.forEachObject(obj => {
        //   if (obj.name == `${TIMELINE}_${currentID}`) {
        //     obj.set({
        //       width: circleCount < 4? obj.width! + 170 : obj.width,
        //       height : circleCount === 4? obj.height! + 160 : obj.height!
        //     });
        //   }
        // });
        canvas.discardActiveObject();
        canvas?.renderAll();
      };
    // new timeline
      const addTimeline = (canvas: fabric.Canvas | null) => {
        if(!canvas) return;
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
            fill: theme.colorSchemes.light.palette.common.black,
            name: timelineName,
            hasControls :false,
            splitByGrapheme: true,
            fontFamily : customStyles.fonts.robotoSansSerif,
          });
          return canvas?.add(text);
        }
    
        function addLine(left: number, top: number, width: number) {
          let line = new fabric.Line([50, 100, width, 100], {
            left,
            top,
            strokeWidth: 3,
            stroke: customStyles.elementColors.cloudyBlue,
            name:`${TIMELINE_DIRECTION}_${timelineId}`,
          });
          return canvas?.add(line);
        }
    
        function addCircle(left: number, top: number) {
          let circle = new fabric.Circle({
            radius: 20,
            fill: customStyles.elementColors.duskyBlue,
            top,
            left,
            stroke: theme.colorSchemes.light.palette.common.black,
            name: `${TIMELINE_CIRCLE}_${timelineId}`,
          });
          return canvas?.add(circle);
        }
    
        const mainTimelineContainer = new fabric.Rect({
          left: -5,
          top: 120,
          width: canvas?.getWidth() < 850 ? 900 : canvas?.getWidth()+ 10,
          height: 380,
          fill: 'transparent',
          strokeWidth: 1,
          stroke: 'transparent',
          name: `${TIMELINE}_${timelineId}`,
        });
    
        canvas?.add(mainTimelineContainer);
        canvas?.setActiveObject(mainTimelineContainer);
    
        let mTop: number = mainTimelineContainer.top!;
        addLine(29, mTop + 20 + 45, 150);
        addLine(170, mTop + 20 + 45, 200);
        addCircle(130, mTop + 20 + 26);
        addCircle(321, mTop + 20 + 26);
        addText(102, mTop + 20, 100, 14, 'Add Timeline', `${TIMELINE_HEADING}_${timelineId}`);
        addText(111, mTop + 20 + 79, 150, 16, 'Add Text', `${TIMELINE_TEXT}_${timelineId}`);
        addText(301, mTop + 20, 100, 14, 'Add Timeline', `${TIMELINE_HEADING}_${timelineId}`);
        addText(307, mTop + 20 + 79, 150, 16, 'Add Text', `${TIMELINE_TEXT}_${timelineId}`);
        canvas?.renderAll();
        dispatch(updateTimelineId());
      };
      return { addTimeline, addTimelineSteps };
}