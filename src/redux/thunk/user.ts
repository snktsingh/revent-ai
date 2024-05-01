import ENDPOINT from '@/constants/endpoint';
import { IUserAccountDetails } from '@/interfaces/authInterface';
import { IUserDetails } from '@/interfaces/userInterface';
import { FetchNonHeaderNonJSONUtils, FetchNonHeaderUtils, FetchUtils } from '@/utils/fetch-utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState: IUserDetails = {
  userDetails: null,
  creditAmount: 0,
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
  async (updatedUserDetails: IUserAccountDetails) => {
    const res = await FetchUtils.postRequest(
      `${ENDPOINT.USER.GET_DETAILS}`,
      updatedUserDetails
    );
    return res.data;
  }
);

export const getUserCredit = createAsyncThunk('user/get_credits', async () => {
  const res = await FetchUtils.getRequest(`${ENDPOINT.USER.CREDIT_AMOUNT}`);
  return res.data;
});

// Reset Password Initialization
export const verifyEmailAddress = createAsyncThunk(
  'user/email_verification',
  async (email : string) => {
    const res = await FetchNonHeaderNonJSONUtils.postRequest(`${ENDPOINT.USER.RESET_PASS_INIT}`,email)
    return res.data;
  }
);

//Reset Password 
export const resetPassword = createAsyncThunk(
  'user/reset-password',
  async (passwordData : {key: string, newPassword : string}) => {
    try {
      const res = await FetchNonHeaderUtils.postRequest(`${ENDPOINT.USER.RESET_PASS_FINISH}`, passwordData);
      return res.data;
    } catch (error) {
      return error;
    }
  }
)

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
