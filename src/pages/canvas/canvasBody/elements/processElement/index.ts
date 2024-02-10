import { PROCESS, PROCESS_ARROW, PROCESS_BOX, PROCESS_TEXT } from "@/constants/elementNames";
import { theme } from "@/constants/theme";
import { updateProcessId } from "@/redux/reducers/elementsCount";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import AutoResizingTextbox from "@/utils/fabric-utils/AutoResizingTextbox";
import { fabric } from "fabric";
export const useProcessElement = () => {
    const dispatch = useAppDispatch();
    const { processId } = useAppSelector(state => state.elementsIds);
    const addProcessSteps = (canvas: fabric.Canvas) => {
        const activeProcess = canvas.getActiveObject();
        const currentID = activeProcess?.name?.split("_")[1];
        let lastRect: any;
        let mainContainer: any;
    
        canvas.forEachObject(obj => {
          if (obj.name ===  `${PROCESS_BOX}_${currentID}`) {
            lastRect = obj;
          }
          if (obj.name ==  `${PROCESS}_${currentID}`) {
            mainContainer = obj;
          }
        });
    
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
          left: lastRect.left + 130,
          top: mainContainer.top + 40,
          angle: 0,
          name: `${PROCESS_ARROW}_${currentID}`,
          width: 20
        });
    
        let rect = new fabric.Rect({
          left: Arrow.left! + 60,
          top: mainContainer.top + 20,
          width: 110,
          height: 100,
          fill: theme.colorSchemes.light.palette.primary.main,
          rx: 10,
          ry: 10,
          name: `${PROCESS_BOX}_${currentID}`,
        });
    
        let text = new AutoResizingTextbox('Add Text', {
          fontSize: 14,
          left: rect.left! + 5,
          top: rect.top! + 5,
          fill: theme.colorSchemes.light.palette.common.white,
          width: 110,
          height: 100,
          name: `${PROCESS_TEXT}_${currentID}`,
          fixedWidth: 200,
          fixedHeight: 100
        });
    
        canvas.forEachObject(obj => {
          if (obj.name == `${PROCESS}_${currentID}`) {
            obj.set({
              width: obj.width! + 200,
            });
          }
        });
    
    
        canvas.add(rect);
        canvas.add(Arrow);
        canvas.add(text);
    
        canvas.renderAll();
    
      };
      // new process
    
      function addProcess(canvas: fabric.Canvas | null) {
        function addRectangle(
          left: number,
          top: number,
          width: number,
          height: number
        ) {
          let rect = new fabric.Rect({
            left: left,
            top: top,
            width,
            height,
            fill: theme.colorSchemes.light.palette.primary.main,
            rx: 10,
            ry: 10,
            name: `${PROCESS_BOX}_${processId}`,
          });
          return canvas?.add(rect);
        }
        function addText(left: number, top: number) {
          const text = new AutoResizingTextbox('Add Text', {
            fontSize: 14,
            left,
            top,
            fill: theme.colorSchemes.light.palette.common.white,
            width: 110,
            height:100,
            name: `${PROCESS_TEXT}_${processId}`,
            fixedHeight: 100,
            fixedWidth: 200,
          });
          return canvas?.add(text);
        }
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
            name: `${PROCESS_ARROW}_${processId}`,
            width: 20
          });
    
          return Arrow;
        };
    
        const mainProcessContainer = new fabric.Rect({
          left: 20,
          top: 120,
          width: 310,
          height: 150,
          fill: 'transparent',
          strokeWidth: 1,
          stroke: 'transparent',
          name: `${PROCESS}_${processId}`,
        });
    
        canvas?.add(mainProcessContainer);
        canvas?.setActiveObject(mainProcessContainer);
    
        canvas?.add(addArrow(145, mainProcessContainer.top! + 40, 0));
        addRectangle(
          mainProcessContainer.left!,
          mainProcessContainer.top! + 20,
          110,
          100
        );
        addRectangle(205, mainProcessContainer.top! + 20, 110, 100);
        addText(26, 146);
        addText(210, 146);
        canvas?.renderAll();
        dispatch(updateProcessId());
      };

      return { addProcess, addProcessSteps }
}