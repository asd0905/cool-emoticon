import {atom} from 'recoil';

export const isBodyFixedAtom = atom<boolean>({
    key: 'isBodyFixed',
    default: false,
})
