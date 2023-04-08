import {createSlice} from '@reduxjs/toolkit';

let initialState = {
  activeTab: 'Challenges',
};

export const activeTabSlice = createSlice({
  name: 'ActiveTab',
  initialState,
  reducers: {
    updateActiveTabAction: (state, payload) => {
      state.activeTab = payload.payload;
    },
  },
});
export const {updateActiveTabAction} = activeTabSlice.actions;
export default activeTabSlice.reducer;
