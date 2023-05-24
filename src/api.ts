export const BASE_API = `https://emoticon.coolmessenger.com/api`;
export const EMOTICON_LIST_API = `${BASE_API}/emoticon`;
export const EMOTICON_DETAIL_API = `${BASE_API}/emoticon/:emoticonName`;

/** 이모티콘 리스트 가져오기 */
export const getEmoticon = async () => await (await fetch(EMOTICON_LIST_API)).json();

/** 이모티콘 상세 정보 가져오기 */
export const getEmoticonDetail = async (emoticonName: string) =>
    await (await fetch(EMOTICON_DETAIL_API.replace(':emoticonName', emoticonName))).json();
