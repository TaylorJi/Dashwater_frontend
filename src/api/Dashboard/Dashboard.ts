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


// const getCachedHighLowHistorical = async () => {
//     try {
//         const response: any = await axios.get<any, AxiosResponse<string[]>>(`${API_URL}/ts/getCachedHistorical`, { withCredentials: true });

//         if (response.status === 200) {
//             return response.data.data;
//         }
//         return null;

//     } catch (_err) {
//         return null;
//     }
// }



const getCachedHighLowHistorical = async (device_name: string, sensor_name:string, time:string) => {
    try {
        console.log(sensor_name);
        const response = await axios.post(`${API_URL}/ts/getHistoricalHighLow`, 
        {device_name, sensor_name, time},
        {
            
            headers: {
                "Authorization": `Bearer ${sessionId}`
            },
         
            withCredentials: true
        });


        // const response: any = await axios.get<any, AxiosResponse<string[]>>(`${API_URL}/ts/getCachedHistorical`, { withCredentials: true });

        if (response.status === 200) {
            console.log(response.data.data);
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

const getSensors = async (device_name: string) => {
    try{
        const response = await axios.post(`${API_URL}/ts/getSensors`,
        {device_name}, 
        {
            
            headers: {
                "Authorization": `Bearer ${sessionId}`
            },
            withCredentials: true
        });
        if (response.status === 200) {
            console.log(response.data.data);
            return response.data.data;
        }

    } catch (_err) {
        console.log(_err);
        return null;

    }
}

const test = async () => {
    try{
        const response = await axios.get(`${API_URL}/ts/test`, 
        {
            headers: {
                "Authorization": `Bearer ${sessionId}`
            },
            withCredentials: true
        });
        if (response.status === 200) {
            console.log(response.data.data);
            return response.data.data;
        }

    } catch (_err) {
        console.log(_err);
        return null;

    }
}

const getData = async (device_name: string, time: string) => {
    try{
    const response = await axios.post(`${API_URL}/ts/getData`,
    {device_name, time},
    {headers: {
        "Authorization": `Bearer ${sessionId}`
    },
    withCredentials: true
});

    if (response.status === 200) {
        return response.data.data;
    }
} catch (_err) {
    console.log(_err);
    return null;


}
}

const getAllDevice = async () => {
    try{
        const response = await axios.get(`${API_URL}/ts/getAllDevice`,
        {headers: {
            "Authorization": `Bearer ${sessionId}`
        },
        withCredentials: true
    });
        if (response.status === 200) {
            return response.data.data;
        }
    } catch (_err) {
        console.log(_err);
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
    getAllBuoyIds,
    test,
    getSensors,
    getData,
    getAllDevice

};

export default Dashboard;