import {createSlice} from "@reduxjs/toolkit";

export const seriesSlice = createSlice({
    name: 'series',
    initialState: {
        loadedSeries: false,
        popularSeries: null,
        topRatedSeries: null
    },
    reducers: {
        onLoadedSeries: ( state) => {
            state.loadedSeries = true
        },
        onPopularSeries: (state, {payload}) => {
            state.popularSeries = payload
        },
        onTopRatedSeries : (state, {payload}) => {
            state.topRatedSeries = payload
        }
    }
});

export const { onLoadedSeries, onPopularSeries, onTopRatedSeries } = seriesSlice.actions;