import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../api/request";

export const addNewCard = createAsyncThunk('cards/addNewCard', async ({ board_id, card }: { board_id: number, card: { title: string, list_id: number, position: number } }) => {
    await instance.post(`/board/${board_id}/card`, card);
})

export const deleteCard = createAsyncThunk('cards/deleteCard', async ({ board_id, list_id }: { board_id: number, list_id: number }) => {
    await instance.delete(`/board/${board_id}/card/${list_id}`);
})

export const editTitleCard = createAsyncThunk('cards/editTitleCard', async ({ board_id, card_id, list_id, title }: { board_id: number, card_id: number, list_id: number, title: string }) => {
    await instance.put(`/board/${board_id}/card/${card_id}`, { title: title, list_id });
})

export const editPositionCard = createAsyncThunk('cards/editPositionCard', async ({ board_id, card }: { board_id: number, card: [{ id: number, position: number, list_id: number }] }) => {
    await instance.put(`/board/${board_id}/card`, card);
})
