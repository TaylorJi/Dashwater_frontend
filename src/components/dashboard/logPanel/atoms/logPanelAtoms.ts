import { atom, selector } from 'recoil';

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

        // sorting functionality here

        if (logData) {
            const pagination = get(paginationMultipleAtom);
            const rangeStart = pagination * itemsPerPage;
            const rangeEnd = (pagination + 1) * itemsPerPage;
            return logData.slice(rangeStart, rangeEnd);
        }

        return [];

    }
});
