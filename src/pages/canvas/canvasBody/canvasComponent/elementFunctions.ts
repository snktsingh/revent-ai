import { fabric } from "fabric";
import { elementData } from "../elementData";
import useAllElements from "../elements";
import { useListElement, useImageElement } from "../elements/elementExports";

export const useElementFunctions = (canvas : fabric.Canvas | null ) => {

    const {
        title,
        subtitle,
        paragraph,
        BulletText,
        addQuotes
    } = useAllElements();

    const { addListElement } = useListElement();
    const { imageUploader } = useImageElement();

    elementData[1].onClick = () => {
        canvas?.add(title);
        title.selectAll();
        canvas?.setActiveObject(title);
        canvas?.renderAll();
      };
    
      elementData[2].onClick = () => {
        canvas?.add(subtitle);
        subtitle.selectAll();
        canvas?.setActiveObject(subtitle);
        canvas?.renderAll();
      };
    
      // elementData[3].onClick = () => {
      //   canvas?.add(heading);
      //   heading.selectAll();
      //   canvas?.setActiveObject(heading);
      //   canvas?.renderAll();
      // };
    
      elementData[3].onClick = () => {
        canvas?.add(paragraph);
        paragraph.selectAll();
        canvas?.setActiveObject(paragraph);
        canvas?.renderAll();
      };
    
      elementData[4].onClick = () => {
        canvas?.add(BulletText);
      };
    
      elementData[5].onClick = () => {
        imageUploader(canvas);
      };
      elementData[7].onClick = () => {
        let text = addQuotes();
        canvas?.add(text);
        canvas?.setActiveObject(text);
        text?.enterEditing();
        canvas?.renderAll();
      };
      elementData[8].onClick = () => {
        addListElement(canvas, 33, 23);
      };

}