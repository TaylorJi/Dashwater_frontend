type deviceManagerDataType = {
    units: deviceSettingsUnitsType;
    buoys: deviceSettingsType[];
};

type deviceSettingsUnitsType = {
    [key: string]: string;
};

type deviceSettingsType = {
    id: number;
    name: string;
    description: string;
    locationX: number;
    locationY: number;
    active: boolean;
    sensors: sensorType[];
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
    id: number;
    deviceId: number;
    metric: string;
    defaultUnit: string;
    calibrated: boolean;
    enabled: boolean;
    maxVal: number;
    minVal: number;
    lastCalibrationDate: string;
    minCalibrationPts: number;
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
}