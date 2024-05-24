import { SWOTIcon } from "@/constants/media";
import { customStyles } from "@/constants/theme";
import { fabric } from "fabric";
export function useSWOTElement() {

    const addNewSWOTElement = (canvas : fabric.Canvas) => {

        function addRectangle(
            left: number,
            top: number,
            width: number,
            height: number,
            level: number
          ) {
            // let rect = new fabric.Rect({
            //   left: left,
            //   top: top,
            //   width,
            //   height,
            //   fill: customStyles.elementColors.duskyBlue,
            //   rx: 10,
            //   ry: 10,
            //   name: `${PROCESS_BOX}_${processId}`,
            //   level: `${PROCESS_BOX}_${processId}_${level}`,
            // } as IExtendedRectOptions);
            // return canvas?.add(rect);
          }

        fabric.loadSVGFromURL(SWOTIcon, (objects, options) => {
            const svg = fabric.util.groupSVGElements(objects, options);
            console.log({objects})
          
            svg.set({
              left: 275,
              top: 100,
              scaleX: 0.5,
              scaleY: 0.5
            });
          
            canvas.add(svg);
            canvas.renderAll();
          });
    };

    return {
        addNewSWOTElement
    };

};