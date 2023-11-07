import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fabric } from 'fabric';

export interface TableDetails {
  row:number;
  col:number;
  width:number;
  height:number;
}

export interface CanvasSate {
  color: string;
  textColor: string;
  borderColor: string;
  tableDetails: TableDetails | null;
}

export const initialState: CanvasSate = {
  color: '',
  textColor: '',
  borderColor: '',
  tableDetails: null,
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
    setTableDetails: (state,action) => {
      state.tableDetails=action.payload;
    }
  },
});

export const {
  setColor,
  setTextColor,
  setBorderColor,
  setTableDetails
} = CanvasReducer.actions;

export default CanvasReducer.reducer;
