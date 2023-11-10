import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IList } from "../../common/interfaces/IList";

interface ListState {
    title: string;
    lists: IList[];
    custom: { backgroundColor: string };
    backgroundColor: string;
    isLoading: boolean;
    error: string;
}

const initialState: ListState = {
    title: '',
    lists: [],
    custom: { backgroundColor: "rgb(241, 246, 244)" },
    backgroundColor: "rgb(241, 246, 244)",
    isLoading: false,
    error: ''
}

export const listSlice = createSlice({
    name: 'list',
    initialState: initialState, 
    reducers: {
        loadingLists(state) {
            state.isLoading = true;
        },
        setError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        setAllLists(state, action: PayloadAction<IList[]>) {
            state.isLoading = false;
            state.error = '';
            state.lists = action.payload;
        },
        setTitleBoard(state, action: PayloadAction<string>) {
            state.title = action.payload;
        },
        setBackgroubdColor(state, action: PayloadAction<string>) {
            state.custom.backgroundColor = action.payload;
        },
        addNewList(state, action: PayloadAction<IList>) {
            state.lists.push(action.payload);
        },
        editList(state, action: PayloadAction<string>) {
            state.title = action.payload;
        },
        removeList(state, action: PayloadAction<number>) {
            state.lists = state.lists.filter(item => item.id !== action.payload)
        },

    }
})

export default listSlice.reducer;