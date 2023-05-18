import axios from "axios";
import { API_URL } from "../Environments";

const saveDeviceSettings = async (settings: generalSettingsType) => {
    // do DB stuff in try-catch block
    return true;

};

const saveThresholdSettings = async () => {
    // do DB stuff in try-catch block
    return true;
};

const saveCalibrationPoint = async (calibrationInfo: sensorType) => {
    // do DB stuff for the metric type
    return true;
};

const removePreviousCalibration = async () => {
    // do DB stuff. should likely return the previous previous calibration points.
    return true;
};

const getDevicesSettings = async () => {
    try {
        const response: any = await axios.get(`${API_URL}/device/getAllDevicesSettings`, { withCredentials: true });
        if (response.status === 200) {

            // filter by device 0 and 1 only (the only valid devices at this time)
            const validDevices = response.data.data.filter((device: any) => [0, 1].includes(device.id));
            console.log(validDevices)
            return validDevices;
        }
    } catch (_err) {
        return null;
    }
};

const ManageDevices = {
    saveDeviceSettings,
    saveThresholdSettings,
    saveCalibrationPoint,
    removePreviousCalibration,
    getDevicesSettings
};

export default ManageDevices;