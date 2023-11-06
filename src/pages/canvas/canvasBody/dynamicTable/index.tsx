import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

interface DynamicTableProps {
  data: any[][]; // The data for the table
}
const DynamicTable: React.FC<DynamicTableProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current);

      // Create a dynamic table
      const cellWidth = 100;
      const cellHeight = 40;

      for (let row = 0; row < data.length; row++) {
        for (let col = 0; col < data[row].length; col++) {
          const cell = new fabric.Rect({
            left: col * cellWidth,
            top: row * cellHeight,
            width: cellWidth,
            height: cellHeight,
            fill: 'white',
            stroke: 'black',
          });

          const text = new fabric.Text(data[row][col], {
            left: col * cellWidth + cellWidth / 2,
            top: row * cellHeight + cellHeight / 2,
            originX: 'center',
            originY: 'center',
          });

          const group = new fabric.Group([cell, text], {
            selectable: false,
          });

          canvas.add(group);
        }
      }

      canvas.renderAll();
    }
  }, [data]);
  return <canvas ref={canvasRef} />;
};

export default DynamicTable;
