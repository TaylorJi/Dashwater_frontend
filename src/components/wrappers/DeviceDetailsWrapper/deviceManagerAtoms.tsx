import { atom } from 'recoil';

export const allDevicesDetails = atom<deviceSettingsType[]>({
    key: 'allDevicesDetailsAtom',
    default: []
});

export const calibrationPoints = atom<{[key: string]: calibrationPointType[]}>({
    key: 'calibrationPointsAtom',
    default: {}
});
