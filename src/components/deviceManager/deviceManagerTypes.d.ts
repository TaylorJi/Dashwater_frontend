type deviceManagerDataType = {
    units: buoySettingsUnitsType;
    buoys: buoySettingsType[];
};

type buoySettingsUnitsType = {
    [key: string]: string
};

type buoySettingsType = {
    name: string;
    id: string;
    location: buoyLocationType;
    sensors: {
        [key: string]: metricSettingsType;
    }
};

type buoyLocationType = {
    x: number;
    y: number
};

type metricSettingsType = {
    available: boolean;
    min: number;
    max: number;
    alert: boolean,
    low: {
        sensor: number,
        physical: number
    },
    high: {
        sensor: number,
        physical: number
    }
};

type buoySensorTagsType = {
    [key: string]: {
        color: string,
        label: string
    }
}
