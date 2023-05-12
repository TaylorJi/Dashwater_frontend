import { atom } from "recoil";

export const userDataAtom = atom<userDataType | null>({
    key: 'userDataAtom',
    default: null
});
