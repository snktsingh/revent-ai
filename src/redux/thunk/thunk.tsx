import ENDPOINT from '@/constants/endpoint';
import { FetchUtils, generateInstance } from '@/utils/fetch-utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setVariantImageAsMain } from '../reducers/canvas';
import { IShapeRequest, ISlideRequests } from '@/interface/storeTypes';

const initialState: ISlideRequests = {
  pptUrl: '',
  imageUrl: '',
  variants: [],
  isLoading: false,
};

export const fetchSlideImg = createAsyncThunk(
  'slide/fetchimage-ppt',
  async (req: IShapeRequest, { dispatch }) => {
    const res = await FetchUtils.postRequest(`${ENDPOINT.GEN_PPT_MULTI}`, req);
    dispatch(setVariantImageAsMain(res.data.variants[0].imagesUrl));
    console.log(res.data)
    return res.data;
  }
);

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
      });
  },
});

export default thunkSlice.reducer;
