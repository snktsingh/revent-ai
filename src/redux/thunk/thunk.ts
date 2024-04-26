import ENDPOINT from '@/constants/endpoint';
import { FetchUtils } from '@/utils/fetch-utils';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  setActiveSlideId,
  setCanvas,
  setVariantImageAsMain,
  toggleIsVariantSelected,
  updateCanvasList,
  updateCurrentCanvas,
} from '../reducers/canvas';
import { APIRequest, CanvasItem, ISlideRequests } from '@/interface/storeTypes';
import { RootState } from '../store';
import { IUserLogin } from '@/interfaces/authInterface';
import { create, forEach } from 'lodash';
import { IUpdatePptName } from '@/interfaces/pptInterfaces';
import { canvasData } from '@/utils/transformResData';
import { toggleSelectingSlide } from '../reducers/slide';

const initialState: ISlideRequests = {
  pptUrl: '',
  imageUrl: '',
  variants: [],
  isLoading: false,
  themesList: [],
  isThemeLoading: false,
  presentationId: null,
  presentationName: 'Untitled-Presentation',
  isAuthenticating: true,
  pptDetails: null,
  unAuthMessage: false,
  selectedSlideIndex: 0,
};

export const fetchSlideImg = createAsyncThunk(
  'slide/fetchimage-ppt',
  async (req: any, { dispatch, getState }) => {
    let isFormData = false;
    if (req instanceof FormData) {
      isFormData = true;
    }
    const res = await FetchUtils.postRequest(
      `${isFormData ? ENDPOINT.GEN_PPT_IMAGES : ENDPOINT.GEN_PPT_MULTI}`,
      req
    );
    dispatch(setVariantImageAsMain(res.data.variants[0].imagesUrl));
    dispatch(toggleIsVariantSelected(true));
    const currentCanvas = (getState() as RootState).canvas.canvasJS;
    const updatedCanvasVariants = {
      ...currentCanvas,
      variants: res.data.variants,
    };
    console.log(updatedCanvasVariants);
    dispatch(updateCurrentCanvas(updatedCanvasVariants));
    return res.data;
  }
);

// Get All Themes on Canvas
export const getAllThemes = createAsyncThunk('theme/getallThemes', async () => {
  const res = await FetchUtils.getRequest(`${ENDPOINT.THEMES.GET_ALL_THEMES}`);
  return res.data;
});

// Create a new presentation
export const createPresentation = createAsyncThunk('ppt/create', async () => {
  const res = await FetchUtils.postRequest(`${ENDPOINT.PPT.CREATE_PPT}`, {
    presentationName: 'untitled-presentation',
  });
  return res.data;
});

// Update Presentation Name
export const updatePptName = createAsyncThunk(
  'ppt/updatePptName',
  async (body: IUpdatePptName) => {
    const res = await FetchUtils.putRequest(
      `${ENDPOINT.PPT.UPDATE_PPT_NAME}`,
      body
    );
    return res.data;
  }
);

// Fetch Presentation Details By ID
export const fetchPptDetails = createAsyncThunk(
  'ppt/fetchDetailsByID',
  async (pId: string, { dispatch, getState }) => {
    const res = await FetchUtils.getRequest(
      `${ENDPOINT.PPT.GET_PPT_DETAILS}?presentationId=${pId}`
    );
    return res.data;
  }
);

const thunkSlice = createSlice({
  name: 'singleSlideData',
  initialState,
  reducers: {
    setPresentationName: (state, action) => {
      state.presentationName = action.payload;
    },
    setAuthenticateLoader: state => {
      state.isAuthenticating = false;
    },
    setUnauthMessage: (state, action) => {
      state.unAuthMessage = action.payload;
    },
    setEditPptIndex: (state, action) => {
      state.selectedSlideIndex = action.payload;
    },
    setPresentationID : (state, action : PayloadAction<number>) => {
      state.presentationId = action.payload;
    }
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
        state.isAuthenticating = true;
      })
      .addCase(createPresentation.fulfilled, (state, action) => {
        state.presentationId = action.payload.presentationId;
      })
      .addCase(createPresentation.rejected, state => {
        state.presentationId = null;
      })
      .addCase(fetchPptDetails.pending, (state, action) => {
        state.pptDetails = null;
      })
      .addCase(fetchPptDetails.fulfilled, (state, action : PayloadAction<any>) => {
        state.pptDetails = action.payload;
        state.presentationName = action.payload.name;
        state.presentationId = action.payload.presentationId;
      })
      .addCase(fetchPptDetails.rejected, (state, action) => {
        state.pptDetails = null;
      });
  },
});

export const {
  setPresentationName,
  setAuthenticateLoader,
  setUnauthMessage,
  setEditPptIndex,
  setPresentationID
} = thunkSlice.actions;

export default thunkSlice.reducer;
