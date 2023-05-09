import { atom } from 'recoil';

export const selectedIdsAtom = atom<number[]>({
    key: 'selectedIdsAtom',
    default: []
});
