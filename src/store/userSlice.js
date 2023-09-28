import { createSlice } from "@reduxjs/toolkit";

// initial state values
const initialState = {
    username: '',
    email: '',
    phone: '',
    loggedIn: false,
    adminLoginStatus: false,
    timeFormat: '12',
}

// creating new slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPhone: (state, action) => {
            state.phone = action.payload;
        },
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload;
          },
        setAdminLoginStatus: (state, action) => {
            state.adminLoginStatus = action.payload;
          },
        setTimeFormat: (state, action) => {
            state.timeFormat = action.payload;
          },
    }
});

export const { setUsername, setEmail, setPhone, setLoggedIn, setAdminLoginStatus, setTimeFormat } = userSlice.actions;

export default userSlice.reducer;
