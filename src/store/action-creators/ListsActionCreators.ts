import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../api/request";
import { IList } from "../../common/interfaces/IList";
import api from '../../api/request';
import { ICard } from "../../common/interfaces/ICard";

export const fetchLists = createAsyncThunk('lists/fetchLists', async (board_id: number) => {
    const response: { title: string, lists: IList[], custom?: { background: string } } = await instance.get(`/board/${board_id}`);
    console.log("response.lists", response.lists)
    return response;
})

export const editTitleBoard = createAsyncThunk('lists/editTitleBoard', async ({ board_id, title }: { board_id: number, title: string }) => {
    await instance.put(`/board/${board_id}`, { title: title });
})

export const addNewList = createAsyncThunk('lists/addNewList', async ({ board_id, title, position }: { board_id: number, title: string, position: number }) => {
    await instance.post(`/board/${board_id}/list`, { title, position });
})

export const deleteList = createAsyncThunk('lists/deleteList', async ({ board_id, list_id }: { board_id: number, list_id: number }) => {
    await instance.delete(`/board/${board_id}/list/${list_id}`);
})

export const editTitleList = createAsyncThunk('lists/editTitleList', async ({ board_id, list_id, title }: { board_id: number, list_id: number, title: string }) => {
    await instance.put(`/board/${board_id}/list/${list_id}`, { title: title });
})

export const editCardsPosition = createAsyncThunk('lists/editCardsPosition', async ({ board_id, list_id, cards }: { board_id: number, list_id: number, cards: ICard[] }) => {
    await instance.put(`/board/${board_id}/list/${list_id}`, { cards: cards });
})

export const editBackground = createAsyncThunk('lists/editBackground', async ({ board_id, custom, title, color }: { board_id: number, custom: { background: string }, title: string, color: string }) => {
    await api.put(`/board/${board_id}`, { title, custom: { background: color } });
})