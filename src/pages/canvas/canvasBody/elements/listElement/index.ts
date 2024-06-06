import {
  LIST_MAIN,
  LIST_CONTAINER,
  LIST_IMG,
  LIST_TEXT,
} from '@/constants/elementNames';
import { addListImages, listImages } from '@/data/data';
import { CanvasItem, listObjType } from '@/interface/storeTypes';
import {
  updateCurrentCanvas,
  updateListImagesWithCanvasId,
} from '@/redux/reducers/canvas';
import { updateListId } from '@/redux/reducers/fabricElements';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import AutoResizingTextbox from '@/utils/fabric-utils/AutoResizingTextbox';
import imageCompression from 'browser-image-compression';

import { fabric } from 'fabric';
import { toast } from 'react-toastify';

export function useListElement() {
  const dispatch = useAppDispatch();
  const { canvasList, canvasJS } = useAppSelector(state => state.canvas);
  const { listID } = useAppSelector(state => state.elementsIds);

  const addListElement = (
    canvas: fabric.Canvas | null,
    left: number,
    top: number
  ) => {
    const mainListContainer = new fabric.Rect({
      width: 120,
      height: 170,
      fill: 'transparent',
      strokeWidth: 1,
      stroke: '#cbcbcb',
      name: `${LIST_CONTAINER}_${listID}`,
    });

    const addImage = new fabric.Text('Double tap to \n  + Image', {
      top: mainListContainer.top! + 72,
      left: mainListContainer.left! + 28,
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
      name: `${LIST_MAIN}_${listID}`,
      moveCursor: 'pointer',
    });

    const text = new AutoResizingTextbox('Add Text', {
      fontSize: 18,
      width: 120,
      height: 100,
      fixedWidth: 145,
      fixedHeight: 100,
      fill: 'black',
      left: left + 2,
      top: top + 149,
      textAlign: 'center',
      name: `${LIST_TEXT}_${listID}`,
      hasControls: false,
    });
    dispatch(updateListId());
    // canvas?.add(mainListContainer);
    // canvas?.add(addImage);
    canvas?.add(group);
    canvas?.add(text);
    canvas?.discardActiveObject();
    canvas?.renderAll();
  };

  const addImage = (canvas: fabric.Canvas, object: fabric.Object) => {
    const objectName = object.name?.split('_');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.jpeg, .jpg, .png, .svg';
    fileInput.click();
    let file: any;
    let reader = new FileReader();
    fileInput.addEventListener('change', async (e) => {
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
        const options = {
          maxSizeMB: 1,          
          maxWidthOrHeight: 800, 
          useWebWorker: true,    
        };
  
        try {
          const compressedFile = await imageCompression(file, options);
          addListImages({ canvasId : canvasJS.id, file : compressedFile, path : '' });

        reader.onload = () => {
          if (canvas) {
            fabric.Image.fromURL(reader.result as string, img => {
              const fixedWidth = 120;
              const fixedHeight = 150;
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
                left: object && object.left !== undefined ? object.left + 2 : 0,
                top: object && object.top !== undefined ? object.top + 2 : 0,
                name: object.name,
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
  return { addListElement, addImage };
}
