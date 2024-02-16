import {
  BULLET_POINTS,
  CYCLE_TEXT,
  FUNNEL_TEXT,
  PARAGRAPH,
  PROCESS_TEXT,
  PYRAMID,
  PYRAMID_TEXT,
  SUBTITLE,
  TIMELINE_HEADING,
  TIMELINE_TEXT,
  TITLE,
} from '@/constants/elementNames';
import { theme } from '@/constants/theme';
import { fabric } from 'fabric';
export function useTextEvents() {
  const textEnteringEvent = (canvas: fabric.Canvas, object: fabric.Object) => {
    if (object) {
      let textBox = object as fabric.Textbox;
      if (
        textBox?.text == 'Click to add a title' ||
        textBox?.text == 'Click to add a subtitle' ||
        textBox?.text == 'Click to add a heading' ||
        textBox?.text == 'Click to add a paragraph' ||
        textBox?.text == 'Click to add a bullet point'
      ) {
        // Clear the placeholder text and make it selectable
        textBox.text = '';
        // Set focus on the textbox
        textBox.enterEditing();
        textBox.set({
          fill: theme.colorSchemes.light.palette.common.black,
        });
        canvas.renderAll();
      } else if (textBox.text == 'Add Text' || textBox.text === 'Add Timeline') {
        textBox.text = '';
        // Set focus on the textbox
        canvas.renderAll();
      }
    }
  };

  const textExitedEvent = (
    canvas: fabric.Canvas,
    object: fabric.Textbox | fabric.Text | fabric.IText
  ) => {
    let textBox = object;
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
    if (textBox.name?.startsWith(PYRAMID_TEXT) || textBox.name?.startsWith(FUNNEL_TEXT) || textBox.name?.startsWith(TIMELINE_TEXT)) {
      if (textBox.text == '') {
        textBox.text = 'Add Text';
        textBox.set({
          fill: '#404040',
        });
      }
      canvas.renderAll();
    }else if (textBox.name?.startsWith(TIMELINE_HEADING)) {
      if (textBox.text == '') {
        textBox.text = 'Add Timeline';
        textBox.set({
          fill: '#404040',
        });
      }
      canvas.renderAll();
    }else if (textBox.name?.startsWith(CYCLE_TEXT) || textBox.name?.startsWith(PROCESS_TEXT)) {
      if (textBox.text == '') {
        textBox.text = 'Add Text';
        textBox.set({
          fill: theme.colorSchemes.light.palette.common.white,
        });
      }
      canvas.renderAll();
    }
  };
  return { textEnteringEvent, textExitedEvent };
}
