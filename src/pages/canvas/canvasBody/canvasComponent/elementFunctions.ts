import { fabric } from 'fabric';
import {
  ContentElements,
  ShapesData,
  colorChange,
  elementData,
} from '../elementData';
import useAllElements from '../elements';
import {
  useListElement,
  useImageElement,
  useTableElement,
  useProcessElement,
  usePyramidElement,
  useFunnelElement,
  useCycleElement,
  useTimelineElement,
  useQuoteElement,
  useBulletOrNumberedText,
} from '../elements/elementExports';
import useAllShapes from '../shapes';
import { Canvas_Arrow } from '@/constants/media';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import WebFont from 'webfontloader';
import { updateCanvasInList } from '@/redux/reducers/canvas';
import { useCanvasComponent } from './container';
import {
  CONCLUSION_SLIDE_SUBTITLE,
  CONCLUSION_SLIDE_TITLE,
  COVER_SLIDE_SUBTITLE,
  COVER_SLIDE_TITLE,
  SECTION_SLIDE_SUBTITLE,
  SECTION_SLIDE_TITLE,
  SUBTITLE,
  TITLE,
} from '@/constants/elementNames';

export const useElementFunctions = (canvas: fabric.Canvas | null) => {
  const dispatch = useAppDispatch();
  const { canvasJS, color, textColor, borderColor, size } = useAppSelector(
    state => state.canvas
  );

  const { customFabricProperties } = useCanvasComponent();
  const {
    title,
    subtitle,
    paragraph,
    ColorFillForObjects,
    ColorForText,
    ColorForBorder,
    handleBold,
    handleItalic,
    handleUnderLine,
    addTitleAndSubTileSlide,
  } = useAllElements();

  const {
    addRectangle,
    addCircle,
    addTriangle,
    addRightArrow,
    addStar,
    addLine,
    addLeftArrow,
    addHexagon,
    addPolygon,
  } = useAllShapes();

  const { addListElement } = useListElement();
  const { imageUploader } = useImageElement();
  const { addTable } = useTableElement();
  const { addProcess } = useProcessElement();
  const { addPyramid } = usePyramidElement();
  const { addFunnel } = useFunnelElement();
  const { addCycle } = useCycleElement();
  const { addTimeline } = useTimelineElement();
  const { addQuotes } = useQuoteElement();
  const { BulletText } = useBulletOrNumberedText();

  // elementData[1].onClick = () => {
  //   canvas?.add(title);
  //   title.selectAll();
  //   canvas?.setActiveObject(title);
  //   canvas?.renderAll();
  // };

  // elementData[2].onClick = () => {
  //   canvas?.add(subtitle);
  //   subtitle.selectAll();
  //   canvas?.setActiveObject(subtitle);
  //   canvas?.renderAll();
  // };

  // elementData[3].onClick = () => {
  //   canvas?.add(title);
  //   canvas?.add(subtitle);
  //   canvas?.add(paragraph);
  //   paragraph.selectAll();
  //   canvas?.setActiveObject(paragraph);
  //   canvas?.renderAll();
  // };

  // elementData[4].onClick = () => {
  //   canvas?.add(BulletText);
  // };

  // elementData[5].onClick = () => {
  //   imageUploader(canvas);
  // };
  // elementData[7].onClick = () => {
  //   addQuotes(canvas);
  //   canvas?.renderAll();
  // };
  // elementData[8].onClick = () => {
  //   addListElement(canvas, 33, 23);
  // };

  elementData.forEach(element => {
    let isTitleAvailable: boolean = false;
    let isSubtitleAvailable: boolean = false;

    canvas?.getObjects().forEach(obj => {
      if (obj.name === TITLE) {
        isTitleAvailable = true;
      }
      if (obj.name === SUBTITLE) {
        isSubtitleAvailable = true;
      }
    });

    switch (element.title) {
      case 'Title':
        element.onClick = () => {
          canvas?.add(title);
          title.selectAll();
          canvas?.setActiveObject(title);
          canvas?.renderAll();
        };
        break;
      case 'Subtitle':
        element.onClick = () => {
          canvas?.add(subtitle);
          subtitle.selectAll();
          canvas?.setActiveObject(subtitle);
          canvas?.renderAll();
        };
        break;
      case 'Paragraph':
        element.onClick = () => {
          if (!isTitleAvailable && !isSubtitleAvailable) {
            canvas?.add(title);
            canvas?.add(subtitle);
          } else if (!isTitleAvailable) {
            canvas?.add(title);
          } else if (!isSubtitleAvailable) {
            canvas?.add(subtitle);
          }
          canvas?.add(paragraph);
          paragraph.selectAll();
          canvas?.setActiveObject(paragraph);
          canvas?.renderAll();
        };
        break;
      case 'Bullet':
        element.onClick = () => {
          if (!isTitleAvailable && !isSubtitleAvailable) {
            canvas?.add(title);
            canvas?.add(subtitle);
          } else if (!isTitleAvailable) {
            canvas?.add(title);
          } else if (!isSubtitleAvailable) {
            canvas?.add(subtitle);
          }
          canvas?.add(BulletText);
        };
        break;
      case 'Image':
        element.onClick = () => {
          if (!isTitleAvailable && !isSubtitleAvailable) {
            canvas?.add(title);
            canvas?.add(subtitle);
          } else if (!isTitleAvailable) {
            canvas?.add(title);
          } else if (!isSubtitleAvailable) {
            canvas?.add(subtitle);
          }
          imageUploader(canvas);
        };
        break;
      case 'Table':
        element.onClick = () => {
          if (!isTitleAvailable && !isSubtitleAvailable) {
            canvas?.add(title);
            canvas?.add(subtitle);
          } else if (!isTitleAvailable) {
            canvas?.add(title);
          } else if (!isSubtitleAvailable) {
            canvas?.add(subtitle);
          }
          ContentElements.handleOpenTable();
        };
        break;
      case 'Quotes':
        element.onClick = () => {
          if (!isTitleAvailable && !isSubtitleAvailable) {
            canvas?.add(title);
            canvas?.add(subtitle);
          } else if (!isTitleAvailable) {
            canvas?.add(title);
          } else if (!isSubtitleAvailable) {
            canvas?.add(subtitle);
          }
          addQuotes(canvas);
        };
        break;
      case 'Team List':
        element.onClick = () => {
          if (!isTitleAvailable && !isSubtitleAvailable) {
            canvas?.add(title);
            canvas?.add(subtitle);
          } else if (!isTitleAvailable) {
            canvas?.add(title);
          } else if (!isSubtitleAvailable) {
            canvas?.add(subtitle);
          }
          addListElement(canvas, 27, 100);
        };
        break;
      case 'Cycle':
        element.onClick = () => {
          if (!isTitleAvailable && !isSubtitleAvailable) {
            canvas?.add(title);
            canvas?.add(subtitle);
          } else if (!isTitleAvailable) {
            canvas?.add(title);
          } else if (!isSubtitleAvailable) {
            canvas?.add(subtitle);
          }
          ContentElements.handleCycle();
        };
        break;
      case 'Process':
        element.onClick = () => {
          if (!isTitleAvailable && !isSubtitleAvailable) {
            canvas?.add(title);
            canvas?.add(subtitle);
          } else if (!isTitleAvailable) {
            canvas?.add(title);
          } else if (!isSubtitleAvailable) {
            canvas?.add(subtitle);
          }
          ContentElements.handleProcess();
        };
        break;
      case 'Timeline':
        element.onClick = () => {
          if (!isTitleAvailable && !isSubtitleAvailable) {
            canvas?.add(title);
            canvas?.add(subtitle);
          } else if (!isTitleAvailable) {
            canvas?.add(title);
          } else if (!isSubtitleAvailable) {
            canvas?.add(subtitle);
          }
          ContentElements.handleTimeline();
        };
        break;
      case 'Funnel':
        element.onClick = () => {
          if (!isTitleAvailable && !isSubtitleAvailable) {
            canvas?.add(title);
            canvas?.add(subtitle);
          } else if (!isTitleAvailable) {
            canvas?.add(title);
          } else if (!isSubtitleAvailable) {
            canvas?.add(subtitle);
          }
          ContentElements.handleFunnel();
        };
        break;
      case 'Pyramid':
        element.onClick = () => {
          if (!isTitleAvailable && !isSubtitleAvailable) {
            canvas?.add(title);
            canvas?.add(subtitle);
          } else if (!isTitleAvailable) {
            canvas?.add(title);
          } else if (!isSubtitleAvailable) {
            canvas?.add(subtitle);
          }
          ContentElements.handlePyramid();
        };
        break;
      case 'Cover Slide':
        element.onClick = () => {
          addTitleAndSubTileSlide(
            106,
            158,
            canvas,
            COVER_SLIDE_TITLE,
            COVER_SLIDE_SUBTITLE
          );
        };
        break;
      case 'Section Slide':
        element.onClick = () => {
          addTitleAndSubTileSlide(
            106,
            158,
            canvas,
            SECTION_SLIDE_TITLE,
            SECTION_SLIDE_SUBTITLE
          );
        };
        break;
      case 'Conclusion Slide':
        element.onClick = () => {
          addTitleAndSubTileSlide(
            106,
            158,
            canvas,
            CONCLUSION_SLIDE_TITLE,
            CONCLUSION_SLIDE_SUBTITLE
          );
        };
        break;
      default:
        canvas?.renderAll();
        break;
    }
  });

  ShapesData[0].onClick = () => {
    if (canvas) {
      canvas.add(addRectangle);
      canvas.renderAll();
    }
  };
  ShapesData[1].onClick = () => {
    if (canvas) {
      fabric.loadSVGFromString(Canvas_Arrow, (objects, options) => {
        const obj = fabric.util.groupSVGElements(objects, options);
        obj.top = 100;
        obj.left = 120;
        canvas?.add(obj);
        canvas?.renderAll();
      });
    }
  };

  ShapesData[2].onClick = () => {
    if (canvas) {
      canvas.add(addLine);
      canvas.renderAll();
    }
  };

  ShapesData[3].onClick = () => {
    if (canvas) {
      canvas.add(addCircle);
      canvas.renderAll();
    }
  };

  ShapesData[4].onClick = () => {
    if (canvas) {
      canvas.add(addTriangle);
      canvas.renderAll();
    }
  };
  ShapesData[5].onClick = () => {
    if (canvas) {
      canvas.add(addStar);
      canvas.renderAll();
    }
  };

  ShapesData[6].onClick = () => {
    if (canvas) {
      canvas.add(addRightArrow);
      canvas.renderAll();
    }
  };

  ShapesData[7].onClick = () => {
    if (canvas) {
      canvas.add(addLeftArrow);
      canvas.renderAll();
    }
  };

  ShapesData[8].onClick = () => {
    if (canvas) {
      canvas?.add(addHexagon);
    }
  };
  ShapesData[9].onClick = () => {
    if (canvas) {
      canvas?.add(addPolygon);
    }
  };

  //fabric table
  ContentElements.handleOpenTable = () => {
    addTable(canvas);
  };

  //fabric Funnel
  ContentElements.handleFunnel = () => {
    addFunnel(canvas);
  };

  //fabric Pyramid
  ContentElements.handlePyramid = () => {
    addPyramid(canvas);
  };
  //addCycle
  ContentElements.handleCycle = (levels: number) => {
    addCycle(canvas);
  };
  //addTimeline
  ContentElements.handleTimeline = () => {
    addTimeline(canvas);
  };
  //addProcess
  ContentElements.handleProcess = () => {
    addProcess(canvas);
  };

  ContentElements.handleFontSize = () => {
    const element = canvas?.getActiveObject();

    if (element?.type == 'text' || element?.type == 'textbox') {
      (element as any).set('fontSize', size);
    }
    canvas?.renderAll();
    const updatedCanvas = canvas?.toObject(customFabricProperties);
    const id = canvasJS.id;
    dispatch(updateCanvasInList({ id, updatedCanvas }));
  };

  ContentElements.handleFontFamily = (fontFamily: string) => {
    WebFont.load({
      google: {
        families: [fontFamily],
      },
      active: () => {
        if (canvas) {
          const element = canvas?.getActiveObject();
          if (element?.type == 'text' || element?.type == 'textbox') {
            (element as any).set('fontFamily', fontFamily);
          }
          canvas?.renderAll();
          const updatedCanvas = canvas?.toObject(customFabricProperties);
          const id = canvasJS.id;
          dispatch(updateCanvasInList({ id, updatedCanvas }));
        }
      },
    });
  };

  colorChange.colorFillChange = () => {
    const selectedObject = canvas?.getActiveObject();
    ColorFillForObjects(selectedObject, canvas, color);
    const updatedCanvas = canvas?.toObject(customFabricProperties);
    const id = canvasJS.id;
    dispatch(updateCanvasInList({ id, updatedCanvas }));
  };

  colorChange.colorTextChange = () => {
    const selectedObject = canvas?.getActiveObject();
    ColorForText(selectedObject, canvas, textColor);
    const updatedCanvas = canvas?.toObject(customFabricProperties);
    const id = canvasJS.id;
    dispatch(updateCanvasInList({ id, updatedCanvas }));
  };

  colorChange.colorBorderChange = () => {
    const selectedObject = canvas?.getActiveObject();
    ColorForBorder(selectedObject, canvas, borderColor);
    const updatedCanvas = canvas?.toObject(customFabricProperties);
    const id = canvasJS.id;
    dispatch(updateCanvasInList({ id, updatedCanvas }));
  };

  ContentElements.handleBold = () => {
    let activeObj = canvas?.getActiveObjects() as any;
    handleBold(activeObj, canvas);
  };
  ContentElements.handleItalic = () => {
    let activeObj = canvas?.getActiveObjects() as any;
    handleItalic(activeObj, canvas);
  };
  ContentElements.handleUnderlIne = () => {
    let activeObj = canvas?.getActiveObjects() as any;
    handleUnderLine(activeObj, canvas);
  };
};
