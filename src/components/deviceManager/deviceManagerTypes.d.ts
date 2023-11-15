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
    id: number,
    deviceId: number,
    // lastCalibrationDate: string,
    metric: string,
    defaultUnit: string,
    alerts: boolean,
    power: boolean,
    minVal: number,
    maxVal: number,
    physicalValues: number[],
    calibratedValues: calibrationPointType[]
}

type calibrationPointType = {
    id: number,
    dateLastCalibrated: string;
    physicalValue: number[];
    digitalValue: number[];
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
    alerts: boolean;
    power: boolean;
}

type updatedThresholdType = {
    userId: string | undefined;
    sensorId: number;
    deviceId: number;
    minVal:  number;
    maxVal: number;
    alerts: boolean;
    power: boolean;
}