import { theme } from "@/constants/theme";
import AutoResizingTextbox from "@/utils/fabric-utils/AutoResizingTextbox";
import { fabric } from "fabric";

export const useTableElement = ()=> {

    const addTable = (
        canvas: fabric.Canvas | null
      ) => {
        const cellPadding = 6;
        const tableLeft = 50;
        const tableTop = 50;
        const cellWidth: number = 150;
        const cellHeight: number= 50;
        function createTable() {
          const tableElements = [];
          const texts = [];
          for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
              const cell = new fabric.Rect({
                width: cellWidth,
                height: cellHeight,
                fill: 'transparent',
                stroke: 'black',
                left: tableLeft + j * cellWidth,
                top: tableTop + i * cellHeight,
                selectable: false,
                hasBorders: false,
              });
    
              const text = new AutoResizingTextbox(`Add Text`, {
                width: cellWidth - 2 * cellPadding,
                height: cellHeight - 2 * cellPadding,
                fontSize: 18,
                textAlign: 'center',
                left: cell.left! + cellPadding,
                top: cell.top! + cellPadding,
                selectable: true,
                backgroundColor: theme.colorSchemes.light.palette.common.white,
                name: 'TableText_',
                fixedWidth : cellWidth- cellPadding,
                fixedHeight : cellHeight - cellPadding
              });
    
              tableElements.push(cell);
              texts?.push(text);
            }
          }
    
          const tableGroup = new fabric.Group(tableElements, {
            left: tableLeft,
            top: tableTop,
            hasBorders: true,
            hasControls: true,
            name: 'TableContainer_',
          });
    
          canvas?.add(tableGroup);
          texts.forEach(el => {
            canvas?.add(el);
            el.setControlsVisibility({
              mt: false,
              mb: false,
              ml: false,
              mr: false,
              tr: true,
              tl: true,
              br: true,
              bl: true,
              mtr: false,
            });
          });
    
          tableGroup.setControlsVisibility({
            tl: true,
            tr: true,
            bl: true,
            br: true,
            ml: false,
            mt: false,
            mr: false,
            mb: false,
            mtr: false,
          });
        }
    
        createTable();
      };

      return {addTable}
}