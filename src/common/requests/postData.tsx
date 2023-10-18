import instance from "../../api/request";

const postData = async (title: string, api: string) => {
    try {
        await instance.post(api, { title: title });
    } catch (err: any) {
        console.log(`Error: ${err.message}`);
    }
}

export default postData;