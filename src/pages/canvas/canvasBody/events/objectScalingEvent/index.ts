import { FabricObject } from "@/interface/fabricTypes";

export function useObjectScalingEvent(){
    const handleObjectScaling = (
        options: fabric.IEvent<MouseEvent>,
        canvas: fabric.Canvas
    ) => {
        const scaledObject = options.target as FabricObject | undefined;
        const objectName = scaledObject?.name?.split('_');
        const objectID = objectName && objectName[1];
        if (scaledObject && objectName) {
            scaledObject.setCoords();

            // Get the scale factors
            const scaleX = scaledObject.scaleX || 1;
            const scaleY = scaledObject.scaleY || 1;

            // Scale child elements
            canvas.forEachObject(function (obj) {
                let left;
                let top;
                // Check if the object is a child of the scaled object
                if (
                    obj.name &&
                    obj.name.startsWith(objectName[0]) &&
                    obj.name.split('_')[1] === objectID &&
                    obj !== scaledObject && obj.scaleX && obj.scaleY && obj.left && obj.top
                ) {
                    console.log(obj.name)
                    obj.set({
                        scaleX: obj.scaleX * scaleX,
                        scaleY: obj.scaleY * scaleY,
                        left: obj.left * scaleX,
                        top: obj.top * scaleY,
                    }).setCoords();
                }
            });

            scaledObject.set({
                scaleX: 1,
                scaleY: 1,
            });
        }
        canvas?.requestRenderAll();
    };

    return { handleObjectScaling };
}
