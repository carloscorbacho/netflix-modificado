import { createSlice } from '@reduxjs/toolkit';

export const selectedTypeSlice = createSlice({
    name: 'selectedType',
    initialState: {
        selectedType: 'movies'
    },
    reducers : {
        onSelectedType : ( state, { payload }) => {
            state.selectedType = payload;
        },
    },
})

export const { onSelectedType } = selectedTypeSlice.actions;