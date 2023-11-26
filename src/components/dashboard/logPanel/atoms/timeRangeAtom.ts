import { atom } from 'recoil';

export const timeRangeAtom = atom({
  key: 'timeRangeState',
  default: '12h', // default value
});
