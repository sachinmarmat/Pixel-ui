import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./slice/jobslice"
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
    key: "root",
    storage,
}
const persistreducer = persistReducer(persistConfig, jobReducer)

export const store = configureStore({

    reducer: {
        job: persistreducer
    }
})

export const persistor =persistStore(store) 