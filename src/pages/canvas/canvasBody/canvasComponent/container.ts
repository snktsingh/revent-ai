import {
  CYCLE_TEXT,
  FUNNEL_TEXT,
  PARAGRAPH,
  PROCESS_TEXT,
  PYRAMID_TEXT,
  SUBTITLE,
  TIMELINE_HEADING,
  TIMELINE_TEXT,
  TITLE,
} from '@/constants/elementNames';
import { TimelineDataType } from '@/interface/elDataTypes';
import {
  APIRequest,
  DataRequestType,
  ReqElementType,
} from '@/interface/storeTypes';
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

  const getOrCreateElement = (
    shape: string,
    elementId: string,
    outputFormat: APIRequest
  ) => {
    const existingElement = outputFormat.elements.find(
      (element: any) =>
        element.shape === shape && element.elementId === elementId
    );

    if (existingElement) {
      return existingElement;
    } else {
      const newElement: ReqElementType = {
        shape,
        title: '',
        subTitle: '',
        templateName: '',
        elementId,
        data: [],
      };
      outputFormat.elements.push(newElement);
      return newElement;
    }
  };

  function getElementsData(canvasData: any[]) {
    const outputFormat: APIRequest = {
      companyName: 'Trident',
      themeColor: '#E54B4B',
      imagesCount: '',
      elements: [],
    };
    let timelineData: TimelineDataType[] = [];
    canvasData.forEach(canvasObject => {
      if (canvasObject.type === 'textbox' && canvasObject.name) {
        const elementID = canvasObject.name.split('_')[1];
        let elementType: string | null = null;

        switch (true) {
          case canvasObject.name.startsWith(FUNNEL_TEXT):
            elementType = 'Funnel';
            break;

          case canvasObject.name.startsWith(PYRAMID_TEXT):
            elementType = 'Pyramid';
            break;

          case canvasObject.name.startsWith(CYCLE_TEXT):
            elementType = 'Cycle';
            break;

          case canvasObject.name.startsWith(PROCESS_TEXT):
            elementType = 'Process';
            break;
        }

        if (elementType) {
          const element = getOrCreateElement(
            elementType,
            elementID,
            outputFormat
          );
          element.data.push({
            name: canvasObject.text,
            heading: '',
            subHeading: '',
            text: canvasObject.text,
          });
        } else if (
          canvasObject.name.startsWith(TIMELINE_TEXT) ||
          canvasObject.name.startsWith(TIMELINE_HEADING)
        ) {
          timelineData.push({ content: canvasObject.text, id: elementID });
        } else if (
          canvasObject.name === TITLE ||
          canvasObject.name === SUBTITLE
        ) {
          const titleData = getOrCreateElement('theme', '1', outputFormat);
          titleData[canvasObject.name === 'title' ? 'title' : 'subTitle'] =
            canvasObject.text;
        } else if (canvasObject.name === PARAGRAPH) {
          const paragraphData = getOrCreateElement(
            'Paragraph',
            '1',
            outputFormat
          );
          paragraphData.data.push({
            name: canvasObject.text,
            heading: '',
            subHeading: '',
            text: canvasObject.text,
          });
        }
      }
    });

    type OrganizedTimelineData = Record<string, DataRequestType[]>;

    const organizedTimelineData: OrganizedTimelineData = {};

    timelineData.forEach((item, index) => {
      const id = item.id;
      const timelineArray =
        organizedTimelineData[id] || (organizedTimelineData[id] = []);

      if (index % 2 === 0) {
        timelineArray.push({
          heading: item.content,
          text: '',
          name: '',
          subHeading: '',
        });
      } else {
        const lastTimeline = timelineArray[timelineArray.length - 1];
        lastTimeline && (lastTimeline.text = item.content);
      }
    });

    Object.entries(organizedTimelineData).forEach(([id, content]) => {
      getOrCreateElement('Timeline', id, outputFormat).data = content;
    });

    const modifiedRequestFormat = outputFormat.elements.map(element => {
      const { elementId, ...rest } = element;
      return rest;
    });
    outputFormat.elements = modifiedRequestFormat;

    console.log({ outputFormat });
    dispatch(setRequestData(outputFormat));
  }

  return {
    handleAllElements,
    updateCanvasDimensions,
    updateCanvasSlideData,
    getElementsData,
    customFabricProperties,
  };
};
