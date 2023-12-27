import ENDPOINT from '@/constants/endpoint';
import { generateInstance } from '@/utils/fetch-utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

interface ISlideRequests {
  pptUrl: string;
  imageUrl: string;
}

interface IShapeRequest {
  companyName: string;
  shape: string;
  data: string[];
}
const initialState: ISlideRequests = {
  pptUrl: '',
  imageUrl: '',
};
export const fetchSlideImg = createAsyncThunk(
  'slide/fetchimage-ppt',
  async (req: IShapeRequest) => {
    const res = await generateInstance.post(`${ENDPOINT.GEN_PPT}`, req);
    toast.success('Slide Regenerated');
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
      })
      .addCase(fetchSlideImg.fulfilled, (state, action) => {
        state.pptUrl = action.payload.pptUrl;
        state.imageUrl = action.payload.imagesUrl[0];
      });
  },
});

export default thunkSlice.reducer;
