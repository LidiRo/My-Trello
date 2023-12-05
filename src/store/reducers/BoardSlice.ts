import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBoard } from "../../common/interfaces/IBoard";
import toast from "react-hot-toast";
import { fetchBoards, addNewBoard, deleteBoard } from "../action-creators/BoardsActionCreators";

interface BoardState {
    boards: IBoard[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string;
};

const initialState: BoardState = {
    boards: [],
    status: 'idle',
    error: ''
};

export const boardSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchBoards.fulfilled.type]: (state, action: PayloadAction<IBoard[]>) => {
            state.status = 'succeeded';
            state.boards = action.payload;
        },
        [fetchBoards.rejected.type]: (state, action) => {
            if (action.error.message) {
                state.status = 'failed';
                state.error = toast.error(action.error.message);
            }
        },
        [addNewBoard.fulfilled.type]: (state) => {
            return state;
        },
        [addNewBoard.rejected.type]: (state, action) => {
            if (action.error.message) {
                state.status = 'failed';
                state.error = toast.error(action.error.message);
            }
        },
        [deleteBoard.fulfilled.type]: (state) => {
            return state;
        },
        [deleteBoard.rejected.type]: (state, action) => {
            if (action.error.message) {
                state.status = 'failed';
                state.error = toast.error(action.error.message);
            }
        },
    }
});

export default boardSlice.reducer;