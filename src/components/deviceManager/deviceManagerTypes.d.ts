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
    min: number;
    max: number;
    alert: boolean;
    min_calibration_points: number;
    calibration_points: calibrationType[];
}

type calibrationType = {
    digital: number;
    physical: number;
}
