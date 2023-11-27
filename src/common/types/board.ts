import { IBoard } from "../interfaces/IBoard";

export enum BoardActionTypes {
    FETCH_BOARDS = 'FETCH_BOARDS',
    POST_BOARD = 'POST_BOARD',
    DELETE_BOARD = 'DELETE_BOARD'
}

export interface BoardState {
    boards: IBoard[];
}

interface FetchBoardsAction {
    type: BoardActionTypes.FETCH_BOARDS;
    payload: IBoard[];
}

interface PostBoardsAction {
    type: BoardActionTypes.POST_BOARD;
}

interface DeleteBoardsAction {
    type: BoardActionTypes.DELETE_BOARD;
}

export type BoardAction = FetchBoardsAction | PostBoardsAction | DeleteBoardsAction;