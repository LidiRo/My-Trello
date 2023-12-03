import { createSlice} from "@reduxjs/toolkit";
import { IBoard } from "../../common/interfaces/IBoard";
import toast from "react-hot-toast";
import { addNewBoard, deleteBoard, fetchBoards } from "./ActionCreators";

interface BoardState{
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
    extraReducers(builder) {
        builder
            .addCase(fetchBoards.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBoards.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.boards = action.payload;
            })
            .addCase(fetchBoards.rejected, (state, action) => {
                state.status = 'failed';
                if (action.error.message) {
                    state.error = toast.error(action.error.message);
                }
            })
            .addCase(addNewBoard.fulfilled, (state) => { 
                return state;
            })
            .addCase(deleteBoard.fulfilled, (state) => { 
                return state;
            })
    }
});

export default boardSlice.reducer;