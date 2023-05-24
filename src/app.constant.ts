export const COOL_EMOTICON_BASE_PATH = `cool-emoticon`;
export const STICKER_BASE_URL = `https://sticker.coolmessenger.com`;
export const SEARCH_BASE_URL = `https://dev-search.coolmessenger.com/`;
export const SEARCH_API_URL = `${SEARCH_BASE_URL}api`;
export const SEARCH_GET_TOKEN_URL = `${SEARCH_API_URL}/auth/loginBySortForApp`;
export const SEARCH_GET_REFRESH_TOKEN_URL = `${SEARCH_API_URL}/auth/loginByRefreshForApp`;
export const SEARCH_AUTH_USER_URL = `${SEARCH_API_URL}/cool/_searchAuthMember`;
export const CLIENT_ID = 'NjM2YzY5NjU2ZTc0NWY2OTY0M2E0MzZmNmY2YzQxNmM2MTcyNmQ=';
export const MEMBER_URL = `https://dev-member.coolmessenger.com`;

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

export interface IEmoticonDetail {
    baseUrl: string;
    emoticon: IEmoticon
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

export enum EToken {
    ACCESS_TOKEN = 'accessToken', REFRESH_ACCESS_TOKEN = 'refreshAccessToken'
}
