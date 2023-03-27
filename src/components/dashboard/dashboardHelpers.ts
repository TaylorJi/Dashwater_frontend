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

        const reformattedSheets: Record<string, FormattedExportType[]> = {};

        const sheetName = 'Device Data';

        reformattedSheets[`${sheetName} (${logData.length})`] = logData.map((data) => {
            return {
                Device_ID: data.id,
                Date_Time: data.time,
                Dissolved_Oxygen: data.dissolvedOxygen,
                Electrical_Conductivity: data.electricalConductivity,
                pH: data.pH,
                Turbidity: data.turbidity,
                Total_Dissolved_Solids: data.totalDissolvedSolids,
                Temperature: data.temperature
            };
        });

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