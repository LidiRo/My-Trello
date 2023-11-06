import instance from "../api/request";
import { ICard } from "../common/interfaces/ICard"


const cardsService = {
    async fetchAllCardsAPI(board_id: number, list_id: number) { 
        console.log(`/board/${board_id}/list/${list_id}`)
        const response: { cards: ICard[] } = await instance.get(`/board/${board_id}/list/${list_id}/card`);
        return response;
    },
    async createCardAPI(board_id: number, card: { title: string, list_id: number, position: number }) {
        const response = await instance.post(`/board/${board_id}/card`, card);
        return response;
    },
    async editCardAPI(title: string, board_id: number, id: number | undefined, list_id: number | undefined) {
        const response = await instance.put(`/board/${board_id}/card/${id}`, { title: title, list_id });
        return response;
    },
    async deleteCardAPI(board_id: number, id: number) {
        const response = await instance.delete(`/board/${board_id}/card/${id}`);
        return response;
    },
}

export default cardsService;
