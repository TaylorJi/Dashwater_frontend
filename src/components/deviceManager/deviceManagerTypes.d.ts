type deviceManagerDataType = {
    units: deviceSettingsUnitsType;
    buoys: deviceSettingsType[];
};

type deviceSettingsUnitsType = {
    [key: string]: string;
};

type deviceSettingsType = {
    // id: number;
    // name: string;
    // description: string;
    // locationX: number;
    // locationY: number;
    // active: boolean;
    // sensors: sensorType[];
    id: number,
    name: string,
    description: string,
    locationX: number,
    locationY: number,
    active: boolean,
    // timeInterval: int,
    sensors: sensorType[],
    sensor_ids: number[]
};

type generalSettingsType = {
    name: string;
    description: string;
    locationX: number;
    locationY: number;
  };

type deviceSensorTagsType = {
    [key: string]: {
        color: string;
        label: string;
    }
}

type sensorType = {
    // id: number;
    // deviceId: number;
    // metric: string;
    // defaultUnit: string;
    // calibrated: boolean;
    // enabled: boolean;
    // maxVal: number;
    // minVal: number;
    // lastCalibrationDate: string;
    // minCalibrationPts: number;
    id: number,
    deviceId: number,
    lastCalibrationDate: string,
    // minCalibrationPts: number,
    metric: string,
    defaultUnit: string,
    alerts: boolean,
    threshold: number,
    // calibrated: boolean,
    // enabled: boolean,
    minVal: number,
    maxVal: number,
    physicalValues: number[],
    calibratedValues: number[]
}

type calibrationPointType = {
    id: number;
    digitalValue: number;
    physicalValue: number;
    sensorId: number;
}

type defaultThresholdType = {
    metric: string;
    defaultMin: number;
    defaultMax: number;
}

type userThresholdType = {
    sensorId: number;
    deviceId: number;
    minVal: number;
    maxVal: number;
    alert: boolean;
    power: boolean;
}

type updatedThresholdType = {
    userId: string | undefined;
    sensorId: number;
    deviceId: number;
    minVal: string | number;
    maxVal: string | number;
    alert: boolean;
    power: boolean;
}