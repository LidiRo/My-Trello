import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../api/request";
import { IBoard } from "../../common/interfaces/IBoard";
import toast from "react-hot-toast";

export const fetchBoards = createAsyncThunk(
    'board/fetchAll',
    async (_, thunkAPI) => {
        try {
            const board: { boards: IBoard[] } = await instance.get('/board');
            return board.boards;
        } catch (err: any) {
            toast.error(err.message);
        }
        
    }
)