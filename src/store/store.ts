import { configureStore, combineReducers } from "@reduxjs/toolkit";
import boardReducer from './reducers/BoardSlice';
import listReducer from './reducers/ListSlice';
import cardReducer from './reducers/CardSlice';

const rootReducer = combineReducers({
    boardReducer,
    listReducer,
    cardReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']