import { TABLE_OF_CONTENTS_HEADING, TABLE_OF_CONTENTS_TEXT, TITLE } from "@/constants/elementNames";
import { customStyles } from "@/constants/theme";
import { IExtendedTextBoxOptions } from "@/interface/fabricTypes";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { renderBulletOrNumTextLine } from "@/utils/fabric-utils/renderBullet";
import { fabric } from "fabric";

export const useTableOfContents = () => {
    const dispatch = useAppDispatch();
    const {} = useAppSelector(state => state.elementsIds);

    const addTableOfContents = (canvas : fabric.Canvas) => {
        const title = new fabric.Textbox('Table Of Contents', {
            left: 15,
            top: 13,
            fontSize: 30,
            width: 400,
            fontWeight: 'bold',
            fontFamily : customStyles.fonts.robotoSansSerif,
            name: TITLE,
            fill: '#404040',
            charSpacing: 2,
            cursorDelay: 1,
            hoverCursor: 'text',
            padding: 5,
            splitByGrapheme: true,
          });

          const BulletText = new fabric.Textbox('Click to add Sections', {
            fontFamily : customStyles.fonts.robotoSansSerif,
            lineHeight: 1.4,
            left: 100,
            top: 75,
            width: 450,
            fontSize: 20,
            objectCaching: false,
            isWrapping: false,
            listType: 'bullet',
            listBullet: '\u2022',
            listCounter: 0,
            name: TABLE_OF_CONTENTS_TEXT,
            fill: '#404040',
          } as IExtendedTextBoxOptions);
          BulletText._renderTextLine = renderBulletOrNumTextLine;
        
          canvas.add(title);
          canvas.add(BulletText);
          canvas.renderAll();
    };


    return {
        addTableOfContents
    }
};