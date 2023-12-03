import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import boardsReducer from "./reducers/BoardSlice"
import { apiSlice } from "./reducers/apiSlice";

export const store = configureStore({
    reducer: {
        boards: boardsReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;