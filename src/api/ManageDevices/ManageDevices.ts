const saveDeviceSettings = async (name: string, lat: number, long: number) => {
    // do DB stuff in try-catch block
    return true;

};

const saveThresholdSettings = async () => {
    // do DB stuff in try-catch block
    return true;
}

const ManageDevices = {
    saveDeviceSettings,
    saveThresholdSettings
};

export default ManageDevices;