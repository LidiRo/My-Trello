import { ICard } from "../../common/interfaces/ICard";
import cardsService from "../../service/cardsService";
import { AppDispatch } from "../store";
import { cardSlice } from "./CardSlice";


export const cardActions = cardSlice.actions;

export const fetchAllCards = (board_id: number, list_id: number) => async (dispatch: AppDispatch) => {
    try {
        const response: { cards: ICard[] } = await cardsService.fetchAllCardsAPI(board_id, list_id);
        dispatch(cardActions.setAllCards(response.cards));
    } catch (e: any) {
        dispatch(cardActions.setError(e.message))
    }
}

export const createCard = (title: string, board_id: number, list_id: number, position: number) => async (dispatch: AppDispatch) => {
    try {
        const response = await cardsService.createCardAPI(board_id, { title, list_id, position });
        dispatch(cardActions.addNewCard(response));
    } catch (e: any) {
        dispatch(cardActions.setError(e.message))
    }
}

export const editCard = (title: string, board_id: number, id: number | undefined, list_id: number | undefined) => async (dispatch: AppDispatch) => {
    const response = await cardsService.editCardAPI(title, board_id, id, list_id);
    dispatch(cardActions.editCard(response.data))
}

export const deleteCard = (board_id: number, id: number) => async (dispatch: AppDispatch) => {
    const response = await cardsService.deleteCardAPI(board_id, id);
    if (response.status === 200) {
        dispatch(cardActions.removeCard(id));
    }
}