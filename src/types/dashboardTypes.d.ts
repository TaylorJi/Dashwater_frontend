type weatherDataType = {
    currWeather: string;
    temp: number;
    iconURL: string;
    windSpeed: number;
    windDir: string;
    windDeg: number;
    windPressure: number;
    forecast: weatherForecastType[];
};

type weatherForecastType = {
    weekday: string;
    iconURL: string;
    high: number;
    low: number;
};

type deviceDataType = {
    [key: string]: measureType[]
}

type measureType = {
    measureName: string;
    xAxisName: string;
    yAxisName: string;
    data: graphDataType[]
}

type rawTideExtremeDataType = {
    height: number;
    time: string;
    type: string;
}

type graphDataType = {
    [key: string]: number | string;
};

type logDataType = {
    id: number;
    time: string;
    dissolvedOxygen: number;
    electricalConductivity: number;
    pH: number;
};