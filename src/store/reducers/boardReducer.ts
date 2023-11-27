import { BoardAction, BoardActionTypes, BoardState } from "../../common/types/board";

const initialState: BoardState = {
    boards: [],
}

export const boardReducer = (state = initialState, action: BoardAction): BoardState => {
    switch (action.type) {
        case BoardActionTypes.FETCH_BOARDS:
            return { boards: action.payload }
        case BoardActionTypes.POST_BOARD:
            return { ...state }
        case BoardActionTypes.DELETE_BOARD:
            return { ...state }
        default:
            return state;
    }
}