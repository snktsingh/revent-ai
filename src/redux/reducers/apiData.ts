import { APIRequest } from '@/interface/storeTypes';
import { getFromLS } from '@/utils/localStorage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface apiDataInitialState {
  requestData: APIRequest | null;
  isAuth: any;
  isDisabled: boolean;
}

const initialState: apiDataInitialState = {
  requestData: null,
  isAuth: getFromLS('isAuth'),
  isDisabled: false,
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
  },
});

export const { setRequestData, setAuth, setFormDisabled } =
  apiDataReducer.actions;
export default apiDataReducer.reducer;
