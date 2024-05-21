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
      `${ENDPOINT.DASHBOARD.FETCH_PPT_LIST}?size=100&page=${pageNo}`
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
          state.pptList = action.payload;
        } else {
          state.pptList = [...state.pptList, ...action.payload];
        }
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
