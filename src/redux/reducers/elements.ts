import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TestState {
  isModalVisible: boolean;
  openTemplates: boolean;
  openVariant: boolean;
  openNotes: boolean;
  itemKey: number;
  openProfileMenu: boolean;
  enabledElements: string[];
  isPresentationLoading : boolean
}

const initialState: TestState = {
  isModalVisible: false,
  openTemplates: false,
  openVariant: false,
  openNotes: false,
  itemKey: 0,
  openProfileMenu: false,
  isPresentationLoading : true,
  enabledElements: [
    'Title',
    'Subtitle',
    'Image',
    'Quotes',
    'List',
    'Paragraph',
    'Bullet',
    'Table',
    'Cycle',
    'Process',
    'Timeline',
    'Funnel',
    'Pyramid',
    'Cover Slide',
    'Section Slide',
    'Conclusion Slide',
  ],
};

export const ElementReducer = createSlice({
  name: 'elements',
  initialState,
  reducers: {
    openModal: state => {
      state.isModalVisible = true;
    },
    setMenuItemKey: (state, action) => {
      state.itemKey = action.payload;
    },
    closeModal: state => {
      state.isModalVisible = false;
    },
    toggleTemplateVisibility: state => {
      state.openTemplates = !state.openTemplates;
    },
    toggleVariantSlide: (state, action: PayloadAction<boolean>) => {
      state.openVariant = action.payload;
    },
    toggleNotesSlide: state => {
      state.openNotes = !state.openNotes;
    },
    setEnabledElements: (state, action) => {
      state.enabledElements = action.payload;
    },
    updatePresentationLoading : (state, action : PayloadAction<boolean>) => {
      state.isPresentationLoading = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  openModal,
  closeModal,
  toggleTemplateVisibility,
  toggleVariantSlide,
  toggleNotesSlide,
  setMenuItemKey,
  setEnabledElements,
  updatePresentationLoading
} = ElementReducer.actions;

export default ElementReducer.reducer;
