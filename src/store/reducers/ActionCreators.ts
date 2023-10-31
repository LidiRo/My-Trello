import { IBoard } from "../../common/interfaces/IBoard";
import { AppDispatch } from "../store";
import instance from "../../api/request";
import { boardSlice } from "./BoardSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";


// export const fetchBoards = () => async (dispatch: AppDispatch) => {
//     try {
//         dispatch(boardSlice.actions.boardsFetching());
//         const response : {boards : []} = await instance.get(`/board`);
//         console.log("response.data", response.boards)
//         dispatch(boardSlice.actions.boardsFetchingSuccess(response.boards));
//     } catch(err: any) {
//         dispatch(boardSlice.actions.boardsFetchingError(err.message));
//     }
// }

export const fetchBoards = createAsyncThunk(
    'board/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response: { boards: [] } = await instance.get(`/board`);
            console.log("response.data", response.boards);
            return response.boards;
        } catch(err: any) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)