import { createSlice } from '@reduxjs/toolkit';

export const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        loadedMovies: false,
        popularMovies: null,
        topRatedMovies: null
    },
    reducers : {
        onLoadedMovies: ( state) => {
            state.loadedMovies = true;
        },
        onPopularMovies : ( state, { payload }) => {
            state.popularMovies = payload;
        },
        onRatedMovies : ( state, { payload }) => {
            state.topRatedMovies = payload;
        },
    },
})

export const { onLoadedMovies, onPopularMovies, onRatedMovies } = moviesSlice.actions;