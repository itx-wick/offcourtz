import {createSlice} from '@reduxjs/toolkit';

let initialState = {
  isLoggedIn: false,
  user: null,
  friends: null,
  groups: [],
  token: null,
};

export const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    register: (state, payload) => {
      state.isLoggedIn = true;
      state.user = payload.payload.data;
      state.token = payload.payload.token;
    },
    login: (state, payload) => {
      state.isLoggedIn = true;
      state.user = payload.payload.data;
      state.token = payload.payload.token;
    },
    logout: state => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },
    myFriends: (state, payload) => {
      state.friends = payload.payload;
    },
    myGroups: (state, payload) => {
      state.groups = payload.payload;
    },
  },
});
export const {register, login, logout, myFriends, myGroups} = authSlice.actions;
export default authSlice.reducer;
