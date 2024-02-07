import { CanvasItem, CanvasJSON, IShapeRequest, TableDetails } from '@/interface/storeTypes';
import { createSlice } from '@reduxjs/toolkit';
import { fabric } from 'fabric';

export interface CanvasSate {
  color: string;
  textColor: string;
  borderColor: string;
  tableDetails: TableDetails | null;
  canvasList: CanvasItem[];
  canvasJS: CanvasJSON;
  activeCanvasID: number;
  size: number;
  canvasData: string[];
  tempData: any[];
  shapeName: string;
  requestData: IShapeRequest;
  variantImage: string;
  originalCanvasSlide: object;
  canvasImageURl: string;
  selectedOriginalCanvas: boolean
}
const canvas = new fabric.Canvas(null);
const canvasJSON = canvas.toObject();

export const initialState: CanvasSate = {
  color: '',
  textColor: '',
  borderColor: '',
  tableDetails: null,
  canvasList: [{ id: 1, canvas: canvasJSON }],
  canvasJS: { id: 1, canvas: canvasJSON },
  activeCanvasID: 1,
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
    setCanvas: (state, action) => {
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
      const canvasJSON = canvas.toObject(); // Use toObject() instead of toJSON() for Fabric.js
      const updatedCanvasList = [
        ...state.canvasList,
        {
          id: canvasID,
          canvas: canvasJSON,
        },
      ];

      return {
        ...state,
        canvasList: updatedCanvasList,
        activeCanvasID: canvasID,
        canvasJS: {
          id: canvasID,
          canvas: canvasJSON,
        },
      };
    },
    setActiveCanvas(state, action) {
      return {
        ...state,
        activeCanvasID: action.payload,
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
        activeCanvasID: id + 1,
        canvasJS: copiedCanvas,
      };
    },
    deleteCanvasItem(state, action) {
      const idToDelete = action.payload;

      const indexOfItemToDelete = idToDelete - 1;
      if (
        indexOfItemToDelete > 0 &&
        indexOfItemToDelete >= 0 &&
        indexOfItemToDelete < state.canvasList.length
      ) {
        const updatedCanvasList = state.canvasList.filter(
          (canvas, index) => index !== indexOfItemToDelete
        );

        const renumberedCanvasList = updatedCanvasList.map((canvas, index) => ({
          ...canvas,
          id: index + 1,
        }));
        let newActiveCanvasId = state.canvasList.filter(
          canvas => canvas.id == idToDelete - 1
        );
        return {
          ...state,
          canvasList: renumberedCanvasList,
          activeCanvasID: idToDelete - 1 || 1,
          canvasJS: newActiveCanvasId[0],
        };
      }

      return state;
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
    toggleSelectedOriginalCanvas(state,action){
      state.selectedOriginalCanvas = action.payload;
    }
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
  copyCanvasCopy,
  deleteCanvasItem,
  setActiveCanvas,
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
  toggleSelectedOriginalCanvas
} = CanvasReducer.actions;

export default CanvasReducer.reducer;
