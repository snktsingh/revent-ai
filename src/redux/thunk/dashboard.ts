import ENDPOINT from '@/constants/endpoint';
import { FetchUtils } from '@/utils/fetch-utils';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IPresets {
  id: number;
  presetName: string;
}
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
  presetList: IPresets[];
  preset: any[];
  isPresetOpened : boolean;
}

const initialState: IDashboard = {
  pptList: [],
  loadingUserDetails: true,
  hasMore: true,
  presetList: [],
  preset: [],
  isPresetOpened : false,
};

export const fetchPPTList = createAsyncThunk(
  'dashboard/pptList',
  async (pageNo: number) => {
    const res = await FetchUtils.getRequest(
      `${ENDPOINT.DASHBOARD.FETCH_PPT_LIST}?size=1000&page=${pageNo}`
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
    return res;
  }
);

export const fetchPresets = createAsyncThunk(
  'dashboard,fetchPresets',
  async () => {
    const res = await FetchUtils.getRequest(
      `${ENDPOINT.DASHBOARD.FETCH_PRESETS}`
    );
    return res.data;
  }
);

export const fetchPresetsById = createAsyncThunk(
  'dashboard,fetchPresetsById',
  async (presetId: number) => {
    const res = await FetchUtils.getRequest(
      `${ENDPOINT.DASHBOARD.FETCH_PRESETS}/${presetId}`
    );
    return res.data.data;
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard-Data',
  initialState,
  reducers: {
    togglePresetOpened : (state, action : PayloadAction<boolean>) => {
       state.isPresetOpened = action.payload;
    },
    deletePresentationInPPtList: (state, action: PayloadAction<number>) => {
      state.pptList = state.pptList.filter(
        (ppt: IPresentation) => ppt.presentationId!== action.payload
      );
    }
  },
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
      })
      .addCase(fetchPresets.pending, (state, action) => {
        state.presetList = [];
      })
      .addCase(fetchPresets.fulfilled, (state, action) => {
        state.presetList = action.payload;
      })
      .addCase(fetchPresets.rejected, (state, action) => {
        state.presetList = [];
      })
      .addCase(fetchPresetsById.pending, (state, action) => {
        state.preset = [];
      })
      .addCase(fetchPresetsById.fulfilled, (state, action) => {
        state.preset = action.payload;
      })
      .addCase(fetchPresetsById.rejected, (state, action) => {
        state.preset = [];
      });
  },
});
export const {
  togglePresetOpened,
  deletePresentationInPPtList
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
