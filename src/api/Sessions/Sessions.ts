import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../Environments';


const sessionId = localStorage.getItem('sessionId');
console.log(sessionId);

const validateSession = async () => {
    try {
        console.log("entering validate session")
        const response = await axios.post(`${API_URL}/session/validateSession`, {
            headers: {
                "Authorization": `Bearer ${sessionId}`
            },
            sessionToken: sessionId,
            withCredentials: true
        });
        console.log(response);

        if (response.status === 200) {
            return response.data.user;
        }

        return null;

    } catch(_err) {
        console.log('validateSession error: ' + _err);
        return null;
    }
}


const createSession = async (userId: string, idToken: string, userRole: string) => {
    try {
        const response: any = await axios.post<any, AxiosResponse<string[]>>(`${API_URL}/session/createSession`, {
            userId: userId,
            idToken: idToken,
            userRole: userRole
        },
        { withCredentials: true  });
        

        if (response.status === 200) {
            return response.data.user;
        }

        return null;

    } catch(_err) {
        console.log('Session: ' + _err)
        return null;
    }
}

const deleteSession = async () => {
    try {
        const response: any = await axios.delete<any, AxiosResponse<string[]>>(`${API_URL}/session/deleteSession`, {
            headers: {
                "Authorization": `Bearer ${sessionId}`
            },
            withCredentials: true
            
            });

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