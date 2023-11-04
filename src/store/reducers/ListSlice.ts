import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IList } from "../../common/interfaces/IList";

interface ListState {
    title: string;
    lists: IList[];
    isLoading: boolean;
    error: string;
}

const initialState: ListState = {
    title: '',
    lists: [],
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