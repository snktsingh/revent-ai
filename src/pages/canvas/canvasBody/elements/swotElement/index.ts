import { SWOT, SWOT_BOX, SWOT_TEXT } from '@/constants/elementNames';
import { SWOTIcon } from '@/constants/media';
import { customStyles, theme } from '@/constants/theme';
import { IExtendedRectOptions } from '@/interface/fabricTypes';
import { updateSwotId } from '@/redux/reducers/fabricElements';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import AutoResizingTextbox from '@/utils/fabric-utils/AutoResizingTextbox';
import { fabric } from 'fabric';
export function useSWOTElement() {
  const { swotID } = useAppSelector(state => state.elementsIds);
  const dispatch = useAppDispatch();

  // adding New SWOT
  const addNewSWOTElement = (canvas: fabric.Canvas) => {
    function addRectangle(
      left: number,
      top: number,
      width: number,
      height: number,
      level: number
    ) {
      let rect = new fabric.Rect({
        left: left,
        top: top,
        width,
        height,
        fill: customStyles.elementColors.duskyBlue,
        rx: 10,
        ry: 10,
        name: `${SWOT_BOX}_${swotID}`,
        level: `${SWOT_BOX}_${swotID}_${level}`,
      } as IExtendedRectOptions);
      canvas?.add(rect);
      return rect;
    }

    function addText(left: number, top: number, level: number) {
      const text = new AutoResizingTextbox('Add Text', {
        fontSize: 15,
        left,
        top,
        fill: theme.colorSchemes.light.palette.common.white,
        width: 170,
        name: `${SWOT_TEXT}_${swotID}`,
        fixedWidth: 170,
        fixedHeight: 125,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        hasBorders: false,
        splitByGrapheme: true,
        level: `${SWOT_TEXT}_${swotID}_${level}`,
      });
      return canvas?.add(text);
    }

    const SWOTMainContainer = new fabric.Rect({
      left: 92,
      top: 100,
      width: 650,
      height: 310,
      name: `${SWOT}_${swotID}`,
      fill: 'transparent',
      strokeWidth: 1,
      stroke: 'transparent',
    });

    fabric.loadSVGFromURL(SWOTIcon, (objects, options) => {
      const svg = fabric.util.groupSVGElements(objects, options);
      console.log({ objects });

      svg.set({
        left: 290,
        top: 135,
        scaleX: 0.5,
        scaleY: 0.5,
        name: `${SWOTIcon}_${swotID}`,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        hasBorders: false,
      });

      canvas.add(svg);
      const rect1 = addRectangle(96, 105, 170, 130, 1);
      const rect2 = addRectangle(566, 105, 170, 130, 2);
      const rect3 = addRectangle(96, 275, 170, 130, 3);
      const rect4 = addRectangle(566, 275, 170, 130, 4);
      canvas.add(SWOTMainContainer);
      addText(rect1.left! + 2, rect1.top! + 2, 1);
      addText(rect2.left! + 2, rect2.top! + 2, 1);
      addText(rect3.left! + 2, rect3.top! + 2, 1);
      addText(rect4.left! + 2, rect4.top! + 2, 1);
      canvas.renderAll();
      dispatch(updateSwotId());
    });
  };

  return {
    addNewSWOTElement,
  };
}
