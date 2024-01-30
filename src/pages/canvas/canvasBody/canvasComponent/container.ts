import { setRequestData, updateCanvasInList } from '@/redux/reducers/canvas';
import { useAppDispatch } from '@/redux/store';
import { fabric } from 'fabric';
import { useState } from 'react';

export const useCanvasComponent = () => {
  const customFabricProperties = [
    'listType',
    'listBullet',
    'listCounter',
    'name',
    'className',
  ];
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });
  const dispatch = useAppDispatch();

  const handleAllElements = (event: fabric.IEvent, canvas: fabric.Canvas) => {
    const { target } = event;

    if (!canvas || !target) return;

    // Define canvas boundaries
    const canvasWidth = canvas.width || 0;
    const canvasHeight = canvas.height || 0;

    // Prevent objects from going beyond the canvas boundaries
    target.setCoords();
    if (target.left! < 0) {
      target.left! = 0;
    } else if (target.left! + target.width! > canvasWidth) {
      target.left! = canvasWidth - target.width!;
    }

    if (target.top! < 0) {
      target.top! = 0;
    } else if (target.top! + target.height! > canvasHeight) {
      target.top! = canvasHeight - target.height!;
    }
  };

  const updateCanvasDimensions = (canvas: fabric.Canvas) => {
    const aspectRatio = 16 / 9;
    const canvasWidthPercentage = 58;
    const canvasHeightPercentage = 58 / aspectRatio;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerWidth;

    const canvasWidth = (canvasWidthPercentage / 100) * windowWidth;
    const canvasHeight = (canvasHeightPercentage / 100) * windowHeight;

    setCanvasDimensions({ width: canvasWidth, height: canvasHeight });

    if (canvas) {
      canvas.setDimensions({
        width: canvasWidth,
        height: canvasHeight,
      });
      canvas.renderAll();
    }
  };

  const updateCanvasSlideData = (canvas: fabric.Canvas, id: number) => {
    const updatedCanvas = canvas?.toObject(customFabricProperties);
    dispatch(updateCanvasInList({ id, updatedCanvas }));
  };

  function getElementsData(canvasData: any[]) {
    console.log({canvasData})
    let data: any[] = [];
    let name: string = '';
    let title: string = '';
    let subTitle: string = '';
    let timelineContent: any[] = [];
    canvasData.forEach(obj => {
      if (obj.name === 'title') {
        name = 'Cover';
        title = obj.text;
      }
      if (obj.name === 'subTitle') {
        name = 'Cover';
        subTitle = obj.text;
      }

      if (obj.name === 'pyramidTextbox') {
        name = 'Pyramid';
        data.push({ text: obj.text });
      }

      if (obj.name === 'Funnel_Text') {
        name = 'Funnel';
        data.push({ text: obj.text });
      }

      if (obj.name === 'Cycle_Text') {
        name = 'Cycle';
        data.push({ text: obj.text });
      }

      if (obj.name === 'ProcessText') {
        name = 'Process';
        data.push({ text: obj.text });
      }
      if (obj.name === 'paragraphbox') {
        name = 'Paragraph';
        data.push({ text: obj.text });
      }

      if (obj.name === 'TimeLineHeading') {
        name = 'Timeline';
        timelineContent.push(obj);
      }
      if (obj.name === 'TimeLineText') {
        name = 'Timeline';
        timelineContent.push(obj);
      }

      if (obj.name === 'bullet') {
        name = 'BulletPoint';
        let text = obj.text.split('\n');
        text.forEach((element: string) => {
          data.push({ text: element });
        });
      }
    });
    if (timelineContent.length > 0) {
      data = timelineContent.reduce((acc, obj, index, arr) => {
        if (obj.name === 'TimeLineHeading') {
          const nextObj = arr[index + 1]; // Get the next object
          if (nextObj && nextObj.name === 'TimeLineText') {
            acc.push({ heading: obj.text, text: nextObj.text });
          }
        }
        return acc;
      }, []);
    }

    dispatch(
      setRequestData({
        companyName: 'Revent',
        shape: name,
        data: data,
        title: title,
        subTitle: subTitle,
      })
    );
  }

  return {
    handleAllElements,
    updateCanvasDimensions,
    updateCanvasSlideData,
    getElementsData,
    customFabricProperties
  };
};
