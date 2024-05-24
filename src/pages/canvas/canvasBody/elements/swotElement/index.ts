import { fabric } from "fabric";
export function useSWOTElement() {

    const addNewSWOTElement = (canvas : fabric.Canvas) => {
        fabric.loadSVGFromURL('../../../../../assets/canvas/SWOT_svg.svg', (objects, options) => {
            const svg = fabric.util.groupSVGElements(objects, options);
          
            // Set position and scale
            svg.set({
              left: 100,
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