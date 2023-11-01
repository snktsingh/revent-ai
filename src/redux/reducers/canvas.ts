import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fabric } from 'fabric';

export interface CanvasSate {
  canvasData: fabric.Canvas | any;
  color: string;
  canvasRef: React.MutableRefObject<HTMLCanvasElement> | null;
  textColor: string;
  borderColor: string;
}

export const initialState: CanvasSate = {
  canvasData: null,
  color: '',
  canvasRef: null,
  textColor: '',
  borderColor: '',
};

export const CanvasReducer = createSlice({
  name: 'element',
  initialState,
  reducers: {
    setCanvas(state, action) {
      state.canvasData = action.payload;
    },
    setColor(state, action) {
      state.color = action.payload;
    },
    setCanvasRef: (state, action) => {
      state.canvasRef = action.payload;
    },
    setTextColor: (state, action) => {
      state.textColor = action.payload;
    },
    setBorderColor: (state, action) => {
      state.borderColor = action.payload;
    },
  },
});

export const {
  setCanvas,
  setColor,
  setCanvasRef,
  setTextColor,
  setBorderColor,
} = CanvasReducer.actions;

export default CanvasReducer.reducer;
