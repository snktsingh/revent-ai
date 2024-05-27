import { createSlice } from '@reduxjs/toolkit';

interface ElementsIds {
  pyramidId: number;
  processId: number;
  funnelId: number;
  timelineId: number;
  cycleId: number;
  listID: number;
  swotID: number;
  clientListId: number;
}

const initialState: ElementsIds = {
  pyramidId: 1,
  processId: 1,
  funnelId: 1,
  timelineId: 1,
  cycleId: 1,
  listID: 1,
  swotID: 1,
  clientListId: 1,
};

export const elementsIdsReducer = createSlice({
  name: 'elementsId',
  initialState,
  reducers: {
    updatePyramidId: state => {
      state.pyramidId += 1;
    },
    updateProcessId: state => {
      state.processId += 1;
    },
    updateFunnelId: state => {
      state.funnelId += 1;
    },
    updateTimelineId: state => {
      state.timelineId += 1;
    },
    updateCycleId: state => {
      state.cycleId += 1;
    },
    updateListId: state => {
      state.listID += 1;
    },
    updateSwotId: state => {
      state.swotID += 1;
    },
    updateClientListId: state => {
      state.clientListId += 1;
    },
  },
});

export const {
  updateCycleId,
  updateProcessId,
  updateFunnelId,
  updateTimelineId,
  updatePyramidId,
  updateListId,
  updateSwotId,
  updateClientListId
} = elementsIdsReducer.actions;
export default elementsIdsReducer.reducer;
