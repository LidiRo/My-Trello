import instance from "../api/request";
import { IBoard } from "../common/interfaces/IBoard";

const boardsService = {
    async fetchAllBoards() {
        const response : {boards: IBoard[]} = await instance.get('/board');
        return response;
    },
    async addBoard(board : {title: string}) {
        const response : IBoard = await instance.post('/board', board);
        return response;
    },
    async removeBoard(id: number) {
        const response = await instance.delete(`/board/${id}`);
        return response;
    },

};

export default boardsService;