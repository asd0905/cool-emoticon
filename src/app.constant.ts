export const COOL_EMOTICON_BASE_PATH = `cool-emoticon`;
export const STICKER_BASE_URL = `https://sticker.coolmessenger.com`;

export interface IEmoticon {
    emoticonName: string;
    fileName: string;
    imageTabOff: string;
    imageTabOn: string;
    images: IEmoticonImage[];
}

export interface IEmoticonImage {
    id: number;
    image: string;
}

export interface IEmoticonData {
    baseUrl: string;
    emoticonList: IEmoticon[]
    filePath: string;
}

export enum EEmoticon {
    NEW = 'new', STYLE = 'style',
}

export enum EQueryKey {
    EMOTICONS='emoticons',
}

export interface IEmoticonSelector {
    name: string;
    data: IEmoticonSelectorData[];
}

export interface IEmoticonSelectorData {
    id: number;
    image: string;
}
