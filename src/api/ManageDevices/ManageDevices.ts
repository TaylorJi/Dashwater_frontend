const saveDeviceSettings = async (settings: generalSettingsType) => {
    // do DB stuff in try-catch block
    return true;

};

const saveThresholdSettings = async () => {
    // do DB stuff in try-catch block
    return true;
}

const saveCalibrationPoint = async (calibrationInfo: sensorType) => {
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