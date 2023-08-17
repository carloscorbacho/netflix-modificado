import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'no-autenticado',
        user: null
    },
    reducers : {
        onLogin : ( state, { payload }) => {
            state.status = 'autenticado';
            state.user = payload;
        },
        onLogout : ( state ) => {
            state.status = 'no-autenticado';
            state.user = null;
        }
    },
})

export const { onLogin, onLogout } = authSlice.actions;