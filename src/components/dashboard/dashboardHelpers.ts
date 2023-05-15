import colors from "../../theme/foundations/colours";

export const timeHelper = (timeString: string) => {
    let splitTimeDay = timeString.split('T')[1];
    return splitTimeDay.split('+')[0].substring(0, 5);
};

export const roundTo2Dec = (num: number) => {
    return Math.round(num * 100) / 100;
}

export const remapDataForExport = (logData: logDataType[]) => {

    try {

        const reformattedSheets = logData.reduce((allData: Record<string, FormattedExportType[]>, currentData) => {
            if (!allData[`Device ${currentData.id}`]) {
                allData[`Device ${currentData.id}`] = [];
            };
            allData[`Device ${currentData.id}`].push({
                Device_ID: currentData.id,
                Date_Time: currentData.time,
                Dissolved_Oxygen: currentData.dissolvedOxygen === MISSING_VALUE ? '' : currentData.dissolvedOxygen,
                Electrical_Conductivity: currentData.electricalConductivity === MISSING_VALUE ? '' : currentData.electricalConductivity,
                pH: currentData.pH === MISSING_VALUE ? '' : currentData.pH,
                Turbidity: currentData.turbidity === MISSING_VALUE ? '' : currentData.turbidity,
                Total_Dissolved_Solids: currentData.totalDissolvedSolids === MISSING_VALUE ? '' : currentData.totalDissolvedSolids,
                Temperature: currentData.temperature === MISSING_VALUE ? '' : currentData.temperature,
                Water_Flow: currentData.waterFlow === MISSING_VALUE ? '' : currentData.waterFlow,
                Water_Pressure: currentData.waterPressure === MISSING_VALUE ? '' : currentData.waterPressure
            });
            return allData;
        }, {})

        return reformattedSheets;

    } catch (_err) {
        return false;
    }

};

export const circleGraphColors = (percent: number) => {

    if (percent < 10 || percent > 90) {
        return colors.main.warning;
    } else if (percent < 30 || percent > 70) {
        return colors.main.mediumWarning;
    } else {
        return colors.main.acidGreen
    }
};

export const MISSING_VALUE = -9999;