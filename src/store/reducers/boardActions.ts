import { IBoard } from "../../common/interfaces/IBoard";
import { AppDispatch} from "../store";
import { boardSlice } from "./BoardSlice";
import boardsService from "../../service/boardsService";

export const boardActions = boardSlice.actions;

export const fetchAllBoards = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(boardActions.loadingBoards())
        const response: { boards: IBoard[] } = await boardsService.fetchAllBoards();
        dispatch(boardActions.setAllBoards(response.boards))
    } catch (e: any) {
        dispatch(boardActions.setError(e.message))
    }
}

export const createBoard = (title: string) => async (dispatch: AppDispatch) => {
    try {
        const response: IBoard = await boardsService.addBoard({title:title});
        dispatch(boardActions.addNewBoard(response));
    } catch (e: any) {
        dispatch(boardActions.setError(e.message))
    }
}

export const deleteBoard = (id: number) => async (dispatch: AppDispatch) =>{
    const response = await boardsService.removeBoard(id);
    if (response.status === 200) {
        dispatch(boardActions.removeBoard(id));
    }
}