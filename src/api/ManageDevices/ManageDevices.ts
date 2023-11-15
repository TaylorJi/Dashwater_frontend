import axios from "axios";
import { API_URL } from "../Environments";


const sessionId = localStorage.getItem('sessionId');
console.log(sessionId);

const saveDeviceSettings = async (newSettings: deviceSettingsType) => {
    try {
        const requestBody = {
            newSettings: newSettings,  // object now includes sensor_ids
            sessionId: sessionId,
        };
        const response = await axios.post(`${API_URL}/device/updateDeviceSettings`, requestBody, { withCredentials: true });
        console.log("Response from saveDeviceSettings:", response);
        if (response.status === 200) {
            return true;
        }
        return false;
    } catch (err) {
        console.error("Error in saveDeviceSettings:", err);
        return false;
    }
};

const getDefaultThresholds = async () => {
    try {
        const response = await axios.get(`${API_URL}/defaultThreshold/getAllDefaultThresholds`, { withCredentials: true });
        if (response.status === 200) {
            return response.data.data;
        }
        return null;
    } catch (_err) {
        return null;
    }
}

const getUserThresholdsByDevice = async (userId: string | undefined, deviceId: number) => {
    try {
        console.log("getUserThresholdsByDevice loaded");
        const response = await axios.get(`${API_URL}/userThreshold/getUserThresholdsByDevice/${userId}/${deviceId}`,
        { withCredentials: true });

        if (response.status === 200) {
            return response.data.data;
        }
        return null;

    } catch (_err) {
        return null;
    }
}

const saveCalibrationPoints = async (calibrationPoints: calibrationPointType[]) => {
    // calibrationPoints.forEach((point: calibrationPointType) => {
    //     // PUT to AWS DB
    // }
    // do DB stuff for the metric type
    return true;
};

// const getDevicesSettings = async () => {
//     try {
//         console.log("getAllDeviceSetting loaded.");
//         const response: any = await axios.get(`${API_URL}/device/getAllDevicesSettings`, { withCredentials: true });
//         if (response.status === 200) {
//             // filter by device 0 and 1 only (the only valid devices at this time)
//             // const validDevices = response.data.data.filter((device: any) => [0, 1].includes(device.id));
//             // return validDevices;
//             return response.data.data;
//         }
//     } catch (_err) {
//         return null;
//     }
// };

const getDevicesSettings = async () => {
    console.log('getDevicesSettings');
    try {
        const sessionId = localStorage.getItem("sessionId");
        const response = await axios.post(
            `${API_URL}/device/getAllDevicesSettings`,
            { token: sessionId },
            { withCredentials: true }
        );

        // const response = await axios.post(`${API_URL}/device/getAllDevicesSettings`, {
        //     headers: {
        //         "Authorization": `Bearer ${sessionId}`
        //     },
        //     sessionToken: sessionId,
        //     withCredentials: true
        // });
        if (response.status === 200) {
            // filter by device 0 and 1 only (the only valid devices at this time)
            // const validDevices = response.data.data.filter((device: any) => [0, 1].includes(device.id));
            // return validDevices;
            return response.data.data;
        }
    } catch (_err) {
        console.log("Error in getDevicesSettings:", _err);
        return null;
    }
};

// Test function to get all buoy ids from TimeStreamController (TS)
// The endpoint is working
const test = async () => {
    console.log('test');
    try {
        const response = await axios.get(`${API_URL}/ts/getAllBuoyIds`, 
        {
            headers: {
                "Authorization": `Bearer ${sessionId}`
            },
            withCredentials: true
        });
        console.log(response.data.data);
     
    } catch (_err) {
        return null;
    }
}

const ManageDevices = {
    getDefaultThresholds,
    getUserThresholdsByDevice,
    saveDeviceSettings,
    // saveThresholdSettings,
    saveCalibrationPoints,
    getDevicesSettings,
    test

};

export default ManageDevices;