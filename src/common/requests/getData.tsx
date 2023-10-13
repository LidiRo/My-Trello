import instance from "../../api/request";
import { BoardsServerResponse } from "../../common/interfaces/BoardsServerResponse";

const getData = async () => {
    try {
        const data: BoardsServerResponse = await instance.get('/board');
        return data;
    } catch (err: any) {
        console.log(`Error: ${err.message}`);
    }
}

export default getData;