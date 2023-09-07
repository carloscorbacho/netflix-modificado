import { createSlice } from '@reduxjs/toolkit';

export const itemSelectedSlice = createSlice({
    name: 'itemSelected',
    initialState: {
        item: null
    },
    reducers : {
        onItemSelected : ( state, { payload }) => {
            state.itemSelected = payload;
        },
    },
})

export const { onItemSelected } = itemSelectedSlice.actions;