const saveDeviceSettings = async (name: string, lat: number, long: number) => {
    // do DB stuff in try-catch block
    return true;

};

const saveThresholdSettings = async () => {
    // do DB stuff in try-catch block
    return true;
}

const saveCalibrationPoint = async (metric: string, lowSensor: number, lowPhys: number, highSensor: number, highPhys: number) => {
    // do DB stuff for the metric type
    return true;
}

const removePreviousCalibration = async () => {
    // do DB stuff. should likely return the previous previous calibration points.
    return true;
}

const ManageDevices = {
    saveDeviceSettings,
    saveThresholdSettings,
    saveCalibrationPoint,
    removePreviousCalibration
};

export default ManageDevices;