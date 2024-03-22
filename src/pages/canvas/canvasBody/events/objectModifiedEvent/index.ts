import { PYRAMID_TEXT } from '@/constants/elementNames';

const useObjectModified = () => {
  function setElementPositionsAfterMoving(
    movedObject: fabric.Object,
    canvas: fabric.Canvas
  ) {
    const objectName = movedObject?.name?.split('_');
    const objectID = objectName && objectName[1];
    let PyramidTop = movedObject.top || 0;
    let isFirstTextBox = true;

    // canvas.forEachObject(function (obj, i) {
    //   if (obj.name === `${PYRAMID_TEXT}_${objectID}`) {
    //     obj
    //       .set({
    //         left: movedObject.left! + movedObject.width! / 2.6,
    //         top: isFirstTextBox ? PyramidTop + 100 : PyramidTop + 70,
    //       })
    //       .setCoords();
    //     if (isFirstTextBox) {
    //       isFirstTextBox = false; 
    //       PyramidTop += 100;
    //     } else {
    //       PyramidTop += 70;
    //     }
    //   }
    // });
  }

  return { setElementPositionsAfterMoving };
};

export default useObjectModified;
