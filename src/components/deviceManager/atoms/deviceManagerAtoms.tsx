import { atom, selector } from 'recoil';

export const allDevicesDetails = atom<deviceSettingsType[]>({
    key: 'allDevicesDetailsAtom',
    default: selector({
        key: 'allDevicesDetailsSelector',
        get: async () => {
            const res = await fetch('./mockData/mockBuoyData.json');
            let data = await res.json();
            return data;
        }
    })
});
