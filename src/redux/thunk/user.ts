import ENDPOINT from '@/constants/endpoint';
import { IUserAccountDetails } from '@/interfaces/authInterface';
import { IUserDetails } from '@/interfaces/userInterface';
import { FetchUtils } from '@/utils/fetch-utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState: IUserDetails = {
  userDetails: null,
  creditAmount : 0,
};

export const getUserDetails = createAsyncThunk(
  'user/fetch_details',
  async () => {
    const res = await FetchUtils.getRequest(`${ENDPOINT.USER.GET_DETAILS}`);
    return res.data;
  }
);

export const updateUserDetails = createAsyncThunk(
  'user/update_details',
  async (updatedUserDetails : IUserAccountDetails) => {
    const res = await FetchUtils.postRequest(`${ENDPOINT.USER.GET_DETAILS}`,updatedUserDetails);
    return res.data;
  }
);

export const getUserCredit = createAsyncThunk(
  'user/get_credits',
  async () => {
    const res = await FetchUtils.getRequest(`${ENDPOINT.USER.CREDIT_AMOUNT}`);
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
      })
      .addCase(getUserCredit.pending, (state, action) => {
        state.creditAmount = 0;
      })
      .addCase(getUserCredit.fulfilled, (state, action) => {
        state.creditAmount = action.payload.credit;
      })
      .addCase(getUserCredit.rejected, (state, action) => {
        state.creditAmount = 0;
      });

  },
});
export const {} = userSlice.actions;

export default userSlice.reducer;
