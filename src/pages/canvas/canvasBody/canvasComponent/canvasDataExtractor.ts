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
  HUB_AND_SPOKE_BOX_HEADING,
  HUB_AND_SPOKE_BOX_TEXT,
  HUB_AND_SPOKE_MAIN_TEXT,
  IMAGE,
  LIST_MAIN,
  LIST_TEXT,
  PARAGRAPH,
  PROCESS,
  PROCESS_TEXT,
  PYRAMID,
  PYRAMID_TEXT,
  QUOTE,
  QUOTE_AUTHOR,
  QUOTE_TEXT,
  SECTION_SLIDE_SUBTITLE,
  SECTION_SLIDE_TITLE,
  STATISTICS_TEXT,
  STATISTICS_TITLE_TEXT,
  SUBTITLE,
  SWOT,
  SWOT_TEXT,
  TABLE,
  TABLE_HEADER,
  TABLE_OF_CONTENTS_HEADING,
  TABLE_OF_CONTENTS_TEXT,
  TABLE_TEXT,
  TIMELINE,
  TIMELINE_HEADING,
  TIMELINE_TEXT,
  TITLE,
} from '@/constants/elementNames';
import {
  BulletPointsFunctionType,
  HunNSpokeDataType,
  StatisticsDataType,
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
        templateName: '',
        elementId,
        data: [],
        heading : ''
      };
      outputFormat.elements.push(newElement);
      return newElement;
    }
  };

  async function getElementsData(canvasData: any[], themeId: number) {
    console.log({ canvasData });
    createDisabledElements(canvasData);
    let tableData: TableDataType | undefined;
    if (canvasData) {
      tableData = extractTableData(canvasData);
    }
    let outputFormat: APIRequest = {
      themeId: themeId,
      imagesCount: '',
      slideNumber: canvasJS.id,
      elements: [],
      presentationId: presentationId,
      // presentationName: 'Presentation-1',
    };
    let timelineData: TimelineDataType[] = [];
    let hubAndSpokeData: HunNSpokeDataType[] = [];
    let statisticsData: StatisticsDataType[] = [];
    let titleText: string = '';
    let subTitleText: string = '';
    let hubAndSpokeMainText: string = '';
    canvasData.forEach(canvasObject => {
      if (
        (canvasObject.type === 'textbox' || canvasObject.type === 'image') &&
        canvasObject.name
      ) {
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

          case canvasObject.name.startsWith(SWOT_TEXT):
            elementType = 'Swot';
            break;

          default:
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
            label: '',
            text: canvasObject.text,
          });
        } else if (canvasObject.name === PARAGRAPH) {
          const paragraphData = getOrCreateElement(
            'Paragraph',
            '1',
            outputFormat
          );
          paragraphData.data?.push({
            name: canvasObject.text,
            label: '',
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
            label: '',
            text: canvasObject.text,
          });
        } else if (canvasObject?.name === BULLET_POINTS) {
          const { mainBulletPoints, nestedBulletPoints } =
            segregateBulletPoints(canvasObject.text);
          const bulletsData = mainBulletPoints.map((text, index) => {
            return { heading: text, text };
          });
          const Bullets = getOrCreateElement('BulletTitle', '1', outputFormat);
          Bullets.data = bulletsData;
        } else if (canvasObject.name === TITLE) {
          titleText = canvasObject.text;
        } else if (canvasObject.name === SUBTITLE) {
          subTitleText = canvasObject.text;
        } else if (canvasObject.name === COVER_SLIDE_TITLE) {
          const CoverSlide = getOrCreateElement('Cover', '1', outputFormat);
          titleText = canvasObject.text;
          CoverSlide.title = canvasObject.text;
        } else if (canvasObject.name === COVER_SLIDE_SUBTITLE) {
          const CoverSlide = getOrCreateElement('Cover', '1', outputFormat);
          subTitleText = canvasObject.text;
          CoverSlide.subTitle = canvasObject.text;
        } else if (canvasObject.name === SECTION_SLIDE_TITLE) {
          const SectionSlide = getOrCreateElement('Section', '1', outputFormat);
          titleText = canvasObject.text;
          SectionSlide.title = canvasObject.text;
        } else if (canvasObject.name === SECTION_SLIDE_SUBTITLE) {
          const SectionSlide = getOrCreateElement('Section', '1', outputFormat);
          subTitleText = canvasObject.text;
          SectionSlide.subTitle = canvasObject.text;
        } else if (canvasObject.name === CONCLUSION_SLIDE_TITLE) {
          const ConclusionSlide = getOrCreateElement(
            'Conclusion',
            '1',
            outputFormat
          );
          titleText = canvasObject.text;
          ConclusionSlide.title = canvasObject.text;
        } else if (canvasObject.name === CONCLUSION_SLIDE_SUBTITLE) {
          const ConclusionSlide = getOrCreateElement(
            'Conclusion',
            '1',
            outputFormat
          );
          subTitleText = canvasObject.text;
          ConclusionSlide.subTitle = canvasObject.text;
        } else if (canvasObject.name.startsWith(LIST_TEXT)) {
          const ListImage = getOrCreateElement(
            'ImageSubtitle',
            '1',
            outputFormat
          );
          ListImage.data?.push({
            name: canvasObject.text === "Add Text" ? "" : canvasObject.text,
            label: canvasObject.text === "Add Text" ? "" : canvasObject.text,
            subHeading: '',
            text: canvasObject.text === "Add Text" ? "" : canvasObject.text,
          });
        } else if (canvasObject.name.startsWith(IMAGE)) {
          const Image = getOrCreateElement('Images', '1', outputFormat);
        } else if (canvasObject.name.startsWith(QUOTE_TEXT)) {
          const Quote = getOrCreateElement('Quote', '1', outputFormat);
          
          let newText = canvasObject.text.trim();

          if (
            newText.charAt(0) === '❝' &&
            newText.charAt(newText.length - 1) === '❞'
          ) {
            newText = newText.slice(1, -1);
          }
          Quote.data?.push({
            text: newText,
          });
        } else if (canvasObject.name.startsWith(QUOTE_AUTHOR)) {
          const Quote = getOrCreateElement('Quote', '1', outputFormat);
          let newText = canvasObject.text.trim();
          if (Quote.data && Quote.data[0]) {
            Quote.data[0].label = canvasObject.text.slice(1).trimStart();
          }
        } else if (canvasObject?.name === TABLE_OF_CONTENTS_TEXT) {
          const { mainBulletPoints, nestedBulletPoints } =
            segregateBulletPoints(canvasObject.text);
          const contentsData = mainBulletPoints.map((text, index) => {
            return { heading: text, text };
          });
          const Bullets = getOrCreateElement(
            'Toc',
            '1',
            outputFormat
          );
          Bullets.data = contentsData;
        } else if (
          canvasObject.name.startsWith(HUB_AND_SPOKE_BOX_HEADING) ||
          canvasObject.name.startsWith(HUB_AND_SPOKE_BOX_TEXT)
        ) {
          const [_, id] = canvasObject.name.split('_');
          hubAndSpokeData.push({ content: canvasObject.text, id: id });
        }
        else if (
          canvasObject.name.startsWith(HUB_AND_SPOKE_MAIN_TEXT)
        ) {
          const [_, id] = canvasObject.name.split('_');
          hubAndSpokeMainText = canvasObject.text;
        } else if (
          canvasObject.name.startsWith(STATISTICS_TEXT) ||
          canvasObject.name.startsWith(STATISTICS_TITLE_TEXT)
        ) {
          const [_, id] = canvasObject.name.split('_');
          statisticsData.push({ content: canvasObject.text, id: id });
        } 
      }
    });

    if (outputFormat && outputFormat.elements.length > 0 && titleText !== '') {
      outputFormat.title = titleText;
      outputFormat.subTitle = subTitleText;
      outputFormat.elements[0].title = titleText;
    }

    if (
      outputFormat &&
      outputFormat.elements.length > 0 &&
      subTitleText !== ''
    ) {
      outputFormat.title = titleText;
      outputFormat.subTitle = subTitleText;
      outputFormat.elements[0].subTitle = subTitleText;
    }
    // arrange timeline data
    type OrganizedTimelineData = Record<string, DataRequestType[]>;

    const organizedTimelineData: OrganizedTimelineData = {};

    timelineData.forEach((item, index) => {
      const id = item.id;
      const timelineArray =
        organizedTimelineData[id] || (organizedTimelineData[id] = []);

      if (index % 2 === 0) {
        timelineArray.push({
          label: item.content,
          text: '',
          name: '',
          subHeading: '',
        });
      } else {
        if (timelineArray && timelineArray.length) {
          const lastTimeline = timelineArray[timelineArray.length - 1];
          lastTimeline && (lastTimeline.text = item.content);
        }
      }
    });

    Object.entries(organizedTimelineData).forEach(([id, content]) => {
      const timelineElement = getOrCreateElement('Timeline', id, outputFormat);
      timelineElement.data = content;
      timelineElement.title = titleText;
      timelineElement.subTitle = subTitleText;
    });

    // arrange HUB and SPOKE data
    type OrganizedHubAndSpokeData = Record<string, DataRequestType[]>;

    const organizedHubAndSpokeData: OrganizedHubAndSpokeData = {};

    hubAndSpokeData.forEach((item, index) => {
      const id = item.id;
      const hubArray =
      organizedHubAndSpokeData[id] || (organizedHubAndSpokeData[id] = []);

      if (index % 2 === 0) {
        hubArray.push({
          label: item.content,
          text: '',
        });
      } else {
        if (hubArray && hubArray.length) {
          const lastTimeline = hubArray[hubArray.length - 1];
          lastTimeline && (lastTimeline.text = item.content);
        }
      }
    });

    Object.entries(organizedHubAndSpokeData).forEach(([id, content]) => {
      const hubAndSpokeElement = getOrCreateElement('Hub', id, outputFormat);
      hubAndSpokeElement.data = content;
      hubAndSpokeElement["heading"] = hubAndSpokeMainText;
      hubAndSpokeElement.title = titleText;
      hubAndSpokeElement.subTitle = subTitleText;
    });

    // arrange STATISTICS data
    type OrganizedStatisticsData = Record<string, DataRequestType[]>;

    const organizedStatisticsData: OrganizedStatisticsData = {};

    statisticsData.forEach((item, index) => {
      const id = item.id;
      const statsArray =
      organizedStatisticsData[id] || (organizedStatisticsData[id] = []);

      if (index % 2 === 0) {
        statsArray.push({
          label: item.content,
          text: '',
        });
      } else {
        if (statsArray && statsArray.length) {
          const lastTimeline = statsArray[statsArray.length - 1];
          lastTimeline && (lastTimeline.text = item.content);
        }
      }
    });

    Object.entries(organizedStatisticsData).forEach(([id, content]) => {
      const statsElement = getOrCreateElement('Metric', id, outputFormat);
      statsElement.data = content;
      statsElement.title = titleText;
      statsElement.subTitle = subTitleText;

    });

    if (outputFormat && outputFormat.elements.length > 0) {
      if (titleText && subTitleText) {
        outputFormat['title'] = titleText;
        outputFormat['subTitle'] = subTitleText;
      } else if (titleText) {
        outputFormat['title'] = titleText;
      } else if (subTitleText) {
        outputFormat['subTitle'] = subTitleText;
      }

      if(outputFormat.elements[0].shape == 'Hub'){
         outputFormat.elements[0].heading = hubAndSpokeMainText
      }

    } else {
      const titleData = getOrCreateElement('cover', '1', outputFormat);
      titleData['title'] = titleText;
      titleData['subTitle'] = subTitleText;
    }

    const modifiedRequestFormat = outputFormat.elements.map(element => {
      const { elementId, data, title, subTitle, templateName, shape } = element;
      if (shape === 'Cover' || shape === 'Section' || shape === 'Conclusion') {
        return { title, subTitle, shape, data };
      }
      return { data, title, subTitle, templateName, shape };
    });
    outputFormat.elements = modifiedRequestFormat;
    if (
      tableData?.tableData &&
      tableData?.tableData.length &&
      tableData.tableData.length > 0
    ) {
      outputFormat.elements = [];
      if (titleText && subTitleText) {
        tableData.title = titleText;
        tableData.subTitle = subTitleText;
      }
      tableData.data = [];
      outputFormat.elements.push(tableData);
    }

    outputFormat = {
      ...outputFormat,
      elements: outputFormat.elements.map(element => {
        if ('shape' in element && element.shape === 'Funnel' && element.data) {
          return {
            ...element,
            data: [...element.data].reverse()
          };
        }else if ('shape' in element && element.shape === 'Hub' && element.data) {
          return {
            ...element,
            heading : hubAndSpokeMainText
          }
        }
        return element;
      })
    };
    
    console.log({ outputFormat });
    dispatch(setRequestData(outputFormat));
    return new Promise<any>((resolve, reject) => {
      resolve(outputFormat);
    });
  }

  // segregating bullet points
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
    const isCoverSectionOrConclusionAdded = objects.some(obj => {
      if (obj.name) {
        return ['Cover', 'Section', 'Conclusion'].some(elName =>
          obj.name.startsWith(elName)
        );
      }
    });
    const isImageAdded = objects.some(obj => obj.name === IMAGE);
    const isShapeAdded = objects.some(obj => {
      if (obj.name) {
        return [
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
          SWOT,
        ].some(elName => obj.name.startsWith(elName));
      }
    });

    if (isCoverSectionOrConclusionAdded) {
      enabledEl = [];
    } else if (isShapeAdded && isTitleAdded && isSubtitleAdded) {
      enabledEl = [];
    } else if(isImageAdded) {
      enabledEl.push(
        'Image'
      );
    }else if (isShapeAdded && isTitleAdded) {
      enabledEl.push('Subtitle');
    } else if (isShapeAdded && isSubtitleAdded) {
      enabledEl.push('Title');
    } else if (isShapeAdded) {
      enabledEl.push('Title', 'Subtitle');
    } else if (isTitleAdded && isSubtitleAdded) {
      enabledEl.push(
        'Image',
        'Quotes',
        'Team List',
        'Paragraph',
        'Bullet',
        'Table',
        'Cycle',
        'Process',
        'Timeline',
        'Funnel',
        'Pyramid',
        'SWOT Analysis',
        'Table of Contents',
        'Hubs and Spoke',
        'Statistics',
        'Client List'
      );
    } else if (isTitleAdded) {
      enabledEl.push(
        'Image',
        'Quotes',
        'Team List',
        'Paragraph',
        'Bullet',
        'Table',
        'Cycle',
        'Process',
        'Timeline',
        'Funnel',
        'Pyramid',
        'Subtitle',
        'SWOT Analysis',
        'Table of Contents',
        'Hubs and Spoke',
        'Statistics',
        'Client List'
      );
    } else if (isSubtitleAdded) {
      enabledEl.push(
        'Image',
        'Quotes',
        'Team List',
        'Paragraph',
        'Bullet',
        'Table',
        'Cycle',
        'Process',
        'Timeline',
        'Funnel',
        'Pyramid',
        'Title',
        'SWOT Analysis',
        'Table of Contents',
        'Hubs and Spoke',
        'Statistics',
        'Client List'
      );
    } 
     else {
      if (!isTitleAdded) {
        enabledEl.push('Title');
      }
      if (!isSubtitleAdded) {
        enabledEl.push('Subtitle');
      }
      enabledEl.push(
        'Image',
        'Quotes',
        'Team List',
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
        'Conclusion Slide',
        'SWOT Analysis',
        'Table of Contents',
        'Hubs and Spoke',
        'Statistics',
        'Client List'
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
