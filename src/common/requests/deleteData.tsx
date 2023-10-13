import instance from "../../api/request";
import { IBoard } from "../interfaces/IBoard";

const deleteData = async (id: number | undefined, boards: IBoard[]) => {
    try {
        await instance.delete(`/board/${id}`);
        return boards?.filter(board => board.id !== id);
    } catch (err: any) {
        console.log(`Error: ${err.message}`);
    }
}

export default deleteData;