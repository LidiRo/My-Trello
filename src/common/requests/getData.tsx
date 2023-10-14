import instance from "../../api/request";
import { ServerResponse } from "../interfaces/ServerResponse";

const getData = async (api: string) => {
    try {
        const data: ServerResponse = await instance.get(api);
        return data;
    } catch (err: any) {
        console.log(`Error: ${err.message}`);
    }
}

export default getData;