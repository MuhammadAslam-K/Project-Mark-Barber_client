export interface rootState {
    staff: staffAuthSlice,
    admin: adminAuthSlice
}

interface staffAuthSlice {
    loggedIn: boolean
}

interface adminAuthSlice {
    loggedIn: boolean
}