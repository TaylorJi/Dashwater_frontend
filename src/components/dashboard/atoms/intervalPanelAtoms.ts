import { atom, selector } from "recoil";
import { remapData } from "../../../api/Dashboard/dashboardHelpers";

export const deviceDataAtom = atom<deviceDataType | null>({
    key: 'deviceDataAtom',
    default: null
});

export const displayedDashboardDataSelector = selector({
    key: 'displayedDashboardDataSelector',
    get: ({ get }) => {
        const deviceData = get(deviceDataAtom);
        if (deviceData) {
            return remapData(deviceData);
        }
        return null;

    }
});
