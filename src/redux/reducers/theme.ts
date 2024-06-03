import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface slideThemes {
  openAddTheme: boolean;
  themeCode: string;
  jsonData: any;
  themeId: number;
  selectedThemeId: number;
  selectedDocFile: any;
}

const initialState: slideThemes = {
  openAddTheme: false,
  themeCode: '#004FBA',
  themeId: 1,
  jsonData: null,
  selectedThemeId: 0,
  selectedDocFile: null,
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
    setThemeId: (state, action: PayloadAction<number>) => {
      state.themeId = action.payload;
    },
    setPptData: (state, action) => {
      state.jsonData = action.payload;
    },
    setSelectedTheme: (state, action) => {
      state.selectedThemeId = action.payload;
    },
    setSelectedDocFile: (state, action) => {
      state.selectedDocFile = action.payload;
    },
  },
});

export const {
  setNewTheme,
  setThemeCode,
  setPptData,
  setThemeId,
  setSelectedTheme,
  setSelectedDocFile,
} = themeReducer.actions;
export default themeReducer.reducer;
