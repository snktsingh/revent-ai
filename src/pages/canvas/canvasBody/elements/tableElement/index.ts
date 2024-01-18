import { theme } from "@/constants/theme";
import { fabric } from "fabric";

export const useTableElement = ()=> {

    const addTable = (
        rows: number,
        cols: number,
        cellWidth: number,
        cellHeight: number,
        canvas: fabric.Canvas | null
      ) => {
        const cellPadding = 6;
        const tableLeft = 50;
        const tableTop = 50;
    
        function createTable() {
          const tableElements = [];
          const texts = [];
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
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
    
              const text = new fabric.Textbox(`Row ${i + 1}, Col ${j + 1}`, {
                width: cellWidth - 2 * cellPadding,
                height: cellHeight - 2 * cellPadding,
                fontSize: 18,
                textAlign: 'center',
                left: cell.left! + cellPadding,
                top: cell.top! + cellPadding,
                selectable: true,
                backgroundColor: theme.colorSchemes.light.palette.common.white,
                name: 'Table_Text',
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
            name: 'Table_Container',
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