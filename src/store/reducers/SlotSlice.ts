import { createSlice } from "@reduxjs/toolkit";
import { ICard } from "../../common/interfaces/ICard";

interface SlotState{
    draggingCard: ICard | null;
    currentList: number | undefined;
}

const initialState: SlotState  = {
    draggingCard: null,
    currentList: undefined
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
        }
    },
})

export const { dragStartReducer, getCurrentList } = SlotSlice.actions;
export default SlotSlice.reducer;