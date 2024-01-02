import { configureStore } from "@reduxjs/toolkit";
import waterSlice from "./waterSlice";


export const store = configureStore({
    reducer: {
        water: waterSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;