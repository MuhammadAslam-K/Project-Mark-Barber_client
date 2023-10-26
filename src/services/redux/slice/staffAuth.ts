import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn: false
}

export const staffAuthSlice = createSlice({
    name: "staffAuth",
    initialState,
    reducers: {
        staffLogin: (state) => {
            state.loggedIn = true;
        },
        staffLogout: (state) => {
            state.loggedIn = false;
        }
    }
})

export const { staffLogin, staffLogout } = staffAuthSlice.actions;

export default staffAuthSlice.reducer;
