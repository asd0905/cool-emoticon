import {atom} from 'recoil';
import {IEmoticonData} from '../app.constant';

/** 모달 유무에 따라 body fixed */
export const isBodyFixedAtom = atom<boolean>({
    key: 'isBodyFixed',
    default: false,
})

/** 이모티콘 데이터 */
export const emoticonsAtom = atom<IEmoticonData>({
    key: 'emoticons',
    default: {
        baseUrl: '',
        emoticonList: [],
        filePath: ''
    }
})

/** 슬라이드 드래그 여부 */
export const isDraggableAtom = atom<boolean>({
    key: 'isDraggable',
    default: true,
})
