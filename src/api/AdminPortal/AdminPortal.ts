import axios, { AxiosResponse } from "axios";
import { API_URL } from "../Environments";

//20230505 EJ - created AdminPortal.ts
const getUser = async () => {
    try {

        const response: any = await axios.get<any, AxiosResponse<string[]>>(`${API_URL}/user/getUser`);

        if (response.status === 200) {
            // console.log('data: ' + response.data.data);
            return response.data.data;
        }

        return null;

    } catch (_err) {
        return null;
    }
};

const createUser = async () => {

};

const deleteUser = async (idArray: string[]) => {
    console.log(idArray);
};

const editUser = async (idArray: string[]) => {
    console.log("AdminPortal editUser called")
    console.log(idArray[0])
    try {
            const response: any = await axios.get<any, AxiosResponse<string>>(`${API_URL}/user/getSingleUser/${idArray[0]}`)
        if (response.status === 200) {
            console.log('Get single user data: ' + response.data);
            return response.data;
        }

        console.log("try")
        return null;

    } catch (_err) {
        console.log("error")
        return null;
    }
};

const AdminPortal = {
    getUser,
    createUser,
    deleteUser,
    editUser,
};

export default AdminPortal;