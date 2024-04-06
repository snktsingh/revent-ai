import {
  BULLET_POINTS,
  CONCLUSION_SLIDE_SUBTITLE,
  CONCLUSION_SLIDE_TITLE,
  COVER_SLIDE_SUBTITLE,
  COVER_SLIDE_TITLE,
  CYCLE,
  CYCLE_TEXT,
  FUNNEL,
  FUNNEL_TEXT,
  LIST_MAIN,
  PARAGRAPH,
  PROCESS,
  PROCESS_TEXT,
  PYRAMID,
  PYRAMID_TEXT,
  QUOTE,
  SECTION_SLIDE_SUBTITLE,
  SECTION_SLIDE_TITLE,
  SUBTITLE,
  TABLE,
  TABLE_HEADER,
  TABLE_TEXT,
  TIMELINE,
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
  ElementBaseType,
  TableDataType,
} from '@/interface/storeTypes';
import { setRequestData } from '@/redux/reducers/apiData';
import { setEnabledElements } from '@/redux/reducers/elements';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fabric } from 'fabric';

const useCanvasData = () => {
  const dispatch = useAppDispatch();
  const { canvasJS } = useAppSelector(state => state.canvas);
  const { enabledElements } = useAppSelector(state => state.element);
  const { presentationId } = useAppSelector(state => state.thunk);

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
      const newElement: ElementBaseType = {
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

  function getElementsData(
    canvasData: any[],
    themeCode: string,
    themeName: string
  ) {
    console.log({ canvasData });
    createDisabledElements(canvasData);
    let tableData: TableDataType | undefined;
    if (canvasData) {
      tableData = extractTableData(canvasData);
    }
    const outputFormat: APIRequest = {
      companyName: themeName,
      themeColor: themeCode,
      imagesCount: '',
      slideNumber: canvasJS.id,
      elements: [],
      presentationId: presentationId,
      presentationName: 'Presentation-1',
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
        } else if (canvasObject.name === COVER_SLIDE_TITLE) {
          const CoverSlide = getOrCreateElement('Cover', '1', outputFormat);
          CoverSlide.title = canvasObject.text;
        } else if (canvasObject.name === COVER_SLIDE_SUBTITLE) {
          const CoverSlide = getOrCreateElement('Cover', '1', outputFormat);
          CoverSlide.subTitle = canvasObject.text;
        } else if (canvasObject.name === SECTION_SLIDE_TITLE) {
          const SectionSlide = getOrCreateElement('Section', '1', outputFormat);
          SectionSlide.title = canvasObject.text;
        } else if (canvasObject.name === SECTION_SLIDE_SUBTITLE) {
          const SectionSlide = getOrCreateElement('Section', '1', outputFormat);
          SectionSlide.subTitle = canvasObject.text;
        } else if (canvasObject.name === CONCLUSION_SLIDE_TITLE) {
          const ConclusionSlide = getOrCreateElement(
            'Conclusion',
            '1',
            outputFormat
          );
          ConclusionSlide.title = canvasObject.text;
        } else if (canvasObject.name === CONCLUSION_SLIDE_SUBTITLE) {
          const ConclusionSlide = getOrCreateElement(
            'Conclusion',
            '1',
            outputFormat
          );
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
      if (shape === 'Cover' || shape === 'Section' || shape === 'Conclusion') {
        return { title, subTitle, shape };
      }
      return { data, title, subTitle, templateName, shape };
    });
    outputFormat.elements = modifiedRequestFormat;
    if (tableData?.tableData.length && tableData.tableData.length > 0) {
      outputFormat.elements = [];
      tableData.title = titleText;
      tableData.subTitle = subTitleText;
      tableData.data = [];
      outputFormat.elements.push(tableData);
    }
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
      } else if (spacesBeforeText == 4) {
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

  const extractTableData = (canvasData: any[]) => {
    const objects = canvasData;
    const tableData: any[] = [];

    const headers: string[] = [];
    const data: string[][] = [];

    const firstRow = objects.filter(obj =>
      obj.name?.startsWith(`${TABLE_HEADER}_1_`)
    );
    firstRow.forEach(obj => {
      headers.push((obj as fabric.Textbox).text || '');
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
    for (let i = 2; i < rowCount; i++) {
      const rowData: any = [];

      for (let j = 0; j < colCount; j++) {
        const textBoxName = `${TABLE_TEXT}_${i}_${j + 1}`;
        const textBox = objects.find(obj => obj.name === textBoxName) as
          | fabric.Textbox
          | undefined;
        if (textBox) {
          rowData.push(textBox.text);
        }
      }

      tableData.push(rowData);
    }

    return {
      shape: 'table',
      title: '',
      subTitle: '',
      headers,
      tableData,
    };
  };

  function createDisabledElements(objects: any[]) {
    let enabledEl: string[] = [];

    const isTitleAdded = objects.some(obj => obj.name === TITLE);
    const isSubtitleAdded = objects.some(obj => obj.name === SUBTITLE);
    const isCoverSectionOrConclusionAdded = objects.some(obj =>
      ['Cover', 'Section', 'Conclusion'].some(elName =>
        obj.name.startsWith(elName)
      )
    );
    const isShapeAdded = objects.some(obj =>
      [
        PYRAMID,
        FUNNEL,
        TIMELINE,
        PROCESS,
        CYCLE,
        TABLE,
        LIST_MAIN,
        QUOTE,
        BULLET_POINTS,
        PARAGRAPH,
      ].some(elName => obj.name.startsWith(elName))
    );

    if (isCoverSectionOrConclusionAdded) {
      enabledEl = [];
    } else if (isShapeAdded && isTitleAdded && isSubtitleAdded) {
      enabledEl = [];
    } else if (isShapeAdded && isTitleAdded) {
      enabledEl.push('Subtitle');
    } else if (isShapeAdded && isSubtitleAdded) {
      enabledEl.push('Title');
    } else if (isShapeAdded) {
      enabledEl.push('Title', 'Subtitle');
    } else if (isTitleAdded && isSubtitleAdded) {
      enabledEl.push(
        'Image',
        'Quotes',
        'List',
        'Paragraph',
        'Bullet',
        'Table',
        'Cycle',
        'Process',
        'Timeline',
        'Funnel',
        'Pyramid'
      );
    } else if (isTitleAdded) {
      enabledEl.push(
        'Image',
        'Quotes',
        'List',
        'Paragraph',
        'Bullet',
        'Table',
        'Cycle',
        'Process',
        'Timeline',
        'Funnel',
        'Pyramid',
        'Subtitle'
      );
    } else if (isSubtitleAdded) {
      enabledEl.push(
        'Image',
        'Quotes',
        'List',
        'Paragraph',
        'Bullet',
        'Table',
        'Cycle',
        'Process',
        'Timeline',
        'Funnel',
        'Pyramid',
        'Title'
      );
    } else {
      if (!isTitleAdded) {
        enabledEl.push('Title');
      }
      if (!isSubtitleAdded) {
        enabledEl.push('Subtitle');
      }
      enabledEl.push(
        'Image',
        'Quotes',
        'List',
        'Paragraph',
        'Bullet',
        'Table',
        'Cycle',
        'Process',
        'Timeline',
        'Funnel',
        'Pyramid',
        'Cover Slide',
        'Section Slide',
        'Conclusion Slide'
      );
    }

    dispatch(setEnabledElements(enabledEl));
  }

  return {
    getElementsData,
    createDisabledElements,
  };
};

export default useCanvasData;
