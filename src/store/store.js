import { configureStore } from '@reduxjs/toolkit';
import { authSlice, selectedSlice } from "./slice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        selectedType: selectedSlice.reducer,
    },
})