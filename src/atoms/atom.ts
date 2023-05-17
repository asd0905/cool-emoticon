import {atom} from 'recoil';
import {IEmoticonData} from '../app.constant';

export const isBodyFixedAtom = atom<boolean>({
    key: 'isBodyFixed',
    default: false,
})


export const emoticonsAtom = atom<IEmoticonData>({
    key: 'emoticons',
    default: {
        baseUrl: '',
        emoticonList: [],
        filePath: ''
    }
})
