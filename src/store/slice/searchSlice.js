import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        search: '',
        items: null
    },
    reducers: {
        onSearch : (state, {payload}) => {
            state.search = payload
        },
        itemsSearch: (state, {payload}) => {
            state.items = payload
        }
    }

})

export const {onSearch, itemsSearch} = searchSlice.actions;