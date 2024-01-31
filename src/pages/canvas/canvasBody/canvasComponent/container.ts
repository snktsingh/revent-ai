import { CYCLE_TEXT, PYRAMID_TEXT } from '@/constants/elementNames';
import { APIRequest, ApiElement, DataRequest } from '@/interface/storeTypes';
import { setRequestData } from '@/redux/reducers/apiData';
import { updateCanvasInList } from '@/redux/reducers/canvas';
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


  const getOrCreateElement = (shape: string, title: string, outputFormat : APIRequest)  => {
    const existingElement = outputFormat.elements.find(
      (element: any) => element.shape === shape && element.title === title
    );

    if (existingElement) {
      return existingElement;
    } else {
      const newElement : ApiElement = {
        shape,
        title,
        subTitle: '',
        templateName: '',
        data: [] as DataRequest[],
        
      };
      outputFormat.elements.push(newElement);
      return newElement;
    }
  };

  function getElementsData(canvasData: any[]) {
    const outputFormat: APIRequest = {
      companyName: 'Any Sample Name',
      themeColor: '#E54B4B',
      imagesCount: '',
      elements: [],
    };
    canvasData.forEach(canvasObject => {
      if (canvasObject.type === 'textbox' && canvasObject.name) {

        const elementID = canvasObject.name.split('_')[1];
        
        if(canvasObject.name.startsWith('FunnelText_')){
          const funnelElement = getOrCreateElement('Funnel', elementID, outputFormat);
          funnelElement.data.push({
            name: canvasObject.text,
            heading: '', 
            subHeading: '', 
            text: canvasObject.text,
          });
        };

        if(canvasObject.name.startsWith(PYRAMID_TEXT)){
          const PyramidElement = getOrCreateElement('Pyramid', elementID, outputFormat);
          PyramidElement.data.push({
            name: canvasObject.text,
            heading: '', 
            subHeading: '', 
            text: canvasObject.text,
          });
        };

        if(canvasObject.name.startsWith(CYCLE_TEXT)){
          const cycleElement = getOrCreateElement('Cycle', elementID, outputFormat);
          cycleElement.data.push({
            name: canvasObject.text,
            heading: '', 
            subHeading: '', 
            text: canvasObject.text,
          });
        };

      };


    });

    console.log({outputFormat});
    dispatch(setRequestData(outputFormat))
    
  }

  return {
    handleAllElements,
    updateCanvasDimensions,
    updateCanvasSlideData,
    getElementsData,
    customFabricProperties,
  };
};
