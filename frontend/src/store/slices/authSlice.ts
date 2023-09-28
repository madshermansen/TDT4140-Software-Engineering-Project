import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
    userId: number | null;
    isAuthenticated: boolean;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
};

const initialAuthState: AuthState = {
    userId: null,
    isAuthenticated: false,
    username: "",
    firstName: "",
    lastName: "",
    password: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        login(state, { payload }) {
            state.userId = payload.id;
            state.isAuthenticated = true;
            state.firstName = payload.first_name;
            state.lastName = payload.last_name;
            state.username = payload.username;
            state.password = payload.password;
            localStorage.setItem(
                "user",
                JSON.stringify({ id: payload.id, ...payload })
            );
        },
        logout(state) {
            state.userId = null;
            state.isAuthenticated = false;
            state.firstName = "";
            state.lastName = "";
            state.username = "";
            state.password = "";
            localStorage.removeItem("user");
        },
    },
});

const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
export default authReducer;
