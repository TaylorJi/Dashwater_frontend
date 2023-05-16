
const saveDeviceSettings = async (name: string, lat: number, long: number) => {
    // do DB stuff in try-catch block
    return true;

};
//takes in array
const saveThresholdSettings = async (myArray: any[]) => {
    // do DB stuff in try-catch block
    try {
        console.log(myArray)
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
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