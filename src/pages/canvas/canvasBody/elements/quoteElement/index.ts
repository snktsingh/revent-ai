import {
  QUOTE,
  QUOTE_ADD_IMG_TEXT,
  QUOTE_AUTHOR,
  QUOTE_IMG,
  QUOTE_IMG_CONTAINER,
  QUOTE_TEXT,
} from '@/constants/elementNames';
import { theme } from '@/constants/theme';
import { QuoteImages, addQuoteImageForStore } from '@/data/data';
import { useAppSelector } from '@/redux/store';
import { fabric } from 'fabric';
import { toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';

export const useQuoteElement = () => {
  const { canvasJS } = useAppSelector(state => state.canvas);
  const addQuotes = (canvas: fabric.Canvas | null) => {
    let text = new fabric.Textbox('❝Click to add a quote❞', {
      left: 290,
      top: 170,
      width: 300,
      height: 40,
      fill: 'black',
      fontSize: 28,
      // hasRotatingPoint: false,
      selectable: true,
      name: QUOTE_TEXT,
      cursorColor: theme.colorSchemes.light.palette.primary.main,
      splitByGrapheme : true
    });

    let authorText = new fabric.Textbox('- Author Name', {
      left: 290,
      top: 130,
      width: 200,
      height: 20,
      fill: 'black',
      fontSize: 18,
      name: QUOTE_AUTHOR,
    });

    const mainListContainer = new fabric.Rect({
      width: 150,
      height: 190,
      fill: 'transparent',
      strokeWidth: 1,
      stroke: '#cbcbcb',
      name: QUOTE_IMG_CONTAINER,
      rx:5,
    });

    const addImage = new fabric.Text('Double tap to + Image \n       (Optional)', {
      top: mainListContainer.top! + 80,
      left: mainListContainer.left! + 28,
      fill: 'black',
      fontSize: 12,
      hasControls: false,
      selectable: false,
      hoverCursor: 'pointer',
      name: QUOTE_ADD_IMG_TEXT,
    });
    let group = new fabric.Group([mainListContainer, addImage], {
      left: 110,
      top: 120,
      name: QUOTE_IMG,
    });

    let QuoteContainer = new fabric.Rect({
      fill: 'transparent',
      strokeWidth: 1,
      name: `${QUOTE}_`,
      rx: 5,
      left: 110,
      top: 120,
      width: 600,
      height : 200,
    });

    // let QuoteEntireGroup = new fabric.Group([QuoteContainer,group],{
    //   left: 110,
    //   top: 120,
    // })

    canvas?.add(QuoteContainer, group);
    canvas?.add(text);
    canvas?.add(authorText);
    canvas?.renderAll()
  };



  const addQuoteImage = (canvas: fabric.Canvas, object: fabric.Object) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.click();
    let file;
    let reader = new FileReader();
    fileInput.addEventListener('change', async (e) => {
      file = (e.target as HTMLInputElement)?.files?.[0];
      if (file) {
        const options = {
          maxSizeMB: 1,          
          maxWidthOrHeight: 800, 
          useWebWorker: true,    
        };

        let TextElement = (object as fabric.Group)._objects[1];
        (TextElement as fabric.Text).set({
           text : 'Please wait \nadding image...'
        }).setCoords()
        canvas.renderAll()

        try {
          
          // const fileSizeInMB = file.size / (1024 * 1024); 
          // if (fileSizeInMB > 25) {
          //   toast.warn('The image size exceeds 25 MB. Please choose a smaller image.', {
          //     position: "top-center",
          //     autoClose: 2000,
          //     hideProgressBar: true,
          //     closeOnClick: true,
          //     pauseOnHover: true,
          //     draggable: true,
          //     progress: undefined,
          //     theme: "light",
          //     });
          //   fileInput.value = ''; 
          //   return;
          // }
          
          const compressedFile = await imageCompression(file, options);
          addQuoteImageForStore({canvasId : canvasJS.id, file : compressedFile, path : ''});
          reader.onload = () => {
            if (canvas) {
              fabric.Image.fromURL(reader.result as string, img => {
                const fixedWidth = 147; 
                const fixedHeight = 170; 
                // img.scaleToWidth(fixedWidth);
                // img.scaleToHeight(fixedHeight);
                const scaleX = fixedWidth / img.width!;
                const scaleY = fixedHeight / img.height!;
                let container = (object as fabric.Group)._objects[1];
                let TextElement = (object as fabric.Group)._objects[1];
                // (object as fabric.Group).removeWithUpdate(TextElement);
                (object as fabric.Group).set({
                  name: `${QUOTE_IMG}_`,
                });
                img.set({
                  left: object && object.left !== undefined ? object.left + 2 : 0,
                  top: object && object.top !== undefined ? object.top + 2 : 0,
                  name: 'QuoteImage',
                  scaleX,
                  scaleY,
                });
                object && (object as fabric.Group).addWithUpdate(img);
                object && canvas.sendBackwards(object);
                object?.setCoords();
              });
            }
          };
          reader.readAsDataURL(compressedFile);
        } catch (error) {
          console.error('Error compressing image:', error);
        }
      }
    });
  };
  return { addQuotes, addQuoteImage };
};
