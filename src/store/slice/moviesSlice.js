import { createSlice } from '@reduxjs/toolkit';

export const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        popularMovies: null
    },
    reducers : {
        onPopularMovies : ( state, { payload }) => {
            state.popularMovies = payload;
        },
    },
})

export const { onPopularMovies } = moviesSlice.actions;