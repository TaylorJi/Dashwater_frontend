import { atom } from 'recoil';

export const selectedIdsAtom = atom<string[]>({
    key: 'selectedIdsAtom',
    default: []
});
