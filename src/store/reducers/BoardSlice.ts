import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBoard } from "../../common/interfaces/IBoard";
import { IList } from "../../common/interfaces/IList";

interface BoardState {
    boards: IBoard[];
    isLoading: boolean;
    error: string;
}

const initialState: BoardState = {
    boards: [],
    isLoading: false,
    error: ''
}

export const boardSlice = createSlice({
    name: 'board',
    initialState: initialState, 
    reducers: {
        loadingBoards(state) {
            state.isLoading = true;
        },
        setError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        setAllBoards(state, action: PayloadAction<IBoard[]>) {
            state.isLoading = false;
            state.error = '';
            state.boards = action.payload;
        },
        addNewBoard(state, action: PayloadAction<IBoard>) {
            state.boards.push(action.payload);
        },
        editBoard(state, action: PayloadAction<IBoard>) {
            const boardIndex = state.boards.findIndex(item => item.id === action.payload.id);
            state.boards.splice(boardIndex, 1, action.payload);
        },
        removeBoard(state, action: PayloadAction<number>) {
            state.boards = state.boards.filter(item => item.id !== action.payload)
        },

    }
})

export default boardSlice.reducer;