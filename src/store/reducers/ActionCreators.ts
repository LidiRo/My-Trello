import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../api/request";
import { IBoard } from "../../common/interfaces/IBoard";

const PATTERN = new RegExp(/^[0-9a-zA-Zа-яА-ЯіІєЄїЇ\s\-_.]+$/i);

export const fetchBoards = createAsyncThunk('boards/fetchBoards', async () => {
    const board: { boards: IBoard[] } = await instance.get('/board');
    return board.boards;
})

export const addNewBoard = createAsyncThunk('boards/addNewBoard', async (title: string) => {
    if (title !== "" && PATTERN.test(title)) {
        await instance.post('/board', { title: title })
    }
})

export const deleteBoard = createAsyncThunk('boards/deleteBoard', async (id: number | undefined) => {
    if (id !== undefined) {
        await instance.delete(`/board/${id}`);
    }
})

