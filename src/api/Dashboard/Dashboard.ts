import axios, { AxiosResponse } from "axios";
import { API_URL } from "../Environments";

const sessionId = localStorage.getItem('sessionId');
const getWeather = async () => {
    try {

        const response: any = await axios.get<any, AxiosResponse<string[]>>(`${API_URL}/weather/getWeather`, { withCredentials: true });

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

        const response: any = await axios.get<any, AxiosResponse<string[]>>(`${API_URL}/weather/getTide`, { withCredentials: true });

        if (response.status === 200) {
            return response.data.data;

        }

        return null;

    } catch (_err) {
        return null;
    }

};

const getCachedData = async (end: string) => {

    try {

        const response: any = await axios.post<any, AxiosResponse<string[]>>(`${API_URL}/ts/getCachedData`, {
            end: end
        }, { withCredentials: true });

        if (response.status === 200) {
            return response.data.data;
        }
        return null;

    } catch (_err) {
        return null;
    }

};

const getCachedLogData = async (end: string) => {

    try {

        const response: any = await axios.post<any, AxiosResponse<string[]>>(`${API_URL}/ts/getCachedLogData`, {
            end: end
        }, { withCredentials: true });

        if (response.status === 200) {
            return response.data.data;
        }
        return null;

    } catch (_err) {
        return null;
    }

};

const getCustomRangeData = async (start: string, end: string) => {

    try {

        const response: any = await axios.post<any, AxiosResponse<string[]>>(`${API_URL}/ts/getCustomRangeData`, {
            start: start,
            end: end
        }, { withCredentials: true });

        if (response.status === 200) {
            return response.data.data;
        }
        return null;

    } catch (_err) {
        return null;
    }

};

const getCustomRangeLogData = async (start: string, end: string) => {

    try {

        const response: any = await axios.post<any, AxiosResponse<string[]>>(`${API_URL}/ts/getCustomRangeLogData`, {
            start: start,
            end: end
        }, { withCredentials: true });

        if (response.status === 200) {
            return response.data.data;
        }
        return null;

    } catch (_err) {
        return null;
    }

};


const getCachedHighLowHistorical = async () => {
    try {
        const response: any = await axios.get<any, AxiosResponse<string[]>>(`${API_URL}/ts/getCachedHistorical`, { withCredentials: true });

        if (response.status === 200) {
            return response.data.data;
        }
        return null;

    } catch (_err) {
        return null;
    }
}


const getAllBuoyIds = async () => {
    try {
        const response = await axios.get(`${API_URL}/ts/getAllBuoyIds`, 
        {
            headers: {
                "Authorization": `Bearer ${sessionId}`
            },
            withCredentials: true
        });
        if (response.status === 200) {
            return response.data;
        }
     
    } catch (_err) {
        return null;
    }
}

const Dashboard = {
    getWeather,
    getTide,
    getCachedData,
    getCachedLogData,
    getCustomRangeData,
    getCustomRangeLogData,
    getCachedHighLowHistorical,
    getAllBuoyIds

};

export default Dashboard;