import { fabric } from "fabric";
export function useImageElement(){
    const imageUploader = (canvas: fabric.Canvas | null) => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/**';
        fileInput.click();
    
        fileInput.addEventListener('change', e => {
          let reader = new FileReader();
          const file = (e.target as HTMLInputElement)?.files?.[0];
          if (file) {
            reader.onload = () => {
              if (canvas) {
                fabric.Image.fromURL(reader.result as string, img => {
                  img.set({
                    left: 5,
                    top: 5,
                    scaleX: 0.2,
                    scaleY: 0.2,
                    name: 'image',
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