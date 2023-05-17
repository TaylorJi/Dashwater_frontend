import { atom, selector } from "recoil";

export const userDataAtom = atom<userDataType | null>({
    key: 'userDataAtom',
    default: null
});

export const userDataSelector = selector({
    key: 'userDataSelector',
    get: ({ get }) => {
        const userData = get(userDataAtom);
        if (userData) {
            return userData;
        }
        return null;

    }
});
