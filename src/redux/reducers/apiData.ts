import { APIRequest } from '@/interface/storeTypes';
import { createSlice } from '@reduxjs/toolkit';

export interface apiDataInitialState {
  requestData: APIRequest | null;
}

const initialState : apiDataInitialState = {
  requestData: null,
};

export const apiDataReducer = createSlice({
  name: 'apiData',
  initialState,
  reducers: {
    setRequestData(state, action) {
      state.requestData = action.payload;
    },
  },
});

export const { setRequestData } = apiDataReducer.actions;
export default apiDataReducer.reducer;
