type deviceManagerDataType = {
    units: deviceSettingsUnitsType;
    buoys: deviceSettingsType[];
};

type deviceSettingsUnitsType = {
    [key: string]: string;
};

type deviceSettingsType = {
    name: string;
    id: string;
    location: deviceLocationType;
    sensors: sensorType[];
};

type deviceLocationType = {
    x: number;
    y: number
};

type deviceSensorTagsType = {
    [key: string]: {
        color: string;
        label: string;
    }
}

type sensorType = {
    metric_type: string;
    default_metric_unit: string;
    min: number;
    max: number;
    alert: boolean;
    min_calibration_points: number;
    calibration_points: calibrationPointType[];
}

type calibrationPointType = {
    id: number;
    digital_value: number;
    physical_value: number;
}
