import { createSlice } from '@reduxjs/toolkit';

export const itemSelectedSlice = createSlice({
    name: 'itemSelected',
    initialState: {
        itemSelected: null
    },
    reducers : {
        onItemSelected : ( state, { payload }) => {
            state.itemSelected = payload;
        },
    },
})

export const { onItemSelected } = itemSelectedSlice.actions;