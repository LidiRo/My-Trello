import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBoard } from "../../common/interfaces/IBoard";

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
    initialState, 
    reducers: {
        boardsFetching(state) {
            state.isLoading = true;
        },
        boardsFetchingSuccess(state, action: PayloadAction<IBoard[]>) {
            state.isLoading = false;
            state.error = '';
            state.boards = action.payload;
        },
        boardsFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export default boardSlice.reducer;