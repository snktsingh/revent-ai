import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fabric } from 'fabric';

export interface TableDetails {
  row:number;
  col:number;
  width:number;
  height:number;
}
interface CanvasItem {
  id: number; // Use number as ID type
  canvas: object;
}

interface CanvasJSON {
  id: number,
  canvas: object |null
}
export interface CanvasSate {
  color: string;
  textColor: string;
  borderColor: string;
  tableDetails: TableDetails | null;
  canvasList : CanvasItem[];
  canvasJS : CanvasJSON;
}
let canvasID =1;
const canvas = new fabric.Canvas(null);
const canvasJSON = canvas.toJSON();

export const initialState: CanvasSate = {
  color: '',
  textColor: '',
  borderColor: '',
  tableDetails: null,
  canvasList:[{id:canvasID++,canvas: canvasJSON}],
  canvasJS : {id:1,canvas: canvasJSON}
};

let list = []

export const CanvasReducer = createSlice({
  name: 'element',
  initialState,
  reducers: {
    initializeCanvas(state) {
      const canvas = new fabric.Canvas(null);
      const canvasJSON = canvas.toJSON();
      // state.canvasJS = canvasJSON;
      // state.canvasList.push(canvasJSON);
    },
    setCanvas(state,action) {
      state.canvasJS = action.payload;
    },
    addCanvas(state){
      const canvas = new fabric.Canvas(null);
      const canvasJSON = canvas.toJSON();
      let newCanvas = {id:canvasID++,canvas: canvasJSON}
;      state.canvasJS = newCanvas;
      state.canvasList.push(newCanvas);
    },
    setColor(state, action) {
      state.color = action.payload;
    },
    setTextColor: (state, action) => {
      state.textColor = action.payload;
    },
    setBorderColor: (state, action) => {
      state.borderColor = action.payload;
    },
    setTableDetails: (state,action) => {
      state.tableDetails=action.payload;
    },
    updateCanvasInList(state, action) {
      console.log(action.payload);
      const updatedCanvas = action.payload;
      if(list.length===0){
        list = state.canvasList.map(canvasItem =>
          canvasItem.id === updatedCanvas.id ? updatedCanvas : canvasItem
        );

      }

      list = list.map(canvasItem =>
        canvasItem.id === updatedCanvas.id ? updatedCanvas : canvasItem
      );
    
      console.log(list);
    },
  },
});

export const {
  initializeCanvas,
  setCanvas,
  addCanvas,
  setColor,
  setTextColor,
  setBorderColor,
  setTableDetails,
  updateCanvasInList
} = CanvasReducer.actions;

export default CanvasReducer.reducer;
