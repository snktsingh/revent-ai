import { createSlice } from '@reduxjs/toolkit';

interface slideThemes {
  openAddTheme: boolean;
}

const initialState: slideThemes = {
  openAddTheme: false,
};

export const themeReducer = createSlice({
  name: 'elementsId',
  initialState,
  reducers: {
    setNewTheme: (state, action) => {
      state.openAddTheme = action.payload;
    },
  },
});

export const { setNewTheme } = themeReducer.actions;
export default themeReducer.reducer;
