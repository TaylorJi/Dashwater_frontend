export const timeHelper = (timeString: string) => {
    let splitTimeDay = timeString.split('T')[1];
    return splitTimeDay.split('+')[0].substring(0, 5);
};

export const roundTo2Dec = (num: number) => {
    return Math.round(num * 100) / 100;
}