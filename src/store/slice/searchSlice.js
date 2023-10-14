import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        loadedSearchItems: false,
        search: '',
        items: null
    },
    reducers: {
        onSearch : (state, {payload}) => {
            state.loadedSearchItems = false
            state.items = null
            state.search = payload
        },
        onResetItems: (state) => {
            state.loadedSearchItems = false
            state.items = null
            state.search = ''
        },
        itemsSearch: (state, {payload}) => {
            state.loadedSearchItems = true
            state.items = payload
        }
    }

})

export const {onSearch, onResetItems, itemsSearch} = searchSlice.actions;