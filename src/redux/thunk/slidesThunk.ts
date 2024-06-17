import { Add } from '@/constants/media';
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
        console.log({req})
        try {
            const res = await FetchUtils.putRequest(`${ENDPOINT.PPT.REORDER_SLIDES}`, req);
            return res;
        } catch (error) {
            return error;
        }
    }
);

//Add a New Slide
export const addNewSlideApi = createAsyncThunk(
    'slide-addNewSlide',
    async ({pId, slideNo} : {pId : number, slideNo : number}) => {
        try {
            const res = await FetchUtils.postRequest(`${ENDPOINT.PPT.ADD_SLIDE}?presentationId=${pId}&slideNumber=${slideNo}`, null);
            return res.data;
        } catch (error) {
           return error; 
        }
    }
);

//Delete a Slide
export const deleteSlideApi = createAsyncThunk(
    'slide-deleteSlide',
    async ({pId, slideNo} : {pId : number, slideNo : number}) => {
        try{
            const res = await FetchUtils.postRequest(`${ENDPOINT.PPT.DELETE_SLIDE}?presentationId=${pId}&slideNumber=${slideNo}`, null)
        } catch (error) {
            return error;
        }
    }
);

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