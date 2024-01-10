import { createSlice } from "@reduxjs/toolkit";
import { ICard } from "../../common/interfaces/ICard";

interface SlotState{
    draggingCard: ICard | null;
    currentList: number | undefined;
    currentCards: ICard[] | null;
    currentCard: HTMLElement | null;
    currentCardCoordinates: {
        top: number,
        bottom: number,
        left: number,
        right: number,
        x: number,
        y: number,
    };
}

const initialState: SlotState  = {
    draggingCard: null,
    currentList: undefined,
    currentCards: null,
    currentCard: null,
    currentCardCoordinates: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        x: 0,
        y: 0,
},
};

export const SlotSlice = createSlice({
    name: 'slots',
    initialState,
    reducers: {
        dragStartReducer(state, action) {
            state.draggingCard = action.payload;
        },
        getCurrentList(state, action) {
            state.currentList = action.payload;
        },
        getCurrentCards(state, action) {
            state.currentCards = action.payload;
        },
        getCurrentCard(state, action) {
            state.currentCard = action.payload;
        },
        getCurrentCardCoordinates(state, action) {
            state.currentCardCoordinates = action.payload;
        }
    },
})

export const { dragStartReducer, getCurrentList, getCurrentCards, getCurrentCardCoordinates, getCurrentCard } = SlotSlice.actions;
export default SlotSlice.reducer;