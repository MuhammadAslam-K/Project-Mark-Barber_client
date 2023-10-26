import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";


import { staffAuthSlice } from "./slice/staffAuth";
import { adminAuthSlice } from "./slice/adminAuth";

const staffPersistConfig = { key: "userAuth", storage, version: 1 };
const adminPersistConfig = { key: "userAuth", storage, version: 1 };


const staffAuthPersistReducer = persistReducer(staffPersistConfig, staffAuthSlice.reducer);
const adminAuthPersistReducer = persistReducer(adminPersistConfig, adminAuthSlice.reducer);


export const store = configureStore({
    reducer: {
        staff: staffAuthPersistReducer,
        admin: adminAuthPersistReducer
    },


    middleware: (getDefaultMiddleware) => {
        const middleware = getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        });
        return middleware;
    },
})

export const persistor = persistStore(store);