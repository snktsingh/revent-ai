import {
  CLIENT_LIST_MAIN,
  CLIENT_LIST_CONTAINER,
  CLIENT_LIST_IMG,
  CLIENT_LIST_TEXT,
} from '@/constants/elementNames';
import { addOrReplaceClientListImage, clientListImages } from '@/data/data';
import { updateClientListId } from '@/redux/reducers/fabricElements';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fabric } from 'fabric';
import { toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';
import { customStyles } from '@/constants/theme';

export function useClientListElement() {
  const dispatch = useAppDispatch();
  const { canvasList, canvasJS } = useAppSelector(state => state.canvas);
  const { clientListId } = useAppSelector(state => state.elementsIds);

  const addClientListElement = (
    canvas: fabric.Canvas | null,
    left: number,
    top: number, 
    id? : number
  ) => {
    const mainListContainer = new fabric.Rect({
      width: 140,
      height: 80,
      fill: 'transparent',
      strokeWidth: 1,
      stroke: '#cbcbcb',
      name: id? `${CLIENT_LIST_MAIN}_${id}` : `${CLIENT_LIST_MAIN}_${clientListId}`,
    });

    const addImage = new fabric.Text('Double tap to \n  + Image', {
      top: mainListContainer.top! + 25,
      left: mainListContainer.left! + 33,
      fill: 'black',
      fontSize: 14,
      hasControls: false,
      selectable: false,
      hoverCursor: 'pointer',
      name: 'ListAddImageText',
      fontFamily : customStyles.fonts.robotoSansSerif,
    });
    let group = new fabric.Group([mainListContainer, addImage], {
      left,
      top,
      name: id? `${CLIENT_LIST_MAIN}_${id}` : `${CLIENT_LIST_MAIN}_${clientListId}`,
      moveCursor: 'pointer',
    });
    dispatch(updateClientListId());
    canvas?.add(group);
    canvas?.discardActiveObject();
    canvas?.renderAll();
  };

  const addClientImage = (canvas: fabric.Canvas, object: fabric.Object) => {
    const objectName = object.name?.split('_');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.jpeg, .jpg, .png, .svg';
    fileInput.click();
    let file: any;
    let reader = new FileReader();
    fileInput.addEventListener('change', async e => {
      file = (e.target as HTMLInputElement)?.files?.[0];

      if (file) {

        const options = {
          maxSizeMB: 1,          
          maxWidthOrHeight: 800, 
          useWebWorker: true,    
        };

        try {
          const [_, id] = object.name?.split('_') ?? [];
          const compressedFile = await imageCompression(file, options);
          const fileSizeInMB = file.size / (1024 * 1024);
          if (fileSizeInMB > 25) {
            toast.warn(
              'The image size exceeds 25 MB. Please choose a smaller image.',
              {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
              }
            );
            fileInput.value = '';
            return;
          }
          addOrReplaceClientListImage(canvasJS.id, +id, compressedFile);
          reader.onload = () => {
            if (canvas) {
              fabric.Image.fromURL(reader.result as string, img => {
                const fixedWidth = 120;
                const fixedHeight = 80;
                // img.scaleToWidth(fixedWidth);
                // img.scaleToHeight(fixedHeight);
                const scaleX = fixedWidth / img.width!;
                const scaleY = fixedHeight / img.height!;
                let container = (object as fabric.Group)._objects[1];
                let TextElement = (object as fabric.Group)._objects[1];
                (object as fabric.Group).removeWithUpdate(TextElement);
                (object as fabric.Group).set({
                  name: object.name,
                });
                img.set({
                  left:
                    object && object.left !== undefined ? object.left + 2 : 0,
                  top: object && object.top !== undefined ? object.top + 2 : 0,
                  name: object.name,
                  scaleX,
                  scaleY,
                });
                object && (object as fabric.Group).addWithUpdate(img);
                object && canvas.sendBackwards(object);
                object?.setCoords();
                canvas.discardActiveObject();
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
  return { addClientListElement, addClientImage };
}
