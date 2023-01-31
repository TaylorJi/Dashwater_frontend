import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../Environments';

const testEndpoint = async (msg: string) => {

    try {

        const response: any = await axios.post<any, AxiosResponse<string[]>>(`${API_URL}/auth/testAuth`,
            {
                msg: msg
            }
        );

        if (response.status === 200) {
            return response.data.text;

        }

        return null;

    } catch (_err) {
        return null;
    }

};


const Authentication = {
    testEndpoint

};

export default Authentication;