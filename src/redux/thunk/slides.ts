import ENDPOINT from "@/constants/endpoint";
import { FetchUtils } from "@/utils/fetch-utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    slides : []
}

//Re- Order slides

export const reorderSlidesApi = createAsyncThunk(
    'slides-reorderSlides',
    async (req : any) => {
        try {
            const res = await FetchUtils.putRequest(`${ENDPOINT.PPT.REORDER_SLIDES}`, req);
            return res;
        } catch (error) {
            return error;
        }
    }
)

const slidesThunk = createSlice({
    name: 'user-management',
    initialState,
    reducers: {},
    extraReducers: builder => {
      builder
    }
});

export const {} = slidesThunk.actions;

export default slidesThunk.reducer;