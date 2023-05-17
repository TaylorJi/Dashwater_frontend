import { atom } from 'recoil';

export const numOfFailedLoginAttempts = atom<number>({
    key: 'numOfFailedLoginAttempts',
    default: 0
})