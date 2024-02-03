import { createSlice } from "@reduxjs/toolkit";
import { ICard } from "../../common/interfaces/ICard";
import { addNewCard, deleteCard, editPositionCard, editTitleCard, editDescriptionCard } from "../action-creators/CardsActionCreators";
import toast from "react-hot-toast";

interface CardState {
    cards: ICard[];
    card: ICard | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string;
    listId: number | null;
    listTitle: string;
    isVisibleCardModal: boolean;
}

const initialState: CardState = {
    cards: [],
    card: null,
    status: 'idle',
    error: '',
    listId: null,
    listTitle: '',
    isVisibleCardModal: false,
};

export const cardSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        showModalCardWindow(state, action) {
            const { card, listId, listTitle} = action.payload;
            state.card = card;
            state.listId = listId;
            state.listTitle = listTitle;
            state.isVisibleCardModal = true;
        },
        closeModalCardWindow(state) {
            state.isVisibleCardModal = false;
        }
    },
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
            return state;
        },
        [editTitleCard.rejected.type]: (state, action) => {
            if (action.error.message) {
                state.status = 'failed';
                state.error = toast.error(action.error.message);
            }
        },
        [editPositionCard.fulfilled.type]: (state) => {
            return state;
        },
        [editDescriptionCard.fulfilled.type]: (state) => {
            return state;
        }
    }
});

export const { showModalCardWindow, closeModalCardWindow } = cardSlice.actions;

export default cardSlice.reducer;