import instance from "../../api/request";

const postData = async (title: string) => {
    try {
        const board = { title: title };
        await instance.post(`/board`, board);
    } catch (err: any) {
        console.log(`Error: ${err.message}`);
    }
}

export default postData;