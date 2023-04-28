import { atom, selector } from 'recoil';

export const ITEMS_PER_PAGE = 15;

export const logDataAtom = atom<logDataType[] | null>({
    key: 'logDataAtom',
    default: null
});

export const paginationMultipleAtom = atom<number>({
    key: 'paginationMultiple',
    default: 0
});

export const displayedLogDataSelector = selector({
    key: 'displayedLogDataSelector',
    get: ({ get }) => {

        let logData = get(logDataAtom);

        if (logData) {
            logData = [...logData];
            const pagination = get(paginationMultipleAtom);
            const rangeStart = pagination * ITEMS_PER_PAGE;
            const rangeEnd = (pagination + 1) * ITEMS_PER_PAGE;
            return logData.slice(rangeStart, rangeEnd);
        }

        return [];

    }
});
