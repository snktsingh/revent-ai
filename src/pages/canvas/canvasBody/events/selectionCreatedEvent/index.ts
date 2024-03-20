import { handleInputSize } from "@/redux/reducers/canvas";
import { useAppDispatch } from "@/redux/store";
import { fabric } from "fabric";
export function useSelectionCreatedEvent(){

    const dispatch = useAppDispatch();

    const handleSelectionCreated = (
        canvas: fabric.Canvas,
        event: fabric.IEvent<MouseEvent>
      ) => {
        const activeObject = event.selected;
        console.log({activeObject})
        if (activeObject?.length === 1) {
          if (activeObject[0].type == 'text' || activeObject[0].type == 'textbox') {
            dispatch(handleInputSize((activeObject[0] as any)?.fontSize));
          }
        }
    
        
      };

     
      return { handleSelectionCreated };
}