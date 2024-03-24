import ENDPOINT from '@/constants/endpoint';
import { FetchUtils } from '@/utils/fetch-utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setVariantImageAsMain, updateCurrentCanvas } from '../reducers/canvas';
import { APIRequest, ISlideRequests } from '@/interface/storeTypes';
import { RootState } from '../store';
import { IUserLogin } from '@/interfaces/authInterface';
import { create } from 'lodash';

const initialState: ISlideRequests = {
  pptUrl: '',
  imageUrl: '',
  variants: [],
  isLoading: false,
  themesList: [],
  isThemeLoading: false,
  presentationId: null,
  presentationName: '',
  isCreating: false,
};

export const fetchSlideImg = createAsyncThunk(
  'slide/fetchimage-ppt',
  async (req: APIRequest | null, { dispatch, getState }) => {
    const res = await FetchUtils.postRequest(`${ENDPOINT.GEN_PPT_MULTI}`, req);
    dispatch(setVariantImageAsMain(res.data.variants[0].imagesUrl));
    const currentCanvas = (getState() as RootState).canvas.canvasJS;
    const updatedCanvasVariants = {
      ...currentCanvas,
      variants: res.data.variants,
    };
    dispatch(updateCurrentCanvas(updatedCanvasVariants));
    return res.data;
  }
);

// Get All Themes on Canvas
export const getAllThemes = createAsyncThunk('theme/getallThemes', async () => {
  const res = await FetchUtils.getRequest(`${ENDPOINT.THEMES.GET_ALL_THEMES}`);
  return res.data;
});

export const createPresentation = createAsyncThunk('ppt/create', async () => {
  const res = await FetchUtils.postRequest(`${ENDPOINT.PPT.CREATE_PPT}`, {
    presentationName: 'untitled-presentation',
  });
  return res.data;
});

const thunkSlice = createSlice({
  name: 'singleSlideData',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSlideImg.pending, (state, action) => {
        state.pptUrl = '';
        state.imageUrl = '';
        state.variants = [];
        state.isLoading = true;
      })
      .addCase(fetchSlideImg.fulfilled, (state, action) => {
        state.pptUrl = action.payload.pptUrl;
        state.imageUrl = action.payload.imagesUrl;
        state.variants = action.payload.variants;
        state.isLoading = false;
      })
      .addCase(fetchSlideImg.rejected, (state, action) => {
        state.imageUrl = '';
        state.pptUrl = '';
        state.isLoading = false;
        state.variants = [];
      })
      .addCase(getAllThemes.pending, state => {
        state.isThemeLoading = true;
      })
      .addCase(getAllThemes.fulfilled, (state, action) => {
        state.isThemeLoading = false;
        state.themesList = action.payload;
      })
      .addCase(getAllThemes.rejected, state => {
        state.themesList = [];
        state.isThemeLoading = false;
      })
      .addCase(createPresentation.pending, state => {
        state.presentationId = null;
        state.isCreating = true;
      })
      .addCase(createPresentation.fulfilled, (state, action) => {
        state.presentationId = action.payload.presentationId;
        state.isCreating = false;
      })
      .addCase(createPresentation.rejected, state => {
        state.presentationId = null;
        state.isCreating = false;
      });
  },
});

export default thunkSlice.reducer;
