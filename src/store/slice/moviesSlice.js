import { createSlice } from '@reduxjs/toolkit';

export const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        popularMovies: null,
        topRatedMovies: null
    },
    reducers : {
        onPopularMovies : ( state, { payload }) => {
            state.popularMovies = payload;
        },
        onRatedMovies : ( state, { payload }) => {
            state.topRatedMovies = payload;
        },
    },
})

export const { onPopularMovies, onRatedMovies } = moviesSlice.actions;