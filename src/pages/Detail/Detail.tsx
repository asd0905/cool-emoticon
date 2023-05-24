import React from 'react';
import { useParams } from "react-router";
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {
	emoticonDetailAtom,
	emoticonDetailSelector,
	emoticonsAtom,
} from '../../atoms/atom';
import {EQueryKey, IEmoticonData, IEmoticonDetail, STICKER_BASE_URL} from '../../app.constant';
import {getEmoticon, getEmoticonDetail} from '../../api';
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
	const [emoticon, setEmotion] = useRecoilState<IEmoticonDetail>(emoticonDetailAtom);
	const { isLoading, data } = useQuery([EQueryKey.EMOTICONS, emoticonName],
		() => getEmoticonDetail(emoticonName || ''),
		{
		// refetchOnWindowFocus: false,
		onSuccess: (response) => {
			// console.log(response);
			console.log(response.data);
			setEmotion(response.data);
		},
	});
	return (
		<>
			{isLoading ? <div>Loading...</div> : (
				<SLayout>
					<section className={'emoticonInfo'}>
						<div className={'emoticonImg'}>
							<img
								src={`${STICKER_BASE_URL}/${emoticonName}/image_pack/${emoticon?.emoticon?.images[0].image}`}
								alt='img'
							/>
						</div>
						<div className={'emoticonTxt'}>
							<p>{data?.emoticon?.emoticonName}</p>
						</div>
					</section>
					<ul className={'emoticonList'}>
						{emoticon?.emoticon?.images.map((d) => (
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
