import axios, { AxiosResponse } from "axios";
import { API_URL } from "../Environments";
import { Navigate } from 'react-router';

type createUserResponse = {
    email: string,
    password: string,
    role: string;
};

type updateUserResponse = {
    email: string,
    password: string,
    role: string;
};


type deleteUserResponse = {
    userId: string
};


const sessionId = localStorage.getItem('sessionId');

// const getUser = async () => {
//     try {
//         // const response: any = await axios.get<any, AxiosResponse<string[]>>(`${API_URL}/user/getUser`);
//         const response = await axios.post("https://ma93xudga3.execute-api.us-east-1.amazonaws.com/prod/data/", {
//             operation: "scan"
//         });

//         if (response.status === 200) {
//             return response.data.data;
//         }

//         return null;

//     } catch (_err) {
//         return null;
//     }
// };

const getUser = async () => {
    try {
        const sessionId = localStorage.getItem('sessionId');
        const requestBody = {
            sessionId: sessionId,
        };
        const response = await axios.post(`${API_URL}/user/getUser`,
        requestBody,
        { withCredentials: true }
        );

        if (response.status === 200) {
            const users = response.data.items.map((item: { email: string, role: string }, index: number) => ({
                _id: index, // Temporarily use index as an ID
                email: item.email,
                role: item.role,
            }));
            console.log("!!!!!!!!!!!!!!!!!!!!! \n" + users);

            return users;
        }

        return null;

    } catch (_err) {
        console.error("Error in getUser:", _err);
        return null;
    }
};

const createUser = async (user: any) => {
    try {
        const sessionId = localStorage.getItem('sessionId');
        const requestBody = {
            sessionId: sessionId,
            email: user.email,
            password: user.password,
            role: user.role
        };
        const response = await axios.post(`${API_URL}/user/createUser`,
        requestBody,
        { withCredentials: true }
        );

        if (response.status === 200) {
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error in createUser:", error);
        return false;
    }
};

const deleteUser = async (idArray: string[]) => {
    try {
        const sessionId = localStorage.getItem('sessionId');
        const requestBody = {
            sessionId: sessionId,
            email: idArray[0]
        };
        const response = await axios.post(`${API_URL}/user/deleteUser`,
        requestBody,
        { withCredentials: true }
        );
        if (response.status === 200) {
            return true;
            // window.location.reload();
        }
        return false;
    } catch (_err) {
        console.error("Error in deleteUser:", _err);
        return false;
    }
};

const getSingleUser = async (idArray: string[]) => {
    try {
        const sessionId = localStorage.getItem('sessionId');
        const requestBody = {
            sessionId: sessionId,
            email: idArray[0]
        };
        const response: any = await axios.post(`${API_URL}/user/getSingleUser`,
        requestBody,
        { withCredentials: true }
        );
        if (response.status === 200) {
            global.email = response.data.email;
            global.role = response.data.role;
            return response;
        }
        return null;

    } catch (_err) {
        return null;
    }
};

const updateUser = async (user: any) => {
    try {
        const sessionId = localStorage.getItem('sessionId');
        const requestBody = {
            sessionId: sessionId,
            user: user
        };

        const response: any = await axios.post(`${API_URL}/user/updateUser`,
        requestBody,
        { withCredentials: true }
        );

        if (response.status === 200) {
            return true;
            // window.location.reload();
        }
        return false;
    } catch (error) {
        console.error("Error in createUser:", error);
        return false;
    }
};

const AdminPortal = {
    getUser,
    createUser,
    deleteUser,
    getSingleUser,
    updateUser,
};

export default AdminPortal;