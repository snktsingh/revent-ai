import ENDPOINT from '@/constants/endpoint';
import { FetchUtils } from '@/utils/fetch-utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  pptList: [],
  loadingUserDetails: true,
};

export const fetchPPTList = createAsyncThunk('dashboard/pptList', async () => {
  const res = await FetchUtils.getRequest(
    `${ENDPOINT.DASHBOARD.FETCH_PPT_LIST}?presentationId=87`
  );
  return res.data;
});

const dashboardSlice = createSlice({
  name: 'dashboard-Data',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPPTList.pending, (state, action) => {
        state.pptList = [];
        state.loadingUserDetails = true;
      })
      .addCase(fetchPPTList.fulfilled, (state, action) => {
        state.pptList = action.payload.slides;
        state.loadingUserDetails = false;
      })
      .addCase(fetchPPTList.rejected, (state, action) => {
        state.pptList = [];
        state.loadingUserDetails = false;
      });
  },
});
export const {} = dashboardSlice.actions;

export default dashboardSlice.reducer;
