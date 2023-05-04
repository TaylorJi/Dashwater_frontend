type deviceManagerDataType = {
    units: buoySettingsUnitsType;
    buoys: buoySettingsType[];
};

type buoySettingsUnitsType = {
    [key: string]: string;
};

type buoySettingsType = {
    name: string;
    id: string;
    location: buoyLocationType;
    sensors: sensorType[];
};

type buoyLocationType = {
    x: number;
    y: number
};

type buoySensorTagsType = {
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
