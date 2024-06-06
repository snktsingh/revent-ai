import { IMAGE } from '@/constants/elementNames';
import { Images, addImages } from '@/data/data';
import { useAppSelector } from '@/redux/store';
import imageCompression from 'browser-image-compression';
import { fabric } from 'fabric';
import { toast } from 'react-toastify';
export function useImageElement() {
  const { canvasJS } = useAppSelector(state => state.canvas);
  const imageUploader = (canvas: fabric.Canvas | null, existingImage? : fabric.Object) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
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
  
          addImages({ canvasId: canvasJS.id, file : compressedFile, path: '' });
  
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
                  name: IMAGE,
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
        } catch (error) {
          console.error('Error compressing image:', error);
        }

      }
    });
  };
  return { imageUploader };
}
