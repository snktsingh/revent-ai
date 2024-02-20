import { createSlice } from '@reduxjs/toolkit';

interface slideThemes {
  openAddTheme: boolean;
  themeCode: string;
  jsonData: any;
}

const initialState: slideThemes = {
  openAddTheme: false,
  themeCode: '#004FBA',
  jsonData: null,
};

export const themeReducer = createSlice({
  name: 'elementsId',
  initialState,
  reducers: {
    setNewTheme: (state, action) => {
      state.openAddTheme = action.payload;
    },
    setThemeCode: (state, action) => {
      state.themeCode = action.payload;
    },
    setPptData: (state, action) => {
      state.jsonData = action.payload;
    },
  },
});

export const { setNewTheme, setThemeCode, setPptData } = themeReducer.actions;
export default themeReducer.reducer;
