import {createSlice} from "@reduxjs/toolkit";

export const seriesSlice = createSlice({
    name: 'series',
    initialState: {
        loadedSeries: false,
        bannerSeries: null,
        popularSeries: null,
        topRatedSeries: null
    },
    reducers: {
        onLoadedSeries: ( state) => {
            state.loadedSeries = true
        },
        onBannerSeries: (state, {payload}) => {
            state.bannerSeries = payload
        },
        onPopularSeries: (state, {payload}) => {
            state.popularSeries = payload
        },
        onTopRatedSeries : (state, {payload}) => {
            state.topRatedSeries = payload
        }
    }
});

export const { onLoadedSeries, onBannerSeries, onPopularSeries, onTopRatedSeries } = seriesSlice.actions;