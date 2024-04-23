import { APIRequest } from '@/interface/storeTypes';
import { getFromLS } from '@/utils/localStorage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface apiDataInitialState {
  requestData: APIRequest | null;
  isAuth: any;
  isDisabled: boolean;
  enhancementWithAI: boolean;
}

const initialState: apiDataInitialState = {
  requestData: null,
  isAuth: getFromLS('isAuth'),
  isDisabled: false,
  enhancementWithAI : false,
};

export const apiDataReducer = createSlice({
  name: 'apiData',
  initialState,
  reducers: {
    setRequestData(state, action: PayloadAction<APIRequest>) {
      state.requestData = action.payload;
    },
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setFormDisabled: state => {
      state.isDisabled = !state.isDisabled;
    },
    updateCheckboxForAI(state,action : PayloadAction<boolean>) {
      state.enhancementWithAI = action.payload;
    }
  },
});

export const { setRequestData, setAuth, setFormDisabled, updateCheckboxForAI } =
  apiDataReducer.actions;
export default apiDataReducer.reducer;
