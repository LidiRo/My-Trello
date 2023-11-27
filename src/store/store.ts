import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import boardReducer from "./reducers/BoardSlice"

const rootReducer = combineReducers({
    boards: boardReducer
});

export const setupStore = () => configureStore({
    reducer: {
        boards: boardReducer
    }
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];