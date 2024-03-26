import { PROCESS, PYRAMID, PYRAMID_TEXT } from "@/constants/elementNames";
import { FabricObject } from "@/interface/fabricTypes";

export function useObjectScalingEvent(){
    const handleObjectScaling = (
        options: fabric.IEvent<MouseEvent>,
        canvas: fabric.Canvas
    ) => {
        const scaledObject = options.target as FabricObject | undefined;
        const objectName = scaledObject?.name?.split('_')!;
        const objectID = objectName && objectName[1];
        // const scaleX = scaledObject.scaleX || 1;
        // const scaleY = scaledObject.scaleY || 1;

            // console.log({scaleX, scaleY, scaledObject})

        //     const scaleY = scaledObject.scaleY || 1;
        // if (scaledObject && objectName[0] === PYRAMID) {
        //     scaledObject.setCoords()
        //     const scaleX = scaledObject.scaleX || 1;
        //     const scaleY = scaledObject.scaleY || 1;
        //     canvas.forEachObject(function (obj) {
               
        //         if (
        //             obj.name &&
        //             obj.name === `${PYRAMID_TEXT}_${objectID}`
        //         ) {
        //             console.log(obj.name)
        //             obj.set({
        //                 scaleX: obj.scaleX * scaleX,
        //                 scaleY: obj.scaleY * scaleY,
        //             }).setCoords();
        //         }
        //     });
        // }
        canvas?.requestRenderAll();
    };

    return { handleObjectScaling };
}
