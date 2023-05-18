import React from "react";
import { useParams } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
	emoticonDetailSelector,
	emoticonsAtom,
	isDraggableAtom,
} from "../../atoms/atom";
import { EQueryKey, IEmoticonData, STICKER_BASE_URL } from "../../app.constant";
import { getEmoticon } from "../../api";
import { useQuery } from "react-query";

export default function Detail() {
	const { emoticonName } = useParams();
	const emoticon = useRecoilValue(emoticonDetailSelector(emoticonName));
	const setEmoticons = useSetRecoilState<IEmoticonData>(emoticonsAtom);
	const { isLoading } = useQuery([EQueryKey.EMOTICONS], getEmoticon, {
		// refetchOnWindowFocus: false,
		onSuccess: (response) => {
			setEmoticons(response.data);
		},
	});
	return (
		<>
			<div>{emoticon?.emoticonName}</div>

			{emoticon?.images.map((d) => (
				<img
					key={`${d.image}/${d.id}`}
					src={`${STICKER_BASE_URL}/${emoticonName}/image_pack/${d.image}`}
					alt='img'
				/>
			))}
		</>
	);
}
