import { atom } from 'recoil';

export const allUsersDetails = atom<userDataType[]>({
    key: 'allUsersDetailsAtom',
    default: []
});