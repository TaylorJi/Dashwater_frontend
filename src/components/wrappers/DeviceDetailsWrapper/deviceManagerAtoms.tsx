import { atom, selector } from 'recoil';

export const allDevicesDetails = atom<deviceSettingsType[]>({
    key: 'allDevicesDetailsAtom',
    default: []
});



export const devicesPerPageAtom = atom<number>({
    key: 'devicesPerPageAtom',
    default: 2
});


export const devicesPaginationMultipleAtom = atom<number>({
    key: 'devicesPaginationMultiple',
    default: 0
});


export const displayedDevicesDataSelector = selector({
    key: 'displayedDevicesDataSelector',
    get: ({ get }) => {
        let allDevicesData = get(allDevicesDetails);
        const devicesPerPage = get(devicesPerPageAtom);

        if (allDevicesData) {
            allDevicesData = [...allDevicesData];

            const pagination = get(devicesPaginationMultipleAtom);
            const rangeStart = pagination * devicesPerPage;
            const rangeEnd = (pagination + 1) * devicesPerPage;
            return allDevicesData.slice(rangeStart, rangeEnd);
        }
    }
});