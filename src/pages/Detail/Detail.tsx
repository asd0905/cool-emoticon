import React from 'react';
import { useParams } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
	emoticonDetailSelector,
	emoticonsAtom,
} from '../../atoms/atom';
import { EQueryKey, IEmoticonData, STICKER_BASE_URL } from "../../app.constant";
import { getEmoticon } from "../../api";
import { useQuery } from "react-query";
import styled from 'styled-components';

const SLayout = styled.div`
	.emoticonInfo {
		margin-bottom: 50px;
		padding-top: 30px;
		.emoticonImg {
			img {
				display: block;
				margin: 0 auto;
			}
		}
		.emoticonTxt {
			margin-top: 10px;
			text-align: center;
		}
	}
	.emoticonList {
		padding: 0 20px;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(85px, 1fr));
		grid-gap: 20px;
		max-width: 1204px;
		margin: 0 auto;
		.emoticon {
			//padding: 15px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		img {
			max-width: 100%;
			display: block;
		}
	}
`

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
	window.scrollTo(0, 0);
	return (
		<>
			{isLoading ? <div>Loading...</div> : (
				<SLayout>
					<section className={'emoticonInfo'}>
						<div className={'emoticonImg'}>
							<img
								src={`${STICKER_BASE_URL}/${emoticonName}/image_pack/${emoticon?.images[0].image}`}
								alt='img'
							/>
						</div>
						<div className={'emoticonTxt'}>
							<p>{emoticon?.emoticonName}</p>
						</div>
					</section>
					<ul className={'emoticonList'}>
						{emoticon?.images.map((d) => (
							<li className={'emoticon'} key={`${d.image}/${d.id}`}>
								<img
									src={`${STICKER_BASE_URL}/${emoticonName}/image_pack/${d.image}`}
									alt='img'
								/>
							</li>
						))}
					</ul>
				</SLayout>
			)}
		</>
	);
}
