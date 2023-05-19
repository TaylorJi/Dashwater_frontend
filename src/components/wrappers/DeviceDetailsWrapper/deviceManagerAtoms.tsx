import { atom } from 'recoil';

export const allDevicesDetails = atom<deviceSettingsType[]>({
    key: 'allDevicesDetailsAtom',
    default: []
});

export const calibrationPoints = atom<{[key: string]: calibrationPointType[]}>({
    key: 'calibrationPointsAtom',
    default: {}
});

export const defaultThresholds = atom<defaultThresholdType[]>({
    key: 'defaultThresholdsAtom',
    default: []
});

export const userDeviceThresholds = atom<userThresholdType[]>({
    key: 'userDeviceThresholdsAtom',
    default: []
});