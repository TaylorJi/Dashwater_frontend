import axios, { AxiosResponse } from 'axios';
import { USER_URL } from "../Environments";


const authenticateUser = async (email: string, password: string) => {
    try {
        const response: any = await axios.post(USER_URL,
            {
                operation: "verify",
                email: email,
                password: password
            }
        );

        if (response.status === 200) {
            return response.data;
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