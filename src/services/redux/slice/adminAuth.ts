import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn: false
}

export const adminAuthSlice = createSlice({
    name: "staffAuth",
    initialState,
    reducers: {
        adminLogin: (state) => {
            state.loggedIn = true;
        },
        adminLogout: (state) => {
            state.loggedIn = false;
        }
    }
})

export const { adminLogin, adminLogout } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
