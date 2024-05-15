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
export const useQuoteElement = () => {
  const { canvasJS } = useAppSelector(state => state.canvas);
  const addQuotes = (canvas: fabric.Canvas | null) => {
    let text = new fabric.Textbox('❝Click to add a quote❞', {
      left: 360,
      top: 180,
      width: 300,
      height: 40,
      fill: 'black',
      fontSize: 28,
      hasRotatingPoint: false,
      selectable: true,
      name: QUOTE_TEXT,
      cursorColor: theme.colorSchemes.light.palette.primary.main,
    });

    let authorText = new fabric.Textbox('- Author Name', {
      left: 500,
      top: 230,
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

    const addImage = new fabric.Text('+ Add Image (Optional)', {
      top: mainListContainer.top! + 80,
      left: mainListContainer.left! + 30,
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

    canvas?.add(QuoteContainer, group, text, authorText,);
  };



  const addQuoteImage = (canvas: fabric.Canvas, object: fabric.Object) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.click();
    let file;
    let reader = new FileReader();
    fileInput.addEventListener('change', e => {
      file = (e.target as HTMLInputElement)?.files?.[0];
      if (file) {
        const fileSizeInMB = file.size / (1024 * 1024); 
        if (fileSizeInMB > 25) {
          toast.warn('The image size exceeds 25 MB. Please choose a smaller image.', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          fileInput.value = ''; 
          return;
        }
        addQuoteImageForStore({canvasId : canvasJS.id, file, path : ''});

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
              (object as fabric.Group).removeWithUpdate(TextElement);
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
        reader.readAsDataURL(file);
      }
    });
  };
  return { addQuotes, addQuoteImage };
};
