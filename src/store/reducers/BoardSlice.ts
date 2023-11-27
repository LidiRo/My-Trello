import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBoard } from "../../common/interfaces/IBoard";
import { fetchBoards } from "./ActionCreators";

interface BoardState{
    boards: IBoard[];
};

const initialState: BoardState = {
    boards: [],
};

export const boardSlice = createSlice({
    name: 'board',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [fetchBoards.fulfilled.type]: (state, action: PayloadAction<IBoard[]>) => {
            state.boards = action.payload;
        }
    }
});

export default boardSlice.reducer;