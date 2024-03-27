import { IListofSlides } from '@/interface/storeTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface TestState {
  listOfSlides: IListofSlides[];
  slideKey: number;
  nextKey: number;
  listSearch: string;
  isRegenerateDisabled : boolean;
  isSlideSelected : boolean;
}

const initialState: TestState = {
  listOfSlides: [
    {
      key: 1,
      name: 'Slide 1',
    },
  ],
  slideKey: 1,
  nextKey: 2,
  listSearch: '',
  isRegenerateDisabled: true,
  isSlideSelected : false
};

export const slideReducer = createSlice({
  name: 'slide',
  initialState,
  reducers: {
    addSlide: (state, action) => {
      state.listOfSlides.push(action.payload);
      state.nextKey = state.nextKey + 1;
    },
    deleteSlide: (state, action) => {
      state.listOfSlides.splice(action.payload - 1, 1);
    },
    getSlidekey: (state, action) => {
      state.slideKey = action.payload;
    },
    searchElement: (state, action) => {
      state.listSearch = action.payload;
    },
    toggleRegenerateButton(state,action : PayloadAction<boolean>){
      state.isRegenerateDisabled = action.payload
    },
    toggleSelectingSlide(state,action : PayloadAction<boolean>){
      state.isSlideSelected = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { addSlide, deleteSlide, getSlidekey, searchElement, toggleRegenerateButton, toggleSelectingSlide } =
  slideReducer.actions;

export default slideReducer.reducer;
