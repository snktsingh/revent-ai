import { createSlice } from '@reduxjs/toolkit';

interface slideThemes {
  openAddTheme: boolean;
  themeCode: string;
  jsonData: any;
  themeName: string;
  selectedThemeId: string;
}

const initialState: slideThemes = {
  openAddTheme: false,
  themeCode: '#004FBA',
  themeName: 'REVENT',
  jsonData: null,
  selectedThemeId: '',
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
    setThemeName: (state, action) => {
      state.themeName = action.payload;
    },
    setPptData: (state, action) => {
      state.jsonData = action.payload;
    },
    setSelectedTheme: (state, action) => {
      state.selectedThemeId = action.payload;
    },
  },
});

export const {
  setNewTheme,
  setThemeCode,
  setPptData,
  setThemeName,
  setSelectedTheme,
} = themeReducer.actions;
export default themeReducer.reducer;
