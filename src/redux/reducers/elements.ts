import { createSlice } from '@reduxjs/toolkit';

export interface TestState {
  isModalVisible: boolean;
  openTemplates: boolean;
  openVariant : boolean;
  openNotes : boolean;
}

const initialState: TestState = {
  isModalVisible: false,
  openTemplates: false,
  openVariant : false,
  openNotes: false,
};

export const ElementReducer = createSlice({
  name: 'elements',
  initialState,
  reducers: {
    openModal: state => {
      state.isModalVisible = true;
    },
    closeModal: state => {
      state.isModalVisible = false;
    },
    toggleTemplateVisibility: state => {
      state.openTemplates = !state.openTemplates;
    },
    toggleVariantSlide : state => {
      state.openVariant = !state.openVariant;
    },
    toggleNotesSlide : state => {
      state.openNotes = !state.openNotes;
    }
  },
});

// Action creators are generated for each case reducer function
export const { openModal, closeModal, toggleTemplateVisibility,toggleVariantSlide,toggleNotesSlide } =
  ElementReducer.actions;

export default ElementReducer.reducer;
