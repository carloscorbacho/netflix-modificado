import { configureStore } from '@reduxjs/toolkit';
import {authSlice,
    bannerSlice,
    moviesSlice,
    searchSlice,
    selectedTypeSlice,
    seriesSlice,
    itemSelectedSlice
} from "./slice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        search: searchSlice.reducer,
        selectedType: selectedTypeSlice.reducer,
        banner: bannerSlice.reducer,
        movies: moviesSlice.reducer,
        series: seriesSlice.reducer,
        itemSelected: itemSelectedSlice.reducer
    },
})