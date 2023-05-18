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
    long: number;
    lat: number;
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
    digital_value: number;
    physical_value: number;
}
