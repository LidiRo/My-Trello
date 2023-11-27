import { Dispatch } from "redux"
import { BoardAction, BoardActionTypes } from "../common/types/board"
import instance from "../api/request";
import { IBoard } from "../common/interfaces/IBoard";
import toast from "react-hot-toast";

const PATTERN = new RegExp(/^[0-9a-zA-Zа-яА-ЯіІєЄїЇ\s\-_.]+$/i);

export const fetchBoards = () => {
    return async (dispatch: Dispatch<BoardAction>) => {
        try {
            const board: { boards: IBoard[] } = await instance.get('/board');
            dispatch({
                type: BoardActionTypes.FETCH_BOARDS,
                payload: board.boards
            })
        } catch (err: any) {
            toast.error(err.message);
        }
    }
}

export const postBoard = (title: string) => {
    return async (dispatch: Dispatch<BoardAction>) => {
        try {
            if (title !== "" && PATTERN.test(title)) {
                await instance.post('/board', { title: title })
                dispatch({
                    type: BoardActionTypes.POST_BOARD,
                })
            }
        } catch (err: any) {
            toast.error(err.message);
        }
    }
}

export const deleteBoard = (id: number | undefined) => {
    return async (dispatch: Dispatch<BoardAction>) => {
        try {
            if (id !== undefined) {
                await instance.delete(`/board/${id}`);
                dispatch({
                    type: BoardActionTypes.DELETE_BOARD,
                })
            }
        } catch (err: any) {
            toast.error(err.message);
        }
    }
}