import {atom, selectorFamily} from 'recoil';
import {IEmoticonData, IEmoticonSelector} from '../app.constant';

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

export const emoticonsSelector = selectorFamily({
    key: 'emoticonsSelector',
    get: (params) => ({get}) => {
        const emoticons = get(emoticonsAtom);
        const test = emoticons.emoticonList.map(d => {return {name: d.emoticonName, data: d.images}});
        console.log(test);
        return test;
    }
})

/** 슬라이드 드래그 여부 */
export const isDraggableAtom = atom<boolean>({
    key: 'isDraggable',
    default: true,
})
