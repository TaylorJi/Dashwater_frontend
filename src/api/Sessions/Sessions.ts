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
            const returnedSessionId = response.data.sessionId;
            var sessionArray: any[] = JSON.parse(localStorage.getItem("sessionArray")!);
            let foundSession = sessionArray.find(session => session.sessionId === returnedSessionId);
            const expirationTime = new Date();
            expirationTime.setHours(expirationTime.getHours() + 2);
            foundSession.sessionExpiry = expirationTime.toISOString();
            localStorage.setItem("sessionArray", JSON.stringify(sessionArray));
            const res = await axios.post(`${API_URL}/session/updateSessionExpiry`, 
            {
                newSession: foundSession,
                withCredenitials: true
            });
            if (res.status === 200) {
                const res1: any = await axios.get<any, AxiosResponse<string>>(`https://ma93xudga3.execute-api.us-east-1.amazonaws.com/prod/data/?email=${foundSession.userId}`)
                if (res1.status === 200) {
                    const fetchedUser = res1.data;
                    const user: userDataType = {
                        email: fetchedUser["email"],
                        // userId: fetchedUser["_id"], 
                        userId: fetchedUser["email"],
                        role: fetchedUser["role"],
                    };
                    return user;
                }
            }
            // return response.data.user;
        }

        return null;

    } catch(_err) {
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
            if (localStorage.getItem("sessionArray")) {
                var sessionArray: any[] = JSON.parse(localStorage.getItem("sessionArray")!);
                sessionArray.push(response.data.user);
                localStorage.setItem("sessionArray", JSON.stringify(sessionArray));
            } else {
                var sessionArray: any[] = [];
                sessionArray.push(response.data.user);
                localStorage.setItem("sessionArray", JSON.stringify(sessionArray));
            }
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
            var sessionArray: any[] = JSON.parse(localStorage.getItem("sessionArray")!);
            sessionArray = sessionArray.filter(session => session.sessionId !== response.data.sessionId);
            localStorage.setItem("sessionArray", JSON.stringify(sessionArray));
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