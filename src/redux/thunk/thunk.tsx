import ENDPOINT from '@/constants/endpoint';
import { FetchUtils, generateInstance } from '@/utils/fetch-utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setVariantImageAsMain } from '../reducers/canvas';

export interface VariantsType {
  pptUrl: string;
  imagesUrl: string;
}

interface ISlideRequests {
  pptUrl: string;
  imageUrl: string;
  variants: VariantsType[];
  isLoading: boolean;
}

interface IShapeRequest {
  companyName: string;
  shape: string;
  data: string[];
}

const initialState: ISlideRequests = {
  pptUrl: '',
  imageUrl: '',
  variants: [],
  isLoading: false,
};

export const fetchSlideImg = createAsyncThunk(
  'slide/fetchimage-ppt',
  async (req: IShapeRequest, { dispatch }) => {
    const res = await FetchUtils.postRequest(`${ENDPOINT.GEN_PPT}`, req);
    dispatch(setVariantImageAsMain(res.data.imageUrl));
    return res.data;
  }
);

const thunkSlice = createSlice({
  name: 'singleSlideData',
  initialState,
  reducers: {
    swapMainCanvas(state, action) {
      const { canvasLink, index, pptLink } = action.payload;
      console.log(action.payload);
      let variants = [...state.variants];
      variants[index].pptUrl = state.pptUrl;
      variants[index].imagesUrl = state.imageUrl;
      state.imageUrl = canvasLink;
      state.pptUrl = pptLink;
      state.variants = variants;
    },
  },
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

export const { swapMainCanvas } = thunkSlice.actions;
export default thunkSlice.reducer;
