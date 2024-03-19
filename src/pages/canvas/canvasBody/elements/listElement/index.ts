import AutoResizingTextbox from "@/utils/fabric-utils/AutoResizingTextbox";
import { fabric } from "fabric";
export function useListElement(){
    const addListElement = (
        canvas: fabric.Canvas | null,
        left: number,
        top: number
      ) => {
        const mainListContainer = new fabric.Rect({
          width: 150,
          height: 200,
          fill: 'transparent',
          strokeWidth: 1,
          stroke: '#cbcbcb',
          name: 'List_Container',
        });
    
        const addImage = new fabric.Text('+ Add Image', {
          top: mainListContainer.top! + 80,
          left: mainListContainer.left! + 40,
          fill: 'black',
          fontSize: 14,
          hasControls: false,
          selectable: false,
          hoverCursor: 'pointer',
          name: 'ListAddImageText',
          
        });
        let group = new fabric.Group([mainListContainer, addImage], {
          left,
          top,
          name: 'LIST_ELEMENT',
          moveCursor: 'pointer',
        });
    
        const text = new AutoResizingTextbox('Text', {
          fontSize: 18,
          width: 145,
          height: 100,
          fixedWidth: 145,
          fixedHeight: 100,
          fill: 'black',
          left: left + 3,
          top: top + 175,
          textAlign: 'center',
          name: 'listText',
          hasControls :false
        });
    
        // canvas?.add(mainListContainer);
        // canvas?.add(addImage);
        canvas?.add(group);
        canvas?.add(text);
        canvas?.renderAll();
      };

      const addImage = (canvas: fabric.Canvas, object: fabric.Object) => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/**';
        fileInput.click();
        let file;
        let reader = new FileReader();
        fileInput.addEventListener('change', e => {
          file = (e.target as HTMLInputElement)?.files?.[0];
          if (file) {
            reader.onload = () => {
              if (canvas) {
                fabric.Image.fromURL(reader.result as string, img => {
                  const fixedWidth = 147; // Set the fixed width you desire
                  const fixedHeight = 170; // Set the fixed height you desire
                  // img.scaleToWidth(fixedWidth);
                  // img.scaleToHeight(fixedHeight);
                  const scaleX = fixedWidth / img.width!;
                  const scaleY = fixedHeight / img.height!;
                  let container = (object as fabric.Group)._objects[1];
                  let TextElement = (object as fabric.Group)._objects[1];
                  (object as fabric.Group).removeWithUpdate(TextElement);
                  (object as fabric.Group).set({
                    name: 'List_Container',
                  });
                  img.set({
                    left: object && object.left !== undefined ? object.left + 2 : 0,
                    top: object && object.top !== undefined ? object.top + 2 : 0,
                    name: 'listImage',
                    scaleX,
                    scaleY,
                  });
                  object && (object as fabric.Group).addWithUpdate(img);
                  object && canvas.sendBackwards(object);
                  object?.setCoords();
                });
              }
            };
            reader.readAsDataURL(file);
          }
        });
      };
    return { addListElement, addImage };
}