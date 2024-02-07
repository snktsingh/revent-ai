import {
  BULLET_POINTS,
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
import {
  BulletPointsFunctionType,
  TimelineDataType,
} from '@/interface/elDataTypes';
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
    console.log({canvasData});
    const outputFormat: APIRequest = {
      companyName: 'REVENT',
      themeColor: '#004FBA',
      imagesCount: '',
      elements: [],
    };
    let timelineData: TimelineDataType[] = [];
    let titleText : string = '';
    let subTitleText : string = '';
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
            (canvasObject.name === TITLE) ? titleText = canvasObject.text : subTitleText = canvasObject.text;
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
        } else if (canvasObject?.name === BULLET_POINTS) {
          const { mainBulletPoints, nestedBulletPoints } =
            segregateBulletPoints(canvasObject.text);
          const bulletsData = mainBulletPoints.map((text, index) => {
            const heading = '';
            // const name = '';
            // const subHeading = '';
            return { heading:text, text };
          });
          const Bullets = getOrCreateElement('BulletPoint','1',outputFormat);
          // Bullets.data = bulletsData;
        }
      }
    });

    if(outputFormat.elements.length > 0 && titleText && subTitleText) {
      outputFormat.elements[0].title = titleText;
      outputFormat.elements[0].subTitle = subTitleText;
    }

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

  function segregateBulletPoints(text: string): BulletPointsFunctionType {
    const lines: string[] = text.split('\n');
    let mainBulletPoints: string[] = [];
    let currentMainBulletPoint: string = '';
    let nestedBulletPoints: { [key: string]: string[] } = {};

    lines.forEach((line: string) => {
      const trimmedLine: string = line.trim();
      const spacesBeforeText: number = line.length - trimmedLine.length;

      if (spacesBeforeText === 0) {
        // Main bullet point
        if (currentMainBulletPoint !== '') {
          mainBulletPoints.push(currentMainBulletPoint.trim());
        }
        currentMainBulletPoint = trimmedLine;
      } else {
        // Nested bullet point
        if (currentMainBulletPoint !== '') {
          if (!nestedBulletPoints[currentMainBulletPoint]) {
            nestedBulletPoints[currentMainBulletPoint] = [];
          }
          nestedBulletPoints[currentMainBulletPoint].push(trimmedLine);
        }
      }
    });

    if (currentMainBulletPoint !== '') {
      mainBulletPoints.push(currentMainBulletPoint.trim());
    }

    return { mainBulletPoints, nestedBulletPoints };
  }

  return {
    handleAllElements,
    updateCanvasDimensions,
    updateCanvasSlideData,
    getElementsData,
    customFabricProperties,
  };
};