import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    loader: false,
};

export const commonSlice = createSlice({
    name: 'Common',
    initialState,
    reducers: {
        setLoader: (state, payload) => {
            state.loader = payload.payload;
        },
    },
});
export const { setLoader } = commonSlice.actions;
export default commonSlice.reducer;
