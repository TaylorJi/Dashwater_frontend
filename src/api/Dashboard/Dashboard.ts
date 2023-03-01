import axios, { AxiosResponse } from "axios";
import { API_URL } from "../Environments";

const getWeather = async () => {
    try {

        const response: any = await axios.get<any, AxiosResponse<string[]>>(`${API_URL}/weather/getWeather`);

        if (response.status === 200) {
            return response.data.data;

        }

        return null;

    } catch (_err) {
        return null;
    }

};

const getTide = async () => {

    try {

        const response: any = await axios.get<any, AxiosResponse<string[]>>(`${API_URL}/weather/getTide`);

        if (response.status === 200) {
            return response.data.data;

        }

        return null;

    } catch (_err) {
        return null;
    }

};

const Dashboard = {
    getWeather,
    getTide
};

export default Dashboard;