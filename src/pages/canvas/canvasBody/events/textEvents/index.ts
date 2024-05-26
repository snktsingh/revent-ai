import {
  BULLET_POINTS,
  CONCLUSION_SLIDE_SUBTITLE,
  CONCLUSION_SLIDE_TITLE,
  COVER_SLIDE_SUBTITLE,
  COVER_SLIDE_TITLE,
  CYCLE_TEXT,
  FUNNEL_TEXT,
  LIST_TEXT,
  PARAGRAPH,
  PROCESS_TEXT,
  PYRAMID,
  PYRAMID_TEXT,
  QUOTE,
  QUOTE_AUTHOR,
  QUOTE_TEXT,
  SECTION_SLIDE_SUBTITLE,
  SECTION_SLIDE_TITLE,
  SUBTITLE,
  SWOT_TEXT,
  TIMELINE_HEADING,
  TIMELINE_TEXT,
  TITLE,
} from '@/constants/elementNames';
import { theme } from '@/constants/theme';
import { fabric } from 'fabric';
export function useTextEvents() {
  const removePlaceholderText = (
    canvas: fabric.Canvas,
    object: fabric.Object
  ) => {
    if (object instanceof fabric.Textbox) {
      let textBox = object as fabric.Textbox;
      if (
        textBox.text === 'Click to add a title' ||
        textBox.text === 'Click to add a subtitle' ||
        textBox.text === 'Click to add a heading' ||
        textBox.text === 'Click to add a paragraph' ||
        textBox.text === 'Click to add a bullet point'
      ) {
        textBox.set({ text: '' });
        textBox.set({
          fill: theme.colorSchemes.light.palette.common.black,
        });
        if (textBox.isEditing) {
          textBox.exitEditing();
        }
      } else if (
        (textBox.text === 'Add Text' &&
          textBox.name?.startsWith(TIMELINE_TEXT)) ||
        (textBox.text === 'Add Timeline' &&
          textBox.name?.startsWith(TIMELINE_HEADING))
      ) {
        textBox.set({ text: '' });
        textBox.set({
          fill: theme.colorSchemes.light.palette.common.black,
        });
        if (!textBox.isEditing) {
          textBox.enterEditing();
        }
      } else if (
        textBox.text === 'Add Text' &&
        textBox.name?.startsWith(PROCESS_TEXT)
      ) {
        textBox.set({ text: '' });
        if (!textBox.isEditing) {
          textBox.enterEditing();
        }
      } else if (
        (textBox.text === 'Add Text' &&
          textBox.name?.startsWith(PYRAMID_TEXT)) ||
        (textBox.text === 'Add Text' && textBox.name?.startsWith(FUNNEL_TEXT))
      ) {
        textBox.set({ text: '' });
        if (!textBox.isEditing) {
          textBox.enterEditing();
        }
      } else if (
        textBox.name === QUOTE_TEXT &&
        textBox.text === '❝Click to add a quote❞'
      ) {
        textBox.set({ text: '❝❞' });
        if (!textBox.isEditing) {
          textBox.enterEditing();
        }
      } else if (
        textBox.text === 'Add Text' &&
        textBox.name?.startsWith(CYCLE_TEXT)
      ) {
        textBox.set({ text: '' });
        if (!textBox.isEditing) {
          textBox.enterEditing();
        }
      }else if (
        textBox.text === '- Author Name' &&
        textBox.name?.startsWith(QUOTE_AUTHOR)
      ) {
        textBox.set({ text: '' });
        if (!textBox.isEditing) {
          textBox.enterEditing();
        }
      }else if (
        textBox.text === 'Add Text' &&
        textBox.name?.startsWith(LIST_TEXT)
      ) {
        textBox.set({ text: '' });
        if (!textBox.isEditing) {
          textBox.enterEditing();
        }
      } else if (
        textBox.text === 'Add Text' &&
        textBox.name?.startsWith(SWOT_TEXT)
      ) {
        textBox.set({ text: '' });
        if (!textBox.isEditing) {
          textBox.enterEditing();
        }
      }
    }
    canvas.renderAll();
  };

  const textEnteringEvent = (canvas: fabric.Canvas, object: fabric.Object) => {
    if (object instanceof fabric.Textbox) {
      let textBox = object as fabric.Textbox;
      if (
        textBox.text === 'Click to add a title' ||
        textBox.text === 'Click to add a subtitle' ||
        textBox.text === 'Click to add a heading' ||
        textBox.text === 'Click to add a paragraph' ||
        textBox.text === 'Click to add a bullet point'
      ) {
        textBox.set({ text: '' });
        textBox.enterEditing();
        // textBox.selectAll();
      } else if (
        (textBox.text === 'Add Text' &&
          textBox.name?.startsWith(TIMELINE_TEXT)) ||
        (textBox.text === 'Add Timeline' &&
          textBox.name?.startsWith(TIMELINE_HEADING))
      ) {
        // textBox.set({ text: '' });
        // textBox.set({
        //   fill: theme.colorSchemes.light.palette.common.black,
        // });
        textBox.enterEditing();
        textBox.selectAll();
      } else if (
        textBox.text === 'Add Text' &&
        textBox.name?.startsWith(PROCESS_TEXT)
      ) {
        // textBox.set({ text: '' });
        textBox.enterEditing();
        textBox.selectAll();
      } else if (
        (textBox.text === 'Add Text' &&
          textBox.name?.startsWith(PYRAMID_TEXT)) ||
        (textBox.text === 'Add Text' && textBox.name?.startsWith(FUNNEL_TEXT))
      ) {
        // textBox.set({ text: '' });
        textBox.enterEditing();
        textBox.selectAll();
      } else if (
        textBox.name === QUOTE &&
        textBox.text === '❝Click to add a quote❞'
      ) {
        textBox.enterEditing();
        textBox.selectionStart = 1;
        textBox.selectionEnd = 21;
      }else if (
        textBox.text === 'Add Text' &&
        textBox.name?.startsWith(SWOT_TEXT)
      ) {
        textBox.set({ text: '' });
        if (!textBox.isEditing) {
          textBox.enterEditing();
        }
      }
      canvas.requestRenderAll();
    }
  };

  const textExitedEvent = (canvas: fabric.Canvas, object: fabric.Object) => {
    let textBox = object as fabric.Textbox | fabric.Text | fabric.IText;
    switch (textBox.name) {
      case TITLE:
        if (textBox.text == '') {
          textBox.text = 'Click to add a title';
          textBox.set({
            fill: '#404040',
          });
        }
        canvas.renderAll();
        break;
      case SUBTITLE:
        if (textBox.text == '') {
          textBox.text = 'Click to add a subtitle';
          textBox.set({
            fill: '#404040',
          });
        }
        canvas.renderAll();
        break;
      case PARAGRAPH:
        if (textBox.text == '') {
          textBox.text = 'Click to add a paragraph';
          textBox.set({
            fill: '#404040',
          });
        }
        canvas.renderAll();
        break;
      case BULLET_POINTS:
        if (textBox.text == '') {
          textBox.text = 'Click to add a bullet point';
          textBox.set({
            fill: '#404040',
          });
        }
        canvas.renderAll();
        break;
      case COVER_SLIDE_TITLE:
      case SECTION_SLIDE_TITLE:
      case CONCLUSION_SLIDE_TITLE:
        if (textBox.text == '') {
          textBox.text = 'Click to add a title';
          textBox.set({
            fill: '#404040',
          });
        }
        canvas.renderAll();
        break;
      case COVER_SLIDE_SUBTITLE:
      case SECTION_SLIDE_SUBTITLE:
      case CONCLUSION_SLIDE_SUBTITLE:
        if (textBox.text == '') {
          textBox.text = 'Click to add a subtitle';
          textBox.set({
            fill: '#404040',
          });
        }
        canvas.renderAll();
        break;
      // case 'TableText_':
      //   if (textBox.text == '') {
      //     textBox.text = 'Add Text';
      //     textBox.set({
      //       fill: '#404040',
      //     });
      //   }
      //   canvas.renderAll();
      //   break;
      default:
        break;
    }
    if (
      textBox.name?.startsWith(PYRAMID_TEXT) ||
      textBox.name?.startsWith(FUNNEL_TEXT) ||
      textBox.name?.startsWith(TIMELINE_TEXT) ||
      textBox.name?.startsWith(SWOT_TEXT) 
    ) {
      if (textBox.text == '') {
        textBox.text = 'Add Text';
        // textBox.set({
        //   fill: '#404040',
        // });
      }
      canvas.renderAll();
    } else if (textBox.name?.startsWith(TIMELINE_HEADING)) {
      if (textBox.text == '') {
        textBox.text = 'Add Timeline';
        textBox.set({
          fill: '#404040',
        });
      }
      canvas.renderAll();
    } else if (
      textBox.name?.startsWith(CYCLE_TEXT) ||
      textBox.name?.startsWith(PROCESS_TEXT)
    ) {
      if (textBox.text == '') {
        textBox.text = 'Add Text';
        // textBox.set({
        //   fill: theme.colorSchemes.light.palette.common.white,
        // });
      }
      canvas.renderAll();
    }else if (
      textBox.name?.startsWith(QUOTE_TEXT)
    ) {
      if (textBox.text == '' || textBox.text == '❝❞') {
        textBox.text = '❝Click to add a quote❞';
      }
      canvas.renderAll();
    }else if (
      textBox.name?.startsWith(QUOTE_AUTHOR)
    ) {
      if (textBox.text == '') {
        textBox.text = '- Author Name';
      }
      canvas.renderAll();
    }else if (
      textBox.name?.startsWith(LIST_TEXT)
    ) {
      if (textBox.text == '') {
        textBox.text = 'Add Text';
      }
      canvas.renderAll();
    }
  };
  return { textEnteringEvent, textExitedEvent, removePlaceholderText };
}
