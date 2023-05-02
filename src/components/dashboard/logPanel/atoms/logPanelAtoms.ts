import { atom, selector } from 'recoil';

export const metricSelectedAtom = atom<string>({
    key: 'metricSelectedAtom',
    default: ''
});

export const logSortOrderAtom = atom<string>({
    key: 'logSortOrderAtom',
    default: 'asc'
});

export const itemsPerPageAtom = atom<number>({
    key: 'itemsPerPageAtom',
    default: 15
});


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
        const itemsPerPage = get(itemsPerPageAtom);
        const sortOrder = get(logSortOrderAtom);
        const sortMetric = get(metricSelectedAtom);

        if (logData) {
            const pagination = get(paginationMultipleAtom);
            const rangeStart = pagination * itemsPerPage;
            const rangeEnd = (pagination + 1) * itemsPerPage;
            return logData.slice(rangeStart, rangeEnd);
        }

        return [];

    }
});
