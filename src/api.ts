export const BASE_API = `https://emoticon.coolmessenger.com/api`;
export const EMOTICON_LIST_API = `${BASE_API}/emoticon`


export const getEmoticon = async () => {
    return await (await fetch(EMOTICON_LIST_API)).json();
}
