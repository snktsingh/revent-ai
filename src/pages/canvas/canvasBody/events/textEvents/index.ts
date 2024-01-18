import { theme } from "@/constants/theme";
import { fabric } from "fabric";
export function useTextEvents(){
    const textEnteringEvent = (canvas: fabric.Canvas, object: fabric.Object) => {
        if (object) {
          
          let textBox = (object as fabric.Textbox);
          if (textBox?.text == 'Click to add a title' || textBox?.text == 'Click to add a subtitle' || textBox?.text == 'Click to add a heading' || textBox?.text == 'Click to add a paragraph' || textBox?.text == 'Click to add a bullet point') {
            // Clear the placeholder text and make it selectable
            textBox.text = '';
            // Set focus on the textbox
            textBox.set({
              fill: theme.colorSchemes.light.palette.common.black
            })
            canvas.renderAll()
          } else if (textBox.text == 'Add Text') {
            textBox.text = '';
            // Set focus on the textbox
            
            canvas.renderAll()
          }
        }
      }
    
      const textExitedEvent = (canvas: fabric.Canvas, object: fabric.Textbox | fabric.Text | fabric.IText) => {
    
        let textBox = object;
        switch (textBox.name) {
          case 'title':
            if (textBox.text == '') {
              textBox.text = 'Click to add a title';
              textBox.set({
                fill: '#404040'
              })
            }
            canvas.renderAll();
            break;
          case 'subTitle':
            if (textBox.text == '') {
              textBox.text = 'Click to add a subtitle';
              textBox.set({
                fill: '#404040'
              })
            }
            canvas.renderAll();
            break;
          case 'paragraphbox':
            if (textBox.text == '') {
              textBox.text = 'Click to add a paragraph';
              textBox.set({
                fill: '#404040'
              })
            }
            canvas.renderAll();
            break;
          case 'bullet':
            if (textBox.text == '') {
              textBox.text = 'Click to add a bullet point';
              textBox.set({
                fill: '#404040'
              })
            }
            canvas.renderAll();
            break;
          default:
            break;
        }
        console.log(textBox)
      }
    return { textEnteringEvent, textExitedEvent };
}