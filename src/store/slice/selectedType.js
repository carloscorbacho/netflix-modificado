import { createSlice } from '@reduxjs/toolkit';

export const selectedSlice = createSlice({
    name: 'selectedSlice',
    initialState: {
        selectedType: null
    },
    reducers : {
        onSelectedType : ( state, { payload }) => {
            state.selectedType = payload;
        },
    },
})

export const { onSelectedType } = selectedSlice.actions;