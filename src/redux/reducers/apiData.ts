import { APIRequest } from '@/interface/storeTypes';
import { createSlice } from '@reduxjs/toolkit';

export interface apiDataInitialState {
  requestData: APIRequest;
}

const initialState = {
  requestData: {},
};

export const apiDataReducer = createSlice({
  name: 'apiDataReducer',
  initialState,
  reducers: {
    setRequestData(state, action) {
      state.requestData = action.payload;
    },
  },
});

export const { setRequestData } = apiDataReducer.actions;
export default apiDataReducer.reducer;
