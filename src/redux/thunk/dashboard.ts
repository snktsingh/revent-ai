import ENDPOINT from '@/constants/endpoint';
import { FetchUtils } from '@/utils/fetch-utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  pptList: [],
  loadingUserDetails: true,
};

export const fetchPPTList = createAsyncThunk('dashboard/pptList', async () => {
  const res = await FetchUtils.getRequest(
    `${ENDPOINT.DASHBOARD.FETCH_PPT_LIST}?size=10&page=0`
  );
  return res.data;
});

export const deletePresentation = createAsyncThunk(
  'dashboard/deletePresentation',
  async (presentationId: number) => {
    const res = await FetchUtils.deleteRequest(
      `${ENDPOINT.PPT.DELETE_PPT}?presentationId=${presentationId}`
    );
    return res.data;
  }
);

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
        state.pptList = action.payload;
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
