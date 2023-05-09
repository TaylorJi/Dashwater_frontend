import { atom } from 'recoil';

export const deviceDetailsAtom = atom<Array<deviceSettingsType>>({
    key: 'deviceDetailsAtom',
    default: []
})