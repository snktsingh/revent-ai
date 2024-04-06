import ENDPOINT from '@/constants/endpoint';
import { IUserDetails } from '@/interfaces/userInterface';
import { FetchUtils } from '@/utils/fetch-utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState: IUserDetails = {
  userDetails: null,
};

export const getUserDetails = createAsyncThunk(
  'user/fetch_details',
  async () => {
    const res = await FetchUtils.getRequest(`${ENDPOINT.USER.GET_DETAILS}`);
    return res.data;
  }
);

const userSlice = createSlice({
  name: 'user-management',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUserDetails.pending, (state, action) => {
        state.userDetails = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.userDetails = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.userDetails = null;
      });
  },
});
export const {} = userSlice.actions;

export default userSlice.reducer;
