import { IMAGE } from '@/constants/elementNames';
import { Images, addImages } from '@/data/data';
import { useAppSelector } from '@/redux/store';
import { fabric } from 'fabric';
export function useImageElement() {
  const { canvasJS } = useAppSelector(state => state.canvas);
  const imageUploader = (canvas: fabric.Canvas | null) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/**';
    fileInput.click();

    fileInput.addEventListener('change', e => {
      let reader = new FileReader();
      const file = (e.target as HTMLInputElement)?.files?.[0];
      if (file) {
        addImages({ canvasId: canvasJS.id, file, path: '' });

        reader.onload = () => {
          if (canvas) {
            fabric.Image.fromURL(reader.result as string, img => {
              img.set({
                left: 5,
                top: 5,
                scaleX: 0.2,
                scaleY: 0.2,
                name: IMAGE,
              });

              canvas?.add(img);
              canvas?.renderAll();
            });
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };
  return { imageUploader };
}
