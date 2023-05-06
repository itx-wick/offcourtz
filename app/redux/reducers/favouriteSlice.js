import {createSlice} from '@reduxjs/toolkit';

let initialState = {
  data: [],
};

export const favouriteSlice = createSlice({
  name: 'Favourites',
  initialState,
  reducers: {
    likeItem: (state, payload) => {
      const filter = state.data?.filter(_e => _e.id === payload.payload.id);
      if (filter.id === payload.payload.id || filter.length === 0) {
        state.data.push(payload.payload);
      } else {
        const updatedData = state.data.map(item => {
          if (item.id === payload.payload.id) {
            return payload.payload;
          }
          return item;
        });
        state.data = updatedData;
      }
    },
    unlikeItem: (state, payload) => {
      const index = state.data?.findIndex(_e => _e.id === payload.payload.id);
      if (index > -1) {
        state.data.splice(index, 1);
      }
    },
  },
});
export const {likeItem, unlikeItem} = favouriteSlice.actions;
export default favouriteSlice.reducer;
