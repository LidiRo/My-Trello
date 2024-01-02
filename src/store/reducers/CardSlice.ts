import { createSlice } from "@reduxjs/toolkit";
import { ICard } from "../../common/interfaces/ICard";
import { addNewCard, deleteCard, editPositionCard, editTitleCard } from "../action-creators/CardsActionCreators";
import toast from "react-hot-toast";

interface CardState {
    cards: ICard[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string;
}

const initialState: CardState = {
    cards: [],
    status: 'idle',
    error: '',
};

export const cardSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {},
    extraReducers: {
        [addNewCard.fulfilled.type]: (state) => {
            return state;
        },
        [addNewCard.rejected.type]: (state, action) => {
            if (action.error.message) {
                state.status = 'failed';
                state.error = toast.error(action.error.message);
            }
        },
        [deleteCard.fulfilled.type]: (state) => {
            return state;
        },
        [deleteCard.rejected.type]: (state, action) => {
            if (action.error.message) {
                state.status = 'failed';
                state.error = toast.error(action.error.message);
            }
        },
        [editTitleCard.fulfilled.type]: (state) => {
            // console.log("state", state)
            return state;
        },
        [editTitleCard.rejected.type]: (state, action) => {
            if (action.error.message) {
                state.status = 'failed';
                state.error = toast.error(action.error.message);
            }
        },
        [editPositionCard.fulfilled.type]: (state) => {
            // console.log("state", state)
            return state;
        },
    }
});

export default cardSlice.reducer;