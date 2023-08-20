import { createSlice } from '@reduxjs/toolkit';

export const bannerSlice = createSlice({
    name: 'bannerSlice',
    initialState: {
        banner: null
    },
    reducers : {
        onSelectedBanner : ( state, { payload }) => {
            state.banner = payload;
        },
    },
})

export const { onSelectedBanner } = bannerSlice.actions;