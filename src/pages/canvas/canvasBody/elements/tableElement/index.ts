import { TABLE, TABLE_CELL, TABLE_TEXT } from '@/constants/elementNames';
import { theme } from '@/constants/theme';
import AutoResizingTextbox from '@/utils/fabric-utils/AutoResizingTextbox';
import { fabric } from 'fabric';

export const useTableElement = () => {
  //adding Rows
  const addTableRow = (canvas: fabric.Canvas | null) => {
    if (!canvas) return [];

    const activeObject = canvas.getActiveObject();
    if (!activeObject || !(activeObject instanceof fabric.Group)) return;

    const lastTextBox = canvas.getObjects().reduce((acc, obj) => {
      if (obj.name && obj.name.startsWith(`${TABLE_TEXT}_`)) {
        acc = obj;
      }
      return acc;
    }, null as fabric.Object | null);
    const [_, row, col] = (lastTextBox?.name || '').split('_');
    if (!lastTextBox) {
      console.error('Last text box not found');
      return;
    }
    if (activeObject?.type == 'group' && activeObject.name?.startsWith(TABLE)) {
      for (let i = 1; i <= Number(col); i++) {
        const cell = new fabric.Rect({
          width: 150,
          height: 50,
          fill: 'transparent',
          stroke: 'black',
          left: activeObject?.left! + i * 150 - 150,
          top: activeObject?.top! + Number(row) * 50,
          selectable: false,
          hasBorders: false,
          name: `${TABLE_CELL}_${Number(row) + 1}_${i}`,
        });

        const text = new AutoResizingTextbox(``, {
          width: 150 - 5,
          height: 50,
          fontSize: 28,
          textAlign: 'center',
          left: cell.left! + 2,
          top: cell.top! + 6,
          selectable: true,
          backgroundColor: theme.colorSchemes.light.palette.common.white,
          name: `${TABLE_TEXT}_${Number(row) + 1}_${i}`,
          fixedWidth: 150 - 6,
          fixedHeight: 50 - 6,
          lockMovementX: true,
          lockMovementY: true,
          hasControls: false,
          borderColor: 'transparent',
          transparentCorners: true,
        });

        activeObject.addWithUpdate(cell);
        canvas.add(text);
      }
      canvas.renderAll();
    }
  };
  //adding Columns
  const addTableColumn = (canvas: fabric.Canvas | null) => {
    if (!canvas) return [];
    const activeObject = canvas.getActiveObject();
    if (!activeObject || !(activeObject instanceof fabric.Group)) return;

    const lastTextBox = canvas.getObjects().reduce((acc, obj) => {
      if (obj.name && obj.name.startsWith(`${TABLE_TEXT}_`)) {
        acc = obj;
      }
      return acc;
    }, null as fabric.Object | null);
    const [_, row, col] = (lastTextBox?.name || '').split('_');
    if (!lastTextBox) {
      console.error('Last text box not found');
      return;
    }
    if (activeObject?.type == 'group' && activeObject.name?.startsWith(TABLE)) {
      for (let i = 1; i <= Number(row); i++) {
        const cell = new fabric.Rect({
          width: 150,
          height: 50,
          fill: 'transparent',
          stroke: 'black',
          left: lastTextBox?.left! + 148.4,
          top: activeObject?.top! + i * 50 - 50,
          selectable: false,
          hasBorders: false,
          name: `${TABLE_CELL}_${i}_${Number(row) + 1}`,
        });

        const text = new AutoResizingTextbox(``, {
          width: 150 - 5,
          height: 50,
          fontSize: 28,
          textAlign: 'center',
          left: cell.left! + 2,
          top: cell.top! + 6,
          selectable: true,
          backgroundColor: theme.colorSchemes.light.palette.common.white,
          name: `${TABLE_TEXT}_${i}_${Number(col) + 1}`,
          fixedWidth: 150 - 6,
          fixedHeight: 50 - 6,
          lockMovementX: true,
          lockMovementY: true,
          hasControls: false,
          borderColor: 'transparent',
          transparentCorners: true,
        });

        activeObject.addWithUpdate(cell);
        canvas.add(text);
      }
      canvas.renderAll();
    }
  };
  //add new table
  const addTable = (canvas: fabric.Canvas | null) => {
    const cellPadding = 6;
    const tableLeft = 50;
    const tableTop = 50;
    const cellWidth: number = 150;
    const cellHeight: number = 50;
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
            name: `${TABLE_CELL}_${i + 1}_${j + 1}`,
          });

          const text = new AutoResizingTextbox(``, {
            width: cellWidth - 5,
            height: cellHeight,
            fontSize: 28,
            textAlign: 'center',
            left: cell.left! + 2,
            top: cell.top! + cellPadding,
            selectable: true,
            backgroundColor: theme.colorSchemes.light.palette.common.white,
            name: `${TABLE_TEXT}_${i + 1}_${j + 1}`,
            fixedWidth: cellWidth - cellPadding,
            fixedHeight: cellHeight - cellPadding,
            lockMovementX: true,
            lockMovementY: true,
            hasControls: false,
            borderColor: 'transparent',
            transparentCorners: true,
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
        name: `${TABLE}_`,
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

  const removeTableRow = (canvas: fabric.Canvas | null) => {
    if (!canvas) return [];
    const activeObject = canvas.getActiveObject();
    if (!activeObject || !(activeObject instanceof fabric.Group)) return;

    const lastTextBox = canvas.getObjects().reduce((acc, obj) => {
      if (obj.name && obj.name.startsWith(`${TABLE_TEXT}_`)) {
        acc = obj;
      }
      return acc;
    }, null as fabric.Object | null);
    const [_, row, col] = (lastTextBox?.name || '').split('_');
    if (!lastTextBox) {
      console.error('Last text box not found');
      return;
    }

    canvas.getObjects().forEach(obj => {
      if (obj.name && obj.name.startsWith(`${TABLE_TEXT}_${row}`)) {
        canvas.remove(obj);
      }
    });

    activeObject.forEachObject(obj => {
      if (obj.name && obj.name.startsWith(`${TABLE_CELL}_${row}`)) {
        activeObject.removeWithUpdate(obj);
      }
    });

    canvas.renderAll();
  };

  const removeTableColumn = (canvas: fabric.Canvas | null) => {
    if (!canvas) return [];
    const activeObject = canvas.getActiveObject();
    if (!activeObject || !(activeObject instanceof fabric.Group)) return;

    const lastTextBox = canvas.getObjects().reduce((acc, obj) => {
      if (obj.name && obj.name.startsWith(`${TABLE_TEXT}_`)) {
        acc = obj;
      }
      return acc;
    }, null as fabric.Object | null);
    const [_, row, col] = (lastTextBox?.name || '').split('_');
    if (!lastTextBox) {
      console.error('Last text box not found');
      return;
    }

    canvas.getObjects().forEach(obj => {
      if (obj.name && obj.name.startsWith(`${TABLE_TEXT}_`)) {
        const [_, i, j] = (obj?.name || '').split('_');
        if(j == col){
          canvas.remove(obj);
        }
      }
    });

    activeObject.forEachObject(obj => {
      if (obj.name && obj.name.startsWith(`${TABLE_CELL}_`)) {
        const [_, i, j] = (obj?.name || '').split('_');
        if(j == col){
          activeObject.removeWithUpdate(obj);
        }
      }
    });

    canvas.renderAll();
  };

  return {
    addTable,
    addTableRow,
    addTableColumn,
    removeTableColumn,
    removeTableRow,
  };
};
