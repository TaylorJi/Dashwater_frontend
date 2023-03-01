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

type graphDataType = {
    [key: string]: number | string;
};

type tideDataResType = {
    high: graphDataType;
    low: graphDataType;
    allData: graphDataType[];
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