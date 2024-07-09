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
            return res;
        } catch (error) {
           return error; 
        }
    }
);

//Delete a Slide
export const deleteSlideApi = createAsyncThunk(
    'slide-deleteSlide',
    async ({pId, slideID} : {pId : number, slideID : number}) => {
        try{
            const res = await FetchUtils.postRequest(`${ENDPOINT.PPT.DELETE_SLIDE}?presentationId=${pId}&slideId=${slideID}`, null)
            return res;
        } catch (error) {
            return error;
        }
    }
);

//Refresh PPT 
export const refreshPPTApi = createAsyncThunk(
    'slide-refreshPPT',
    async (req :any) => {
        try {
            const res = await FetchUtils.postRequest(`${ENDPOINT.PPT.REFRESH_PPT}`, req);
            return res;
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