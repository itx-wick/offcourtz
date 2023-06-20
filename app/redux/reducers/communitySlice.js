import {createSlice} from '@reduxjs/toolkit';

let initialState = {
  posts: null,
};

export const communitySlice = createSlice({
  name: 'Community',
  initialState,
  reducers: {
    setCommunityPosts: (state, payload) => {
      state.posts = payload.payload.data;
    },
  },
});
export const {setCommunityPosts} = communitySlice.actions;
export default communitySlice.reducer;
