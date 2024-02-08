import { createSlice } from '@reduxjs/toolkit';

interface slideThemes {
  openAddTheme: boolean;
  themeCode: string;
}

const initialState: slideThemes = {
  openAddTheme: false,
  themeCode: '',
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
  },
});

export const { setNewTheme, setThemeCode } = themeReducer.actions;
export default themeReducer.reducer;
