import { configureStore } from '@reduxjs/toolkit';
import {authSlice, bannerSlice, moviesSlice, selectedTypeSlice} from "./slice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        selectedType: selectedTypeSlice.reducer,
        banner: bannerSlice.reducer,
        movies: moviesSlice.reducer
    },
})