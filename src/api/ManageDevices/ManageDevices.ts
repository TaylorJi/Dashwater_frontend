import axios from "axios";
import { API_URL } from "../Environments";

const saveDeviceSettings = async (newSettings: generalSettingsType) => {
    try {
        const response = await axios.put(`${API_URL}/device/updateDeviceSettings`, newSettings, { withCredentials: true });
        if (response.status === 200) {
            return true;
        }
        return false;
    } catch (_err) {
        return null;
    }
};

const saveThresholdSettings = async () => {
    // do DB stuff in try-catch block
    return true;
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

const getDevicesSettings = async () => {
    try {
        const response: any = await axios.get(`${API_URL}/device/getAllDevicesSettings`, { withCredentials: true });
        if (response.status === 200) {
            // filter by device 0 and 1 only (the only valid devices at this time)
            const validDevices = response.data.data.filter((device: any) => [0, 1].includes(device.id));
            return validDevices;
        }
    } catch (_err) {
        return null;
    }
};

const ManageDevices = {
    getDefaultThresholds,
    getUserThresholdsByDevice,
    saveDeviceSettings,
    saveThresholdSettings,
    saveCalibrationPoints,
    getDevicesSettings
};

export default ManageDevices;