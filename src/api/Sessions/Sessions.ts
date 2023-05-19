import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../Environments';

const validateSession = async () => {
    try {
        const response: any = await axios.get<any, AxiosResponse<string[]>>(`${API_URL}/session/validateSession`, { withCredentials: true });

        if (response.status === 200) {
            return response.data.user;
        }

        return null;

    } catch(_err) {
        return null;
    }
}


const createSession = async (userId: string) => {
    try {
        const response: any = await axios.post<any, AxiosResponse<string[]>>(`${API_URL}/session/createSession`, {
            userId: userId
        },
        { withCredentials: true  });


        if (response.status === 200) {
            return response.data.user;
        }

        return null;

    } catch(_err) {
        return null;
    }
}

const deleteSession = async () => {
    try {
        const response: any = await axios.delete<any, AxiosResponse<string[]>>(`${API_URL}/session/deleteSession`, { withCredentials: true });

        if (response.status === 200) {
            return true;
        }

        return false;

    } catch(_err) {
        return false;
    }
}


const Sessions = {
    validateSession,
    createSession,
    deleteSession
};

export default Sessions;