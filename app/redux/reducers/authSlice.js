import {createSlice} from '@reduxjs/toolkit';

let initialState = {
  isLoggedIn: false,
  user: null,
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
  },
});
export const {register, login, logout} = authSlice.actions;
export default authSlice.reducer;
