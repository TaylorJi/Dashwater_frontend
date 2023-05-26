const saveDeviceSettings = async (name: string, lat: number, long: number) => {
  // do DB stuff in try-catch block
  return true;
};
//takes in array
const saveThresholdSettings = async (myArray: any[]) => {
  try {
    console.log(myArray);
    for (let i = 0; i < myArray.length; i++) {
      const item = myArray[i];
      const { label, id, bouy, min, max } = item;
      console.log(id);
      const response = await fetch(
        "http://localhost:8085/api/userThreshold/createUserThreshold",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: "jack",
            deviceId: id,
            metricId: label,
            min: min,
            max: max,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
    }

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const saveCalibrationPoint = async (calibrationInfo: sensorType) => {
  // do DB stuff for the metric type
  return true;
};

const removePreviousCalibration = async () => {
  // do DB stuff. should likely return the previous previous calibration points.
  return true;
};

const ManageDevices = {
  saveDeviceSettings,
  saveThresholdSettings,
  saveCalibrationPoint,
  removePreviousCalibration,
};

export default ManageDevices;
