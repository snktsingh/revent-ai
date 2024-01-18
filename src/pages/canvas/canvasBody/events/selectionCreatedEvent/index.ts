import { handleInputSize } from "@/redux/reducers/canvas";
import { useAppDispatch } from "@/redux/store";
import { fabric } from "fabric";
import { IExtendedTextboxOptions } from "../../elements";
export function useSelectionCreatedEvent(){

    const dispatch = useAppDispatch();

    const handleSelectionCreated = (
        canvas: fabric.Canvas,
        event: fabric.IEvent<MouseEvent>
      ) => {
        const activeObject = event.selected;
    
        if (activeObject?.length === 1) {
          if (activeObject[0].type == 'text' || activeObject[0].type == 'textbox') {
            dispatch(handleInputSize((activeObject[0] as any)?.fontSize));
          }
        }
    
        canvas.forEachObject(function (obj) {
          const extendedTextbox = obj as IExtendedTextboxOptions;
          if (extendedTextbox?.listType == 'bullet') {
            const renderTextLine = function (
              this: any,
              method: any,
              ctx: any,
              line: any,
              left: any,
              top: any,
              lineIndex: any
            ) {
              const style0 = this.getCompleteStyleDeclaration(lineIndex, 0);
    
              // Determine the list type
              const bullet =
                this.listType === 'numbered'
                  ? [this.listCounter + '.']
                  : [this.listBullet];
    
              const bulletLeft = left - style0.fontSize - 2;
    
              if (line.length) {
                if (!this.isWrapping) {
                  this._renderChars(
                    method,
                    ctx,
                    bullet,
                    bulletLeft,
                    top,
                    lineIndex
                  );
                  this.isWrapping = !this.isEndOfWrapping(lineIndex);
                  if (!this.isWrapping) {
                    if (this.listType === 'numbered') {
                      this.listCounter++;
                    }
                  }
                } else if (this.isEndOfWrapping(lineIndex)) {
                  this.isWrapping = false;
                  if (this.listType === 'numbered') {
                    this.listCounter++;
                  }
                }
              }
    
              if (lineIndex === this.textLines.length - 1) {
                this.isWrapping = false;
                this.listCounter = 1;
              }
    
              this._renderChars(method, ctx, line, left, top, lineIndex);
            };
            extendedTextbox._renderTextLine = renderTextLine;
            extendedTextbox.dirty = true;
          }
        });
      };
      return { handleSelectionCreated };
}