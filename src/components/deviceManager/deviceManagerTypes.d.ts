type deviceManagerDataType = {
    units: buoySettingsUnitsType;
    buoys: buoySettingsType[];
};

type buoySettingsUnitsType = {
    dissolved_o2: String;
    electrical_conductivity: String;
    pH: String;
    turbidity: String;
    dissolved_solids: String;
    temperature: String;
    water_lvl: String;
    water_flow: String;
    water_pressure: String;
};

type buoySettingsType = {
    name: String;
    id: String;
    location: buoyLocationType;
    sensors: {
        dissolved_solids: metricSettingsType;
        pH: metricSettingsType;
        turbidity: metricSettingsType;
        dissolved_o2: metricSettingsType;
        temp: metricSettingsType;
        electrical_conductivity: metricSettingsType;
        water_flow: metricSettingsType;
        water_lvl: metricSettingsType;
        water_pressure: metricSettingsType;
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
