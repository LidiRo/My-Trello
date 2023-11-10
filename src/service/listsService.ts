import instance from "../api/request";
import { IList } from "../common/interfaces/IList";


const listsService = {
    async fetchAllListsAPI(board_id: number) {
        const response: { lists: IList[], title: string, backgroundColor: string } = await instance.get(`/board/${board_id}`);
        return response;
    },
    async createListAPI(list: { title: string , board_id: number, position: number }) {
        const response: IList = await instance.post(`/board/${list.board_id}/list`, list);
        return response;
    },
    async editTitleBoardAPI(title: string, board_id: number) {
        const response = await instance.put(`/board/${board_id}`, { title: title });
        return response;
    },
    async editTitleListAPI(title: string, board_id: number, id: number | undefined) {
        const response = await instance.put(`/board/${board_id}/list/${id}`, { title: title });
        return response;
    },
    async editBackgroundBoardAPI(board_id: number, custom: { backgroundColor: string }) {
        console.log("backgroundColor2", custom.backgroundColor)
        console.log("custom", custom)

        const response = await instance.put(`/board/${board_id}`, { custom });
        console.log("response", response)
        return response;
    },
    async deleteListAPI(board_id: number, id: number) {
        const response = await instance.delete(`/board/${board_id}/list/${id}`);
        return response;
    },
};

export default listsService;