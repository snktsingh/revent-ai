import {
  CanvasItem,
  IShapeRequest,
  TableDetails,
  UpdateLastVariantPayload,
} from '@/interface/storeTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fabric } from 'fabric';

export interface CanvasSate {
  color: string;
  textColor: string;
  borderColor: string;
  tableDetails: TableDetails | null;
  canvasList: CanvasItem[];
  canvasJS: CanvasItem;
  activeSlideID: number;
  size: number;
  canvasData: string[];
  tempData: any[];
  shapeName: string;
  requestData: IShapeRequest;
  variantImage: string;
  originalCanvasSlide: any;
  canvasImageURl: string;
  selectedOriginalCanvas: boolean;
  presentationTitle: string;
  isVariantSelected: boolean;
}
const canvas = new fabric.Canvas(null);
const canvasJSON = canvas.toObject();

export const initialState: CanvasSate = {
  color: '',
  textColor: '',
  borderColor: '',
  tableDetails: null,
  canvasList: [
    {
      id: 1,
      canvas: canvasJSON,
      notes: '',
      variants: [],
      originalSlideData: {},
      listImages: [],
      slideId: 1,
      presentationId: 1,
      lastVariant: ''
    },
  ],
  canvasJS: {
    id: 1,
    canvas: canvasJSON,
    notes: '',
    variants: [],
    originalSlideData: {},
    listImages: [],
    slideId: 1,
    presentationId: 1,
    lastVariant:'',
  },
  activeSlideID: 1,
  size: 1,
  canvasData: [],
  tempData: [],
  shapeName: '',
  requestData: {
    companyName: '',
    shape: '',
    data: [],
  },
  variantImage: '',
  originalCanvasSlide: {},
  canvasImageURl: '',
  selectedOriginalCanvas: false,
  presentationTitle: '',
  isVariantSelected: false,
};

