import {createSlice} from "@reduxjs/toolkit";

export const seriesSlice = createSlice({
    name: 'series',
    initialState: {
        popularSeries: null,
        topRatedSeries: null
    },
    reducers: {
        onPopularSeries: (state, {payload}) => {
            state.popularSeries = payload
        },
        onTopRatedSeries : (state, {payload}) => {
            state.topRatedSeries = payload
        }
    }
});

export const { onPopularSeries, onTopRatedSeries } = seriesSlice.actions;