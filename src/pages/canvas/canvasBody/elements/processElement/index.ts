import { theme } from "@/constants/theme";
import { fabric } from "fabric";
export const useProcessElement = () => {

    const addProcessSteps = (canvas: fabric.Canvas) => {
        let lastRect: any;
        let mainContainer: any;
    
        canvas.forEachObject(obj => {
          if (obj.name === 'ProcessBox') {
            lastRect = obj;
          }
          if (obj.name == 'Process_Container') {
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
          name: 'ProcessArrow',
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
          name: 'ProcessBox',
        });
    
        let text = new fabric.Textbox('Add Text', {
          fontSize: 14,
          left: rect.left! + 5,
          top: rect.top! + 5,
          fill: theme.colorSchemes.light.palette.common.white,
          width: 100,
          name: 'ProcessText',
          hasBorders: false,
          hasControls: false,
        });
    
        canvas.forEachObject(obj => {
          if (obj.name == 'Process_Container') {
            obj.set({
              width: obj.width! + 150,
            });
          }
        });
    
    
        canvas.add(rect);
        canvas.add(Arrow);
        canvas.add(text);
    
        canvas.renderAll();
    
      };
    
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
            name: 'ProcessBox',
          });
          return canvas?.add(rect);
        }
        function addText(left: number, top: number) {
          const text = new fabric.Textbox('Add Text', {
            fontSize: 14,
            left,
            top,
            fill: theme.colorSchemes.light.palette.common.white,
            width: 100,
            name: 'ProcessText',
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
            name: 'ProcessArrow',
            width: 20
          });
    
          return Arrow;
        };
    
        const mainProcessContainer = new fabric.Rect({
          left: 20,
          top: 120,
          width: 510,
          height: 150,
          fill: 'transparent',
          strokeWidth: 1,
          stroke: 'transparent',
          name: 'Process_Container',
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
      };

      return { addProcess, addProcessSteps }
}