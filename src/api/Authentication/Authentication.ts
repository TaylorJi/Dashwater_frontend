import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../Environments';


const authenticateUser = async (email: string, password: string) => {
    try {
        const response: any = await axios.post<any, AxiosResponse<string[]>>(`${API_URL}/user/validateUser`,
            {
                email: email,
                password: password
            }
        );

        if (response.status === 200) {
            return response.data.user;
        }

        return null;

    } catch(_err) {
        return null;
    }
}


const Authentication = {
    authenticateUser
};

export default Authentication;