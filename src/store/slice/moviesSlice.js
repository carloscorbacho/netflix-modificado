import { createSlice } from '@reduxjs/toolkit';

export const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        loadedMovies: false,
        bannerMovies: null,
        popularMovies: null,
        topRatedMovies: null
    },
    reducers : {
        onLoadedMovies: ( state) => {
            state.loadedMovies = true;
        },
        onBannerMovies: (state, {payload}) => {
            state.bannerMovies = payload
        },
        onPopularMovies : ( state, { payload }) => {
            state.popularMovies = payload;
        },
        onRatedMovies : ( state, { payload }) => {
            state.topRatedMovies = payload;
        },
    },
})

export const { onLoadedMovies, onBannerMovies, onPopularMovies, onRatedMovies } = moviesSlice.actions;