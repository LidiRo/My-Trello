import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../api/request";
import { IBoard } from "../../common/interfaces/IBoard";

export const fetchBoards = createAsyncThunk('boards/fetchBoards', async () => {
    const response: { boards: IBoard[] } = await instance.get('/board');
    return response.boards;
})

export const addNewBoard = createAsyncThunk('boards/addNewBoard', async (title: string) => {
    await instance.post('/board', { title: title })
})

export const deleteBoard = createAsyncThunk('boards/deleteBoard', async (id: number | undefined) => {
    await instance.delete(`/board/${id}`);
})
