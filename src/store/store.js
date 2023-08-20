import { configureStore } from '@reduxjs/toolkit';
import { authSlice, bannerSlice, selectedTypeSlice } from "./slice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        selectedType: selectedTypeSlice.reducer,
        banner: bannerSlice.reducer
    },
})