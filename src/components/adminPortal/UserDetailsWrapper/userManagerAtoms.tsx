import { atom } from 'recoil';

export const allUsersDetails = atom<usersDataType[]>({
    key: 'allUsersDetailsAtom',
    default: []
});