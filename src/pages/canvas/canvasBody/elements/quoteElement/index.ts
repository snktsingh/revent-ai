import { theme } from "@/constants/theme";
import { fabric } from "fabric";
export const useQuoteElement = () => {
    
  const addQuotes = ( canvas : fabric.Canvas | null) => {
    let text = new fabric.Textbox('❝Click to add a quote❞', {
      left: 150,
      top: 200,
      width: 300,
      height: 40,
      fill: 'black',
      fontSize: 28,
      hasRotatingPoint: false,
      selectable: true,
      name: 'quotes',
      cursorColor: theme.colorSchemes.light.palette.primary.main,
      type: 'textbox',
    });

    let authorText = new fabric.Textbox('- Optional Author Name',{
      left: 258,
      top: 250,
      width: 250,
      height: 20,
      fill: 'black',
      fontSize: 18,
      name: 'quotesAuthor',
    })

    const mainListContainer = new fabric.Rect({
      width: 200,
      height: 200,
      fill: 'transparent',
      strokeWidth: 1,
      stroke: '#cbcbcb',
      name: 'List_Container',
      rx:5,
    });

    const addImage = new fabric.Text('+ Optional Image', {
      top: mainListContainer.top! + 80,
      left: mainListContainer.left! + 30,
      fill: 'black',
      fontSize: 20,
      hasControls: false,
      selectable: false,
      hoverCursor: 'pointer',
      name: 'ListAddImageText',
    });
    let group = new fabric.Group([mainListContainer, addImage], {
      left:450,
      top:120,
      name: 'LIST_ELEMENT',
    });



    canvas?.add(text,group,authorText)
  };  
  return { addQuotes };
}