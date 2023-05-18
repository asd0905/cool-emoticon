import { useRecoilValue, useSetRecoilState } from "recoil";
import { emoticonsAtom, emoticonsSelector } from "../../atoms/atom";
import {
	EQueryKey,
	IEmoticonSelector,
	IEmoticonSelectorData,
	STICKER_BASE_URL,
} from "../../app.constant";
import MainBanner from "../../components/MainBanner/MainBanner";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getEmoticon } from "../../api";
import React from "react";

const SLayout = styled.div`
	.emoticonListSect {
		padding: 0 20px;
		max-width: 1024px;
		margin: 0 auto;
		.emoticonList {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			border-bottom: 1px solid rgba(0, 0, 0, 0.04);
			h3 {
				font-size: 20px;
			}
			.emoticonUl {
				.emoticon {
					padding: 20px;
					max-width: 120px;
					img {
						max-width: 100%;
					}
					&:not(:nth-child(2)) {
						display: none;
					}
				}
			}
		}
		@media screen and (min-width: 750px) {
			.emoticonList {
				display: grid;
				grid-template-columns: 200px 1fr;
				justify-content: space-between;
				h3 {
					margin-right: auto;
				}
				.emoticonUl {
					display: flex;
					justify-content: flex-end;
					.emoticon {
						padding: 40px 30px;
						max-width: 160px;
						max-width: 160px;
						display: flex;
						justify-content: center;
						align-items: center;
						&:not(:nth-child(2)) {
							display: flex;
						}
					}
				}
			}
		}
	}
`;

export default function New() {
	const emoticons = useRecoilValue<IEmoticonSelector[]>(emoticonsSelector(1));
	const setEmoticons = useSetRecoilState(emoticonsAtom);
	const { isLoading } = useQuery([EQueryKey.EMOTICONS], getEmoticon, {
		// refetchOnWindowFocus: false,
		onSuccess: (response) => {
			setEmoticons(response.data);
		},
	});
	return (
		<>
			<SLayout>
				<MainBanner type={"newMainBanner"}>
					<video autoPlay={true} muted={true} loop={true} playsInline={true}>
						<source
							src='//update.coolmessenger.com/_ImageServer/jirancomms/img/서비스흐름.mp4'
							type='video/mp4'
						/>
					</video>
				</MainBanner>
				{isLoading ? (
					<div>Loading...</div>
				) : (
					<>
						<section className={"emoticonListSect"}>
							{emoticons.map((emoticon: any) => (
								<article key={emoticon.name} className={"emoticonList"}>
									<h3>이모티콘 : {emoticon.name}</h3>
									<ul className={"emoticonUl"}>
										{emoticon.data
											.slice(0, 4)
											.map((d: IEmoticonSelectorData) => (
												<li key={d.image} className={"emoticon"}>
													<img
														src={`${STICKER_BASE_URL}/${emoticon.name}/image_pack/${d.image}`}
														alt='img'
													/>
												</li>
											))}
									</ul>
								</article>
							))}
						</section>
					</>
				)}
			</SLayout>
		</>
	);
}
