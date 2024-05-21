import ENDPOINT from '@/constants/endpoint';
import { FetchUtils } from '@/utils/fetch-utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface IPresentation {
  code: number;
  message: string;
  presentationId: number;
  name: string;
  thumbnailUrl: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
}

interface IDashboard {
  pptList: IPresentation[];
  loadingUserDetails: boolean;
  hasMore: boolean;
}

const initialState: IDashboard = {
  pptList: [],
  loadingUserDetails: true,
  hasMore: true,
};

export const fetchPPTList = createAsyncThunk(
  'dashboard/pptList',
  async (pageNo: number) => {
    const res = await FetchUtils.getRequest(
      `${ENDPOINT.DASHBOARD.FETCH_PPT_LIST}?size=12&page=${pageNo}`
    );
    return res.data;
  }
);

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
        state.loadingUserDetails = true;
      })
      .addCase(fetchPPTList.fulfilled, (state, action) => {
        if (action.meta.arg === 0) {
          // If it's the first page, replace the list
          state.pptList = action.payload;
        } else {
          // Append new presentations to the existing list
          state.pptList = [...state.pptList, ...action.payload];
        }
        // Check if the number of items fetched is less than the expected size (12)
        state.hasMore = action.payload.length === 12;
        state.loadingUserDetails = false;
      })
      .addCase(fetchPPTList.rejected, (state, action) => {
        state.loadingUserDetails = false;
      });
  },
});
export const {} = dashboardSlice.actions;

export default dashboardSlice.reducer;
