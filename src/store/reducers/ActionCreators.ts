import instance from "../../api/request";
import { IBoard } from "../../common/interfaces/IBoard";
import { AppDispatch } from "../store";
import { boardSlice } from "./BoardSlice";


export const fetchBoards = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(boardSlice.actions.boardsFetching())
        const response : {boards: IBoard[]} = await instance.get('/board')
        console.log("response", response)
        dispatch(boardSlice.actions.boardsFetchingSuccess(response.boards))
    } catch (e: any) {
        dispatch(boardSlice.actions.boardsFetchingError(e.message))
    }
}

export const postBoards = (title: string) => async (dispatch: AppDispatch) => {
    try {
        const board = { title: title };
        await instance.post(`/board`, board);
    } catch (e: any) {
        dispatch(boardSlice.actions.boardsFetchingError(e.message))
    }
}