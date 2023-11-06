import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fabric } from 'fabric';

export interface CanvasSate {
  color: string;
  textColor: string;
  borderColor: string;
}

export const initialState: CanvasSate = {
  color: '',
  textColor: '',
  borderColor: '',
};

export const CanvasReducer = createSlice({
  name: 'element',
  initialState,
  reducers: {
    setColor(state, action) {
      state.color = action.payload;
    },
    setTextColor: (state, action) => {
      state.textColor = action.payload;
    },
    setBorderColor: (state, action) => {
      state.borderColor = action.payload;
    },
  },
});

export const { setColor, setTextColor, setBorderColor } = CanvasReducer.actions;

export default CanvasReducer.reducer;
