type deviceManagerDataType = {
    units: buoySettingsUnitsType;
    buoys: buoySettingsType[];
};

type buoySettingsUnitsType = {
    dissolved_o2: string;
    electrical_conductivity: string;
    pH: string;
    turbidity: string;
    dissolved_solids: string;
    temperature: string;
    water_lvl: string;
    water_flow: string;
    water_pressure: string;
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
    alert: boolean
};

type buoySensorTagsType = {
    [key: string]: {
        color: string,
        label: string
    }
}
