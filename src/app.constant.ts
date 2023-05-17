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

