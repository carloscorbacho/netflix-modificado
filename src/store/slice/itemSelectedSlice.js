import { createSlice } from '@reduxjs/toolkit';

export const itemSelectedSlice = createSlice({
    name: 'itemSelected',
    initialState: {
        loadedItem: false,
        itemSelected: null
    },
    reducers : {
        onLoadedItem : ( state) => {
            state.loadedItem = true
        },
        onResetItem : ( state ) => {
          state.loadedItem = false
          state.itemSelected = null
        },
        onItemSelected : ( state, { payload }) => {
            state.itemSelected = payload
        },
    },
})

export const { onLoadedItem, onResetItem, onItemSelected } = itemSelectedSlice.actions;