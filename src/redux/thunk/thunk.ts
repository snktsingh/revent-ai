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
import { IUpdateTheme } from '@/interfaces/themeInterface';
import { Action } from '@dnd-kit/core/dist/store';
import { getUserCredit } from './user';
import { toggleVariantSlide } from '../reducers/elements';

interface IFileDownload {
  pId: number;
  format: string;
}
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
  themePreviewLoader: false,
  isRegenerating : false,
};

interface FetchSlideTypes { 
  req : any, 
  slideJSON : any, 
  pptId: number, 
  notes : string
 }

export const fetchSlideImg = createAsyncThunk(
  'slide/fetchimage-ppt',
  async ({ req, slideJSON, pptId, notes }: FetchSlideTypes, { dispatch, getState }) => {
    let isFormData = false;
    if (req instanceof FormData) {
      isFormData = true;
    }
    const currentSlideId = (getState() as RootState).canvas.activeSlideID;
    const { canvasList } = (getState() as RootState).canvas;
    const currentSlide = canvasList.findIndex(
      slide => slide.id == currentSlideId
    );

    const res = await FetchUtils.postRequest(
      `${isFormData ? ENDPOINT.GEN_PPT_IMAGES : ENDPOINT.GEN_PPT_MULTI}`,
      req
    );

    if (canvasList[currentSlide].variants.length === 0) {
      dispatch(
        createSlideJSONData({ pptId, slideJSON, slideId: canvasList[currentSlide].slideId, notes })
      );
    } else {
      dispatch(
        updateSlideJSONData({ pptId, slideJSON, slideId: canvasList[currentSlide].slideId, notes })
      );
    }

    dispatch(setVariantImageAsMain(res.data.variants[0].imagesUrl));
    dispatch(toggleIsVariantSelected(true));
    const currentCanvas = (getState() as RootState).canvas.canvasJS;
    const updatedCanvasVariants = {
      ...currentCanvas,
      variants: res.data.variants,
      slideId: canvasList[currentSlide].slideId,
    };
    dispatch(updateCurrentCanvas(updatedCanvasVariants));
    dispatch(getUserCredit());
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

// Create Slide JSON Data
export const createSlideJSONData = createAsyncThunk(
  'slide/update-json',
  async ({ pptId, slideId, slideJSON, notes }: {pptId : number, slideId: number, slideJSON: any, notes: string}) => {
    const res = await FetchUtils.postRequest(
      `${ENDPOINT.PPT.CANVAS_JSON}/${pptId}/${slideId}`,
      {slideJSON,notes}
    );
    console.log({ json: res.data });
    return res.data;
  }
);

// update Slide JSON Data
export const updateSlideJSONData = createAsyncThunk(
  'slide/update-json',
  async ({ pptId, slideId, slideJSON, notes }: any) => {
    const res = await FetchUtils.putRequest(
      `${ENDPOINT.PPT.CANVAS_JSON}/${pptId}/${slideId}`,
      {slideJSON, notes}
    );
    console.log({ json: res.data });
    return res.data;
  }
);

//Get Slide JSON Data

export const getSlideJSONData = createAsyncThunk(
  'slide/get-json',
  async ({
    pptId,
    slideId,
  }: {
    pptId: string;
    slideId: string;
  }): Promise<any> => {
    const res = await FetchUtils.getRequest(
      `${ENDPOINT.PPT.CANVAS_JSON}/${pptId}/${slideId}`
    );
    return res.data;
  }
);


//Get All Slide's JSON data 
export const getAllSlidesJSONApi = createAsyncThunk(
  'slide/get-all-slides-json',
  async (pId : number) => {
    try {
      const res = await FetchUtils.getRequest(`${ENDPOINT.PPT.GET_ALL_JSON}/${pId}`);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

//Update or Change Theme for Presentation
export const updatePresentationTheme = createAsyncThunk(
  'ppt/updatePptTheme',
  async ({ pptId, themeId }: IUpdateTheme, { dispatch }) => {
    const res = await FetchUtils.getRequest(
      `${ENDPOINT.PPT.UPDATE_THEME}?presentationId=${pptId}&themeId=${themeId}`
    );
    dispatch(getUserCredit());
    
    return res;
  }
);

//upload Custom Theme
export const uploadCustomTheme = createAsyncThunk(
  'ppt/uploadCustomTheme',
  async (file: File) => {
    const formData = new FormData();
    formData.append('files', file);
    try {
      const response = await FetchUtils.postRequest(
        `${ENDPOINT.PPT.UPLOAD_THEME}`,
        formData
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

// Refresh button
export const refreshVariants = createAsyncThunk(
  'ppt/refreshVariants',
  async (req: any, { dispatch, getState }) => {
    try {
      const res = await FetchUtils.postRequest(
        `${ENDPOINT.GEN_PPT_MULTI}`,
        req
      );
      dispatch(setVariantImageAsMain(res.data.variants[0].imagesUrl));
      dispatch(toggleIsVariantSelected(true));
      const currentCanvas = (getState() as RootState).canvas.canvasJS;
      const updatedCanvasVariants = {
        ...currentCanvas,
        variants: res.data.variants,
      };
      dispatch(updateCurrentCanvas(updatedCanvasVariants));
      dispatch(getUserCredit());
      return res;
    } catch (error) {
      return error;
    }
  }
);

// Download Presentation
export const downloadPresentation = createAsyncThunk(
  `ppt/downloadPresentation`,
  async ({ pId, format }: IFileDownload) => {
    try {
      const res = await FetchUtils.getRequest(
        `${ENDPOINT.PPT.DOWNLOAD_PRESENTATION}?presentationId=${pId}&format=${format}`,
        {
          responseType: 'arraybuffer',
        }
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

// update active variant
export const updateActiveVariantApi = createAsyncThunk(
  'variant/active',
  async ({
    pptId,
    slideId,
    variantId,
  }: {
    pptId: number;
    slideId: number;
    variantId: number;
  }) => {
    try {
      const res = await FetchUtils.putRequest(
        `${ENDPOINT.PPT.UPDATE_ACTIVE_VARIANT}?presentationId=${pptId}&slideId=${slideId}&slideVarientId=${variantId}`,
        null
      );

      return res;
    } catch (error) {
      return error;
    }
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
    setPresentationID: (state, action: PayloadAction<number>) => {
      state.presentationId = action.payload;
    },
    updateStateLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    toggleThemeChange: state => {
      state.themePreviewLoader = !state.themePreviewLoader;
    },
    toggleIsRegenerating : (state, action : PayloadAction<boolean>) => {
      state.isRegenerating = action.payload;
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
      .addCase(
        fetchPptDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.pptDetails = action.payload;
          state.presentationName = action.payload.name;
          state.presentationId = action.payload.presentationId;
        }
      )
      .addCase(fetchPptDetails.rejected, (state, action) => {
        state.pptDetails = null;
      })
      .addCase(updatePresentationTheme.pending, (state, action) => {
        state.pptDetails = null;
      })
      .addCase(
        updatePresentationTheme.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.pptDetails = action.payload;
          state.presentationName = action.payload.name;
          state.presentationId = action.payload.presentationId;
        }
      )
      .addCase(updatePresentationTheme.rejected, (state, action) => {
        state.pptDetails = null;
      });
  },
});

export const {
  setPresentationName,
  setAuthenticateLoader,
  setUnauthMessage,
  setEditPptIndex,
  setPresentationID,
  updateStateLoading,
  toggleThemeChange,
  toggleIsRegenerating
} = thunkSlice.actions;

export default thunkSlice.reducer;