import { AppDispatch} from "../store";
import { listSlice } from "./ListSlice";
import { IList } from "../../common/interfaces/IList";
import listsService from "../../service/listsService";

export const listActions = listSlice.actions;

export const fetchAllLists = (board_id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(listActions.loadingLists())
        const response: { lists: IList[], title: string } = await listsService.fetchAllListsAPI(board_id);
        dispatch(listActions.setAllLists(response.lists))
        dispatch(listActions.setTitleBoard(response.title))
    } catch (e: any) {
        dispatch(listActions.setError("ERROR" + e.message))
    }
}

export const createList = (title: string , board_id: number, position: number) => async (dispatch: AppDispatch) => {
    try {
        const response: IList = await listsService.createListAPI({ title: title, board_id, position});
        dispatch(listActions.addNewList(response));
    } catch (e: any) {
        dispatch(listActions.setError(e.message))
    }
}

export const editTitleBoard = (title: string, board_id: number) => async (dispatch: AppDispatch) => {
    const response = await listsService.editTitleBoardAPI(title, board_id);
    dispatch(listActions.editList(response.data))
}

export const editTitleList = (title: string, board_id: number, id: number | undefined) => async (dispatch: AppDispatch) => {
    const response = await listsService.editTitleListAPI(title, board_id, id);
    dispatch(listActions.editList(response.data))
}

export const deleteList = (board_id: number, id: number) => async (dispatch: AppDispatch) =>{
    const response = await listsService.deleteListAPI(board_id, id);
    if (response.status === 200) {
        dispatch(listActions.removeList(id));
    }
}