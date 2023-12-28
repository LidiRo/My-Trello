import { createSlice } from "@reduxjs/toolkit";
import { ICard } from "../../common/interfaces/ICard";

interface SlotState{
    draggingCard: ICard | null;
    coordinatesCard: {
        top: number,
        bottom: number,
        height: number,
        width: number,
        y: number,
    };
}

const initialState: SlotState  = {
    draggingCard: null,
    coordinatesCard: {
        top: 0,
        bottom: 0,
        height: 0,
        width: 0,
        y: 0,
}
};

export const SlotSlice = createSlice({
    name: 'slots',
    initialState,
    reducers: {
        dragStartReducer(state, action) {
            state.draggingCard = action.payload;
        },
        getCoordinatesCard(state, action) {
            state.coordinatesCard = action.payload;
        }
    },
})

export const { dragStartReducer, getCoordinatesCard } = SlotSlice.actions;
export default SlotSlice.reducer;