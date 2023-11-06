import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICard } from "../../common/interfaces/ICard";


interface CardState {
    title: string;
    cards: ICard[];
    isLoading: boolean;
    error: string;
}

const initialState: CardState = {
    title: '',
    cards: [],
    isLoading: false,
    error: ''
}

export const cardSlice = createSlice({
    name: 'card',
    initialState: initialState,
    reducers: {
        loadingCards(state) {
            state.isLoading = true;
        },
        setError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        setAllCards(state, action: PayloadAction<ICard[]>) {
            state.isLoading = false;
            state.error = '';
            state.cards = action.payload;
            console.log("state.cards", state.cards)
        },
        addNewCard(state, action) {
            state.cards.push(action.payload);
        },
        editCard(state, action: PayloadAction<string>) {
            state.title = action.payload;
        },
        removeCard(state, action: PayloadAction<number>) {
            state.cards = state.cards.filter(item => item.id !== action.payload)
        },
    }
})

export default cardSlice.reducer;