type alertsDataType = {
    "units": {
        [key: string]: string
    },
    "alerts": buoyAlertType[]
}

type buoyAlertType = {
    "buoy": {
        "name": string,
        "id": string
    },
    "time": string,
    "metric": string,
    "metric_name": string
    "data": boolean,
    "above_max": boolean,
    "difference": number
}