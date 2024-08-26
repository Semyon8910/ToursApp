import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    userID: number | null;
    role: string | null;
    name: string | null;
    surname: string | null;
    jwt: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    userID: null,
    role: null,
    name: null,
    surname: null,
    jwt: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<any>) {
            state.isAuthenticated = true;
            state.userID = action.payload.userID;
            state.role = action.payload.role;
            state.name = action.payload.name;
            state.surname = action.payload.surname
            state.jwt = action.payload.jwt
            localStorage.setItem('auth', JSON.stringify(state));
        },
        logout(state) {
            state.isAuthenticated = false;
            state.userID = null;
            state.role = null;
            state.name = null;
            state.surname = null;
            state.jwt = null;
            localStorage.setItem('auth', JSON.stringify(state));
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;