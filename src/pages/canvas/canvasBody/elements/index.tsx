import { PARAGRAPH, SUBTITLE, TITLE } from '@/constants/elementNames';
import { customStyles } from '@/constants/theme';
import { fabric } from 'fabric';

export default function useAllElements() {

  const title = new fabric.Textbox('Click to add a title', {
    left: 15,
    top: 13,
    fontSize: 30,
    width: 400,
    fontWeight: 'bold',
    fontFamily: customStyles.fonts.robotoSansSerif,
    name: TITLE,
    fill: '#404040',
    charSpacing: 2,
    cursorDelay: 1,
    hoverCursor: 'text',
    padding: 5,
    splitByGrapheme: true,
  });

  const subtitle = new fabric.Textbox('Click to add a subtitle', {
    left: 15,
    top: 60,
    width: 200,
    fontSize: 20,
    fontFamily: customStyles.fonts.robotoSansSerif,
    name: SUBTITLE,
    fill: '#404040',
    splitByGrapheme: true,
  });

  const heading = new fabric.Textbox('Click to add a heading', {
    left: 100,
    top: 50,
    width: 300,
    fontSize: 30,
    fontFamily: customStyles.fonts.robotoSansSerif,
    fontWeight: 'bold',
    name: 'headingbox',
    fill: '#404040',
    splitByGrapheme: true,
  });

  const paragraph = new fabric.Textbox('Click to add a paragraph', {
    left: 100,
    top: 150,
    width: 600,
    lineHeight: 1.5,
    fontSize: 16,
    fontFamily: customStyles.fonts.robotoSansSerif,
    name: PARAGRAPH,
    fill: '#404040',
    splitByGrapheme: true,
  });

  paragraph.setControlsVisibility({
    tl: true,
    tr: true,
    br: true,
    bl: true,
    mt: true,
    mb: true,
    ml: true,
    mr: true,
  });




  const ColorFillForObjects = (
    selectedObject: fabric.Object | null | undefined,
    canvas: fabric.Canvas | null,
    color: string
  ) => {
    const shape = selectedObject?.name?.split('_')[1]
    if (selectedObject && shape == 'Shape') {
      selectedObject.set('fill', color);
      canvas?.renderAll();
    } else if (
      selectedObject?.type == 'text' ||
      selectedObject?.type == 'textbox'
    ) {
      selectedObject.set('backgroundColor', color);
      canvas?.renderAll();
    }
  };

  const ColorForText = (
    selectedObject: fabric.Object | null | undefined,
    canvas: fabric.Canvas | null,
    textColor: string
  ) => {
    if (selectedObject?.type == 'text' || selectedObject?.type == 'textbox') {
      selectedObject.set('fill', textColor);
      canvas?.renderAll();
    }
  };

  const ColorForBorder = (
    selectedObject: fabric.Object | null | undefined,
    canvas: fabric.Canvas | null,
    borderColor: string
  ) => {
    if (selectedObject) {
      selectedObject.set('stroke', borderColor);
      canvas?.renderAll();
    }
  };

  const handleBold = (activeObj: any, canvas: fabric.Canvas | null) => {
    if (
      (activeObj && activeObj[0]?.type === 'text') ||
      activeObj[0]?.type == 'textbox'
    ) {
      const selectionStyles = activeObj[0].getSelectionStyles();
      const isBold = selectionStyles.every((style: any) => style.fontWeight === 'bold');
      const newStyle = isBold ? { fontWeight: 'normal' } : { fontWeight: 'bold' };

      activeObj[0].setSelectionStyles(newStyle, activeObj[0].selectionStart, activeObj[0].selectionEnd);
      canvas?.renderAll();
    }
  };

  const handleItalic = (activeObj: any, canvas: fabric.Canvas | null) => {
    if (
      (activeObj && activeObj[0]?.type === 'text') ||
      activeObj[0]?.type == 'textbox'
    ) {
      const selectionStyles = activeObj[0].getSelectionStyles();
      const isItalic = selectionStyles.every((style: any) => style.fontStyle === 'italic');
      const newItalicStyle = isItalic ? { fontStyle: 'normal' } : { fontStyle: 'italic' };
      activeObj[0].setSelectionStyles(newItalicStyle, activeObj[0].selectionStart, activeObj[0].selectionEnd);
      canvas?.renderAll();
    }
  };

  const handleUnderLine = (activeObj: any, canvas: fabric.Canvas | null) => {
    if (
      (activeObj && activeObj[0]?.type === 'text') ||
      activeObj[0]?.type == 'textbox'
    ) {
      const selectionStyles = activeObj[0].getSelectionStyles();
      const isUnderline = selectionStyles.every((style: any) => style.underline);
      const newUnderlineStyle = isUnderline ? { underline: false } : { underline: true };
      activeObj[0].setSelectionStyles(newUnderlineStyle, activeObj[0].selectionStart, activeObj[0].selectionEnd);
      canvas?.renderAll();
    }
  };

  const addTitleAndSubTileSlide = (
    left: number, top: number,
    canvas: fabric.Canvas | null,
    titleName: string,
    subtitleName: string
  ) => {
    const center = canvas?.getCenter();
    const title = new fabric.Textbox('Click to add a title', {
      width: 600,
      left: center?.left,
      top: center?.top! - 25,
      fontSize: 42,
      fontWeight: 'bold',
      fontFamily: customStyles.fonts.robotoSansSerif,
      name: titleName,
      fill: '#404040',
      charSpacing: 2,
      cursorDelay: 1,
      hoverCursor: 'text',
      textAlign: 'center',
      padding: 5,
      height: 200,
      splitByGrapheme: true,
      originX: 'center',
      originY: 'center',
    });

    const subtitle = new fabric.Textbox('Click to add a subtitle', {
      width: 700,
      left: center?.left,
      top: center?.top! + 25,
      fontSize: 28,
      fontFamily: customStyles.fonts.robotoSansSerif,
      hoverCursor: 'text',
      textAlign: 'center',
      name: subtitleName,
      padding: 2,
      height: 300,
      splitByGrapheme: true,
      originX: 'center',
      originY: 'center',
    });


    canvas?.add(title, subtitle);
    canvas?.renderAll();
  }


  return {
    title,
    subtitle,
    heading,
    paragraph,
    ColorFillForObjects,
    ColorForText,
    ColorForBorder,
    handleBold,
    handleItalic,
    handleUnderLine,
    addTitleAndSubTileSlide
  };
}
