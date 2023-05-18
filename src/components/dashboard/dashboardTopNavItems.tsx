type topNavMenuType = {
    [key: string]: string;
};

export const topNavItems: topNavMenuType = {
    '12h': new Date(new Date().setHours(new Date().getHours() - 12)).toISOString(),
    '1d': new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    '3d': new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    '1w': new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(),
    '3w': new Date(new Date().setDate(new Date().getDate() - 21)).toISOString(),
    '1m': new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(),
    '3m': new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString(),
    'Custom': ''
};