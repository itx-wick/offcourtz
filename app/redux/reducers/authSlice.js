import { createSlice } from '@reduxjs/toolkit';

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
    },
});
export const { register, login } = authSlice.actions;
export default authSlice.reducer;
