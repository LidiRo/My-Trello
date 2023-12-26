import { createSlice } from "@reduxjs/toolkit";
import { ICard } from "../../common/interfaces/ICard";

interface SlotState{
    draggingCard: ICard | null;
}

const initialState: SlotState  = {
    draggingCard: null,
};

export const SlotSlice = createSlice({
    name: 'slots',
    initialState,
    reducers: {
        dragStartReducer(state, action) {
            state.draggingCard = action.payload;
        }
    },
})

export const { dragStartReducer } = SlotSlice.actions;
export default SlotSlice.reducer;