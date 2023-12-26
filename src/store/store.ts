import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "./reducers/BoardSlice"
import listsReducer from "./reducers/ListSlice";
import cardsReducer from "./reducers/CardSlice";
import slotsReducer from "./reducers/SlotSlice"

// import { apiSlice } from "./reducers/apiSlice";

export const store = configureStore({
    reducer: {
        boards: boardsReducer,
        lists: listsReducer,
        cards: cardsReducer,
        slots: slotsReducer,
        // [apiSlice.reducerPath]: apiSlice.reducer
    },
    // middleware: getDefaultMiddleware => 
    //     getDefaultMiddleware().concat(apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;