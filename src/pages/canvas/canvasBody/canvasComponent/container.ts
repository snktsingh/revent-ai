import {
  BULLET_POINTS,
  CONCLUSION_SLIDE_SUBTITLE,
  CONCLUSION_SLIDE_TITLE,
  COVER_SLIDE_SUBTITLE,
  COVER_SLIDE_TITLE,
  CYCLE_ARROW,
  CYCLE_CIRCLE,
  CYCLE_TEXT,
  FUNNEL_TEXT,
  PARAGRAPH,
  PROCESS_ARROW,
  PROCESS_BOX,
  PROCESS_TEXT,
  PYRAMID_TEXT,
  SECTION_SLIDE_SUBTITLE,
  SECTION_SLIDE_TITLE,
  SUBTITLE,
  TABLE,
  TABLE_TEXT,
  TIMELINE_CIRCLE,
  TIMELINE_DIRECTION,
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
import { setCanvas, updateCanvasInList } from '@/redux/reducers/canvas';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fabric } from 'fabric';
import { useState } from 'react';

export const useCanvasComponent = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedElementPosition, setSelectedElementPosition] = useState({ top: 0, left: 0 });

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
  const { canvasJS } = useAppSelector((state) => state.canvas);
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

  function getElementsData(canvasData: any[], themeCode: string, themeName : string) {
    console.log({ canvasData });
    const outputFormat: APIRequest = {
      companyName: themeName,
      themeColor: themeCode,
      imagesCount: '',
      slideNumber : canvasJS.id,
      elements: [],
    };
    let timelineData: TimelineDataType[] = [];
    let titleText: string = '';
    let subTitleText: string = '';
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
          element.data?.push({
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
        } else if (canvasObject.name === PARAGRAPH) {
          const paragraphData = getOrCreateElement(
            'Paragraph',
            '1',
            outputFormat
          );
          paragraphData.data?.push({
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
        } else if (canvasObject.name === PARAGRAPH) {
          const paragraphData = getOrCreateElement(
            'Paragraph',
            '1',
            outputFormat
          );
          paragraphData.data?.push({
            name: canvasObject.text,
            heading: '',
            subHeading: '',
            text: canvasObject.text,
          });
        } else if (canvasObject?.name === BULLET_POINTS) {
          const { mainBulletPoints, nestedBulletPoints } =
            segregateBulletPoints(canvasObject.text);
          const bulletsData = mainBulletPoints.map((text, index) => {
             return { heading: text, text };
          });
          const Bullets = getOrCreateElement('BulletPoint', '1', outputFormat);
          Bullets.data = bulletsData;
        } else if (canvasObject.name === TITLE) {
           titleText = canvasObject.text;
        } else if (canvasObject.name === SUBTITLE) {
          subTitleText = canvasObject.text;
        }else if(canvasObject.name === COVER_SLIDE_TITLE ){
          const CoverSlide = getOrCreateElement('Cover', '1', outputFormat);
          CoverSlide.title = canvasObject.text;  
        }
        else if(canvasObject.name === COVER_SLIDE_SUBTITLE ){
          const CoverSlide = getOrCreateElement('Cover', '1', outputFormat);
          CoverSlide.subTitle = canvasObject.text;  
        }
        else if(canvasObject.name === SECTION_SLIDE_TITLE ){
          const SectionSlide = getOrCreateElement('Section', '1', outputFormat);
          SectionSlide.title = canvasObject.text;  
        }
        else if(canvasObject.name === SECTION_SLIDE_SUBTITLE ){
          const SectionSlide = getOrCreateElement('Section', '1', outputFormat);
          SectionSlide.subTitle = canvasObject.text;  
        }else if(canvasObject.name === CONCLUSION_SLIDE_TITLE ){
          const ConclusionSlide = getOrCreateElement('Conclusion', '1', outputFormat);
          ConclusionSlide.title = canvasObject.text;  
        }
        else if(canvasObject.name === CONCLUSION_SLIDE_SUBTITLE ){
          const ConclusionSlide = getOrCreateElement('Conclusion', '1', outputFormat);
          ConclusionSlide.subTitle = canvasObject.text;  
        }
      }
    });

    if (outputFormat.elements.length > 0 && titleText && subTitleText) {
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

    if (outputFormat.elements.length > 0) {
      outputFormat['title'] = titleText;
      outputFormat['subTitle'] = subTitleText;
    } else {
      const titleData = getOrCreateElement('cover', '1', outputFormat);
      titleData['title'] = titleText;
      titleData['subTitle'] = subTitleText;
    }

    const modifiedRequestFormat = outputFormat.elements.map(element => {
      const { elementId, data, title, subTitle, templateName, shape } = element;
      if(shape === 'Cover' || shape === 'Section' || shape === 'Conclusion'){
        return {title, subTitle, shape};
      }
      return {data, title, subTitle, templateName, shape};
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
      if (spacesBeforeText < 4) {
        // Main bullet point
        if (currentMainBulletPoint !== '') {
          mainBulletPoints.push(currentMainBulletPoint.trim());
        }
        currentMainBulletPoint = trimmedLine;
      } else if(spacesBeforeText == 4) {
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

  const extractTableData = (canvas: fabric.Canvas | null) => {
    if (!canvas) return [];

    const tableData: { [key: string]: any }[] = [];

    const objects = canvas.getObjects();

    const keys: string[] = [];
    const firstRow = objects.filter(obj =>
      obj.name?.startsWith(`${TABLE_TEXT}_1_`)
    );
    firstRow.forEach(obj => {
      keys.push((obj as fabric.Textbox).text || '');
    });

    let rowCount = 0;
    let colCount = 0;

    objects.forEach(obj => {
      if (obj.name && obj.name.startsWith(`${TABLE_TEXT}_`)) {
        const [_, rowIndexStr, colIndexStr] = obj.name.split('_');
        const rowIndex = parseInt(rowIndexStr);
        const colIndex = parseInt(colIndexStr);
        rowCount = Math.max(rowCount, rowIndex + 1);
        colCount = Math.max(colCount, colIndex + 1);
      }
    });
    console.log({ rowCount, colCount });
    for (let i = 2; i < rowCount; i++) {
      // Assuming 4 rows
      const rowData: { [key: string]: any } = {};

      // Iterate through columns
      for (let j = 0; j < keys.length; j++) {
        const textBoxName = `${TABLE_TEXT}_${i}_${j + 1}`;
        const textBox = objects.find(obj => obj.name === textBoxName) as
          | fabric.Textbox
          | undefined;
        if (textBox) {
          // Assign text content to the corresponding key
          rowData[keys[j]] = textBox.text;
        }
      }

      // Add the row data to the table data array
      tableData.push(rowData);
    }

    console.log({ tableData });
  };


  const handleElementBarSelection = (event: fabric.IEvent) => {
    if (event.selected && event.selected.length > 0) {
      const selectedObject = event.selected[0];
      if (selectedObject && selectedObject.name && checkElementsForEditBar(selectedObject.name)) {
        setShowOptions(false);
        return;
      }
  
      const boundingRect = selectedObject.getBoundingRect();
      const { left, top, width, height } = boundingRect;
      
      let positionTop = top - 35;
      let positionLeft = left + (width - 140) / 2;
  
      if (selectedObject && selectedObject.name && selectedObject.name.startsWith(TABLE)) {
        positionTop = top - 35;
        positionLeft = left + (width - 275) / 2;
  
        const updateTablePosition = () => {
          const boundingRect = selectedObject.getBoundingRect();
          const { left, top, width, height } = boundingRect;
          const newPositionTop = top - 35;
          const newPositionLeft = left + (width - 275) / 2;
          setSelectedElementPosition({ top: newPositionTop, left: newPositionLeft });
        };
  
        selectedObject.on('moving', updateTablePosition);
      } else {
        const updatePosition = () => {
          const boundingRect = selectedObject.getBoundingRect();
          const { left, top, width, height } = boundingRect;
          const newPositionTop = top - 35;
          const newPositionLeft = left + (width - 140) / 2;
          setSelectedElementPosition({ top: newPositionTop, left: newPositionLeft });
        };
  
        selectedObject.on('moving', updatePosition);
      }
  
      setSelectedElementPosition({ top: positionTop, left: positionLeft });
      setShowOptions(true);
    }
  };
  

  function checkElementsForEditBar(elementName : string) : boolean {
    if(
      elementName.startsWith(PYRAMID_TEXT) ||
      elementName.startsWith(FUNNEL_TEXT) ||
      elementName.startsWith(PROCESS_TEXT) ||
      elementName.startsWith(PROCESS_ARROW) ||
      elementName.startsWith(PROCESS_BOX) ||
      elementName.startsWith(CYCLE_TEXT) ||
      elementName.startsWith(CYCLE_ARROW) ||
      elementName.startsWith(CYCLE_CIRCLE) ||
      elementName.startsWith(TIMELINE_HEADING) ||
      elementName.startsWith(TIMELINE_TEXT) ||
      elementName.startsWith(TIMELINE_CIRCLE) ||
      elementName.startsWith(TIMELINE_DIRECTION) ||
      elementName.startsWith(TABLE_TEXT) 
      ){
      return true;
    };
    return false;
  };
  


  return {
    handleAllElements,
    updateCanvasDimensions,
    updateCanvasSlideData,
    getElementsData,
    customFabricProperties,
    extractTableData,
    handleElementBarSelection,
    showOptions,
    setShowOptions,
    selectedElementPosition,
    setSelectedElementPosition
  };
};
