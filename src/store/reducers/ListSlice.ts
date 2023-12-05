import { createSlice } from "@reduxjs/toolkit";
import { IList } from "../../common/interfaces/IList";
import toast from "react-hot-toast";
import { fetchLists, editTitleBoard, addNewList, deleteList, editTitleList, editBackground } from "../action-creators/ListsActionCreators";

interface ListState {
    title: string;
    lists: IList[];
    custom?: { background: string };
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string;
}

const initialState: ListState = {
    title: '',
    lists: [],
    custom: { background: '#D4E2EE' },
    status: 'idle',
    error: '',
};

export const listSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchLists.fulfilled.type]: (state, action) => {
            const { title, lists, custom } = action.payload;
            state.status = 'succeeded';
            state.title = title;
            state.lists = lists;
            if (state.custom !== undefined) {
                state.custom.background = custom.background;
            }
        },
        [fetchLists.rejected.type]: (state, action) => {
            if (action.error.message) {
                state.status = 'failed';
                state.error = toast.error(action.error.message);
            }
        },
        [editTitleBoard.fulfilled.type]: (state) => {
            return state;
        },
        [editTitleBoard.rejected.type]: (state, action) => {
            if (action.error.message) {
                state.status = 'failed';
                state.error = toast.error(action.error.message);
            }
        },
        [addNewList.fulfilled.type]: (state) => {
            return state;
        },
        [addNewList.rejected.type]: (state, action) => {
            if (action.error.message) {
                state.status = 'failed';
                state.error = toast.error(action.error.message);
            }
        },
        [deleteList.fulfilled.type]: (state) => {
            return state;
        },
        [deleteList.rejected.type]: (state, action) => {
            if (action.error.message) {
                state.status = 'failed';
                state.error = toast.error(action.error.message);
            }
        },
        [editTitleList.fulfilled.type]: (state) => {
            return state;
        },
        [editTitleList.rejected.type]: (state, action) => {
            if (action.error.message) {
                state.status = 'failed';
                state.error = toast.error(action.error.message);
            }
        },
        [editBackground.fulfilled.type]: (state, action) => {
            if (state.custom !== undefined) {
                state.custom.background = action.payload;
            }
        },
        [editBackground.rejected.type]: (state, action) => {
            if (action.error.message) {
                state.status = 'failed';
                state.error = toast.error(action.error.message);
            }
        },
    }
})

export default listSlice.reducer;