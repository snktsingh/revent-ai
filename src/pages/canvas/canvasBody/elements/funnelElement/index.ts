import { fabric } from "fabric";
export function useFunnelElement(){
    function addFunnelLevels(canvas: fabric.Canvas) {
        let lastLevel: any;
    
        let funnelGroup = canvas.getActiveObject();
        if (funnelGroup?.name === 'Funnel' && funnelGroup.type == 'group') {
          (funnelGroup as fabric.Group).forEachObject(object => {
            if (object.name == 'Funnel_Level') {
              lastLevel = object;
            }
          });
        }
    
        let trapezoid = new fabric.Polygon(
          [
            { x: lastLevel.points[0].x - 20, y: 0 },
            { x: lastLevel.points[1].x + 20, y: 0 },
            { x: lastLevel.points[2].x + 20, y: -50 },
            { x: lastLevel.points[3].x - 20, y: -50 },
          ],
          {
            fill: 'transparent',
            stroke: 'black',
            name: 'Funnel_Level',
            top: funnelGroup?.top! - 50,
            left: funnelGroup?.left! - 20,
          }
        );
    
        (funnelGroup as fabric.Group)?.addWithUpdate(trapezoid);
    
        let texts: any[] = [];
        canvas.forEachObject((object, i) => {
          if (object.name == 'Funnel_Text') {
            texts.push(object);
            object.set({ top: object.top! - 50 }); // Adjust the shift amount as needed
            object.setCoords(); // Update object coordinates
          }
        });
        let text = new fabric.Textbox('Add Text', {
          fontSize: 18,
          left: texts[texts.length - 1].left,
          top: texts[texts.length - 1].top + 50,
          width: 140,
          editable: true,
          textAlign: 'center',
          name: 'Funnel_Text',
        });
    
        canvas.add(text);
        canvas.requestRenderAll();
      }
    
      const addFunnel = (canvas: fabric.Canvas | null) => {
        function createLevels(n: number) {
          let x1 = -80;
          let x2 = 80;
          let x3 = 100;
          let x4 = -100;
          let levels: fabric.Object[] = [];
          let trapTop = -60;
          for (let i = 1; i <= n; i++) {
            let trapezoid = new fabric.Polygon(
              [
                { x: x1, y: 0 },
                { x: x2, y: 0 },
                { x: x3, y: -50 },
                { x: x4, y: -50 },
              ],
              {
                fill: 'transparent',
                stroke: 'black',
                top: trapTop,
                name: 'Funnel_Level',
              }
            );
    
            trapTop = trapTop - 50;
            x1 = x1 - 20;
            x2 = x2 + 20;
            x3 = x3 + 20;
            x4 = x4 - 20;
            levels.push(trapezoid);
          }
    
          let rect = new fabric.Rect({
            fill: 'transparent',
            stroke: 'black',
            width: 160,
            height: 100,
            top: -10,
            left: -80,
            name: 'Funnel_Base',
          });
          levels.push(rect);
    
          return levels;
        }
        let Funnel = createLevels(2);
        let group = new fabric.Group(Funnel, {
          left: 325,
          top: 253,
          name: 'Funnel',
        });
    
        canvas?.add(group);
    
        function addText(left: number, top: number, textC: string) {
          let text = new fabric.Textbox(textC, {
            fontSize: 18,
            left,
            top,
            width: 140,
            editable: true,
            textAlign: 'center',
            name: 'Funnel_Text',
          });
          return canvas?.add(text);
        }
    
        addText(376, 268, 'Add Text');
        addText(377, 319, 'Add Text');
    
        canvas?.requestRenderAll();
      };

      return { addFunnel, addFunnelLevels };
}