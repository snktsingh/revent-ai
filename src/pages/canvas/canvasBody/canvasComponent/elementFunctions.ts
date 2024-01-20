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
} from '../elements/elementExports';
import useAllShapes from '../shapes';
import { Canvas_Arrow } from '@/constants/media';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import WebFont from 'webfontloader';
import { updateCanvasInList } from '@/redux/reducers/canvas';
import { useCanvasComponent } from './container';

export const useElementFunctions = (canvas: fabric.Canvas | null) => {
  const dispatch = useAppDispatch();
  const { 
    canvasJS, 
    color,
    textColor,
    borderColor,
    size, 
} = useAppSelector(state => state.canvas);

  const { customFabricProperties } = useCanvasComponent();
  const {
    title,
    subtitle,
    paragraph,
    BulletText,
    addQuotes,
    ColorFillForObjects,
    ColorForText,
    ColorForBorder,
    handleBold,
    handleItalic,
    handleUnderLine,
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

  elementData[1].onClick = () => {
    canvas?.add(title);
    title.selectAll();
    canvas?.setActiveObject(title);
    canvas?.renderAll();
  };

  elementData[2].onClick = () => {
    canvas?.add(subtitle);
    subtitle.selectAll();
    canvas?.setActiveObject(subtitle);
    canvas?.renderAll();
  };

  // elementData[3].onClick = () => {
  //   canvas?.add(heading);
  //   heading.selectAll();
  //   canvas?.setActiveObject(heading);
  //   canvas?.renderAll();
  // };

  elementData[3].onClick = () => {
    canvas?.add(paragraph);
    paragraph.selectAll();
    canvas?.setActiveObject(paragraph);
    canvas?.renderAll();
  };

  elementData[4].onClick = () => {
    canvas?.add(BulletText);
  };

  elementData[5].onClick = () => {
    imageUploader(canvas);
  };
  elementData[7].onClick = () => {
    let text = addQuotes();
    canvas?.add(text);
    canvas?.setActiveObject(text);
    text?.enterEditing();
    canvas?.renderAll();
  };
  elementData[8].onClick = () => {
    addListElement(canvas, 33, 23);
  };

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
  ContentElements.handleOpenTable = (
    rows: number,
    cols: number,
    cellWidth: number,
    cellHeight: number
  ) => {
    addTable(rows, cols, cellWidth, cellHeight, canvas);
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