export const CanvasReducer = createSlice({
  name: 'element',
  initialState,
  reducers: {
    initializeCanvas(state) {
      const canvas = new fabric.Canvas(null);
      const canvasJSON = canvas.toObject();
      // state.canvasJS = canvasJSON;
      // state.canvasList.push(canvasJSON);
    },
    setRequestData: (state, action) => {
      return {
        ...state,
        requestData: action.payload,
      };
    },
    setShapeName: (state, action) => {
      state.shapeName = action.payload;
    },
    setTempData: (state, action) => {
      state.tempData = action.payload;
    },
    setCanvas: (state, action: PayloadAction<CanvasItem>) => {
      return {
        ...state,
        canvasJS: action.payload,
      };
    },
    setCanvasData: (state, action) => {
      state.canvasData = action.payload;
    },
    addCanvas(state) {
      const canvas = new fabric.Canvas(null);
      const canvasID =
        state.canvasList[state.canvasList.length - 1].id + 1 || 2;
      const canvasJSON = canvas.toObject(); 
      const updatedCanvasList = [
        ...state.canvasList,
        {
          id: canvasID,
          canvas: canvasJSON,
          notes: '',
          variants: [],
          originalSlideData: {},
          listImages: [],
          slideId: canvasID,
          presentationId: 1,
          lastVariant :'',
        },
      ];

      return {
        ...state,
        canvasList: updatedCanvasList,
        activeSlideID: canvasID,
        canvasJS: {
          id: canvasID,
          canvas: canvasJSON,
          notes: '',
          variants: [],
          originalSlideData: {},
          listImages: [],
          slideId: canvasID,
          presentationId: 1,
          lastVariant :'',
        },
      };
    },
    setActiveSlideId(state, action) {
      return {
        ...state,
        activeSlideID: action.payload,
      };
    },
    setColor(state, action) {
      state.color = action.payload;
    },
    setTextColor: (state, action) => {
      state.textColor = action.payload;
    },
    setBorderColor: (state, action) => {
      state.borderColor = action.payload;
    },
    setTableDetails: (state, action) => {
      state.tableDetails = action.payload;
    },
    updateCanvasInList(state, action) {
      const { id, updatedCanvas } = action.payload;

      const updatedList = state.canvasList.map(canvasItem => {
        if (canvasItem.id === id) {
          return {
            ...canvasItem,
            canvas: updatedCanvas,
          };
        }
        return canvasItem;
      });

      return {
        ...state,
        canvasList: updatedList,
      };
    },
    copyCanvasCopy(state, action) {
      const id = action.payload;

      const selectedCanvasIndex = state.canvasList.findIndex(
        canvas => canvas.id === id
      );
      const selectedCanvas = state.canvasList[selectedCanvasIndex];

      const copiedCanvas = { ...selectedCanvas, id: selectedCanvas.id + 1 };

      const updatedCanvasList: CanvasItem[] = state.canvasList.reduce(
        (acc, canvas, index) => {
          if (index === selectedCanvasIndex) {
            acc.push(canvas, copiedCanvas);
          } else if (index > selectedCanvasIndex) {
            acc.push({ ...canvas, id: canvas.id + 1 });
          } else {
            acc.push(canvas);
          }
          return acc;
        },
        [] as CanvasItem[]
      );

      return {
        ...state,
        canvasList: updatedCanvasList,
        activeSlideID: id + 1,
        canvasJS: copiedCanvas,
      };
    },
    deleteSlide(state, action) {
      const idToDelete = action.payload;

      if (idToDelete >= 1 && idToDelete <= state.canvasList.length) {
        const updatedCanvasList = state.canvasList.filter(
          canvas => canvas.id !== idToDelete
        );

        
        const renumberedCanvasList = updatedCanvasList.map((canvas, index) => ({
          ...canvas,
          id: index + 1,
        }));

        const newActiveSlideId = idToDelete === 1 ? 1 : idToDelete - 1;

        const newActiveCanvasJS = renumberedCanvasList[newActiveSlideId - 1];
        console.log({newActiveCanvasJS, renumberedCanvasList, updatedCanvasList, idToDelete, newActiveSlideId})
        return {
          ...state,
          canvasList: renumberedCanvasList,
          activeSlideID: newActiveSlideId,
          canvasJS: newActiveCanvasJS,
        };
      }
      return state;
    },
    updateCurrentCanvas(state, action: PayloadAction<CanvasItem>) {
      const updatedList = state.canvasList.map(canvasItem => {
        if (canvasItem.id === action.payload.id) {
          return {
            ...canvasItem,
            notes: action.payload.notes,
            variants: action.payload.variants,
            originalSlideData: action.payload.originalSlideData,
            listImages: action.payload.listImages,
          };
        }
        return canvasItem;
      });
      state.canvasJS = action.payload;
      state.canvasList = updatedList;
    },
    handleSize(state, action) {
      return {
        ...state,
        size: state.size + action.payload,
      };
    },
    handleInputSize(state, action) {
      return {
        ...state,
        size: action.payload,
      };
    },
    setVariantAsCanvas(state, action) {
      const updatedCanvas = state.canvasJS.canvas;
      updateCanvasInList({ id: state.canvasJS.id, updatedCanvas });
    },
    setVariantImageAsMain(state, action) {
      state.variantImage = action.payload;
    },
    setOriginalSlide(state, action) {
      state.originalCanvasSlide = action.payload;
    },
    setCanvasImageUrl(state, action) {
      state.canvasImageURl = action.payload;
    },
    toggleSelectedOriginalCanvas(state, action) {
      state.selectedOriginalCanvas = action.payload;
    },
    setPresentationTitle(state, action) {
      state.presentationTitle = action.payload;
    },
    updateCanvasList(state, action: PayloadAction<CanvasItem[]>) {
      state.canvasList = action.payload;
    },
    toggleIsVariantSelected(state, action: PayloadAction<boolean>) {
      state.isVariantSelected = true;
    },
    updateListImagesWithCanvasId: (state, action) => {
      const { canvasId, images } = action.payload;
      const canvasIndex = state.canvasList.findIndex(
        canvas => canvas.id === canvasId
      );
      if (canvasIndex !== -1) {
        state.canvasList[canvasIndex].listImages = images;
      }
      state.canvasJS = state.canvasList[canvasIndex];
    },
    updateLastVariant(state, action: PayloadAction<UpdateLastVariantPayload>) {
      const { slideId, lastVariant } = action.payload;
      const canvasIndex = state.canvasList.findIndex(canvas => canvas.id === slideId);
      if (canvasIndex !== -1) {
        state.canvasList[canvasIndex].lastVariant = lastVariant;
        state.canvasJS.lastVariant = lastVariant;
      }
    },
  },
});

export const {
  initializeCanvas,
  setCanvas,
  addCanvas,
  setColor,
  setTextColor,
  setBorderColor,
  setTableDetails,
  updateCanvasInList,
  updateCurrentCanvas,
  copyCanvasCopy,
  deleteSlide,
  setActiveSlideId,
  handleSize,
  handleInputSize,
  setCanvasData,
  setRequestData,
  setTempData,
  setShapeName,
  setVariantAsCanvas,
  setVariantImageAsMain,
  setCanvasImageUrl,
  setOriginalSlide,
  toggleSelectedOriginalCanvas,
  setPresentationTitle,
  updateCanvasList,
  toggleIsVariantSelected,
  updateListImagesWithCanvasId,
  updateLastVariant,
} = CanvasReducer.actions;

export default CanvasReducer.reducer;
