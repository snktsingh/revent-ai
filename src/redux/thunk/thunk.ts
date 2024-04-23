import ENDPOINT from '@/constants/endpoint';
import { FetchUtils } from '@/utils/fetch-utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  setActiveCanvas,
  setVariantImageAsMain,
  toggleIsVariantSelected,
  updateCanvasList,
  updateCurrentCanvas,
} from '../reducers/canvas';
import { APIRequest, ISlideRequests } from '@/interface/storeTypes';
import { RootState } from '../store';
import { IUserLogin } from '@/interfaces/authInterface';
import { create, forEach } from 'lodash';
import { IUpdatePptName } from '@/interfaces/pptInterfaces';

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
    dispatch(setVariantImageAsMain(res.data.slides[0][0].thumbnailUrl));
    dispatch(setActiveCanvas(1));
    const currentCanvas = (getState() as RootState).canvas.canvasJS;
    const data = [];
    const promises = [];
    for (let i = 0; i < res.data.slides.length; i++) {
      const slide = {
        id: i + 1,
        canvas: {
          version: '5.3.0',
          objects: [
            {
              type: 'image',
              version: '5.3.0',
              originX: 'left',
              originY: 'top',
              left: 0,
              top: 0,
              width: 960,
              height: 540,
              fill: 'rgb(0,0,0)',
              stroke: null,
              strokeWidth: 0,
              strokeDashArray: null,
              strokeLineCap: 'butt',
              strokeDashOffset: 0,
              strokeLineJoin: 'miter',
              strokeUniform: false,
              strokeMiterLimit: 4,
              scaleX: 0.5,
              scaleY: 0.5,
              angle: 0,
              flipX: false,
              flipY: false,
              opacity: 1,
              shadow: null,
              visible: true,
              backgroundColor: '',
              fillRule: 'nonzero',
              paintFirst: 'fill',
              globalCompositeOperation: 'source-over',
              skewX: 0,
              skewY: 0,
              cropX: 0,
              cropY: 0,
              name: 'image',
              src: `${res.data.slides[i][0].thumbnailUrl}`,
              crossOrigin: null,
              filters: [],
            },
          ],
        },
        notes: '',
        variants: [],
        originalSlideData: {},
        listImages: [],
      };
      res.data.slides[i].forEach((element: any) => {
        slide.variants.push({
          pptUrl: '',
          imagesUrl: element.thumbnailUrl,
        });
      });
      data.push(slide);
      // Pushing the promise into an array
      promises.push(new Promise(resolve => resolve()));
    }

    // Wait for all promises to resolve before dispatching updateCanvasList
    await Promise.all(promises);

    // After loop completes, dispatch updateCanvasList
    dispatch(updateCanvasList(data));

    // Return data
    return data;
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
      .addCase(fetchPptDetails.fulfilled, (state, action) => {
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
} = thunkSlice.actions;

export default thunkSlice.reducer;
