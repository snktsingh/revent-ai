import { IMAGE } from '@/constants/elementNames';
import { Images, addOrReplaceImage } from '@/data/data';
import { updateImageId } from '@/redux/reducers/fabricElements';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import imageCompression from 'browser-image-compression';
import { fabric } from 'fabric';
import { toast } from 'react-toastify';
export function useImageElement() {
  const { canvasJS } = useAppSelector(state => state.canvas);
  const { imageId } = useAppSelector(state => state.elementsIds);
  const dispatch = useAppDispatch();
  const imageUploader = (canvas: fabric.Canvas | null, existingImage? : fabric.Object) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.jpeg, .jpg, .png, .svg';
    fileInput.click();

    fileInput.addEventListener('change', async (e) => {
      let reader = new FileReader();
      const file = (e.target as HTMLInputElement)?.files?.[0];
      if (file) {

        const options = {
          maxSizeMB: 1,          
          maxWidthOrHeight: 800, 
          useWebWorker: true,    
        };
  
        try {
          const compressedFile = await imageCompression(file, options);
          
          const compressedImageUrl = URL.createObjectURL(compressedFile);
          const fileSizeInMB = compressedFile.size / (1024 * 1024);
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
          const id = existingImage?.name ? existingImage.name.split('_')[1] : imageId;

          addOrReplaceImage(canvasJS.id, +id, compressedFile);
  
          reader.onload = () => {
            if (canvas) {
              fabric.Image.fromURL(reader.result as string, img => {
                const scaleFactor = 0.15; 
  
                const scaledWidth = img.width! * scaleFactor;
                const scaledHeight = img.height! * scaleFactor;
                img.set({
                  left: existingImage ? existingImage.left : 5,
                  top: existingImage ? existingImage.top : 5,
                  scaleX: scaledWidth / img.width!,
                  scaleY: scaledHeight / img.height!,
                  name: existingImage?.name ? existingImage.name : `${IMAGE}_${imageId}`,
                });
  
                canvas?.add(img);
                if(existingImage){
                  canvas.remove(existingImage);
                }
                canvas?.renderAll();
              });
            }
          };
          reader.readAsDataURL(compressedFile);
          if(!existingImage) {
            dispatch(updateImageId());
          }
        } catch (error) {
          console.error('Error compressing image:', error);
        }

      }
    });
  };
  return { imageUploader };
}
