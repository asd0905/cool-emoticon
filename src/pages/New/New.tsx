import { useRecoilValue, useSetRecoilState } from "recoil";
import { emoticonsAtom, emoticonsSelector } from "../../atoms/atom";
import {
	COOL_EMOTICON_BASE_PATH,
	EQueryKey,
	IEmoticonSelector,
	IEmoticonSelectorData,
	STICKER_BASE_URL,
} from '../../app.constant';
import MainBanner from "../../components/MainBanner/MainBanner";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getEmoticon } from "../../api";
import React from "react";
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router';

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
						display: flex;
						justify-content: center;
						align-items: center;
						&:not(:nth-child(2)) {
							display: flex;
						}
						&.hide {
							display: none;
						}
					}
				}
				&:hover {
					.emoticonUl {
						.emoticon {
							display: none;
							&.hide {
								display: flex;
							}
						}
					}
				}
			}
		}
	}
`;

export const SBanner = styled.div`
	background-color: #ffe56a;
	height: 210px;
	.bnr_inner {
		position: relative;
		max-width: 1024px;
		min-width: 320px;
		box-sizing: border-box;
		margin: 0 auto;
		.bnr_tit_new {
			position: absolute;
			left: 40px;
			top: 58px;
			vertical-align: middle;
			height: 94px;
		}
		.bnr_bg_new {
			position: absolute;
			right: 40px;
			top: 0;
			z-index: 0;
			vertical-align: middle;
			height: 210px;
		}
	}
	@media screen and (max-width: 767px) {
		height: 110px;
		.bnr_inner {
			.bnr_tit_new {
				height: 60px;
				top: 25px;
				left: 24px;
			}
			.bnr_bg_new {
				display: none;
			}
		}
	}
`

export default function New() {
	const emoticons = useRecoilValue<IEmoticonSelector[]>(emoticonsSelector(1));
	const setEmoticons = useSetRecoilState(emoticonsAtom);
	const navigation = useNavigate();
	const { isLoading } = useQuery([EQueryKey.EMOTICONS], getEmoticon, {
		// refetchOnWindowFocus: false,
		onSuccess: (response) => {
			setEmoticons(response.data);
		},
	});
	const handleClickEmoticon = (emoticonName: string) => {
		navigation(`/${COOL_EMOTICON_BASE_PATH}/detail/${emoticonName}`)
	}
	return (
		<>
			<SLayout>
				{/*<MainBanner type={"newMainBanner"}>
					<video autoPlay={true} muted={true} loop={true} playsInline={true}>
						<source
							src='//update.coolmessenger.com/_ImageServer/jirancomms/img/서비스흐름.mp4'
							type='video/mp4'
						/>
					</video>
				</MainBanner>*/}
				<SBanner>
					<h3 className={'bnr_inner'}>
						<img className={'bnr_tit_new'} src={`${process.env.PUBLIC_URL}/banners/bnr_tit_new.png`} alt="img"/>
						<img className={'bnr_bg_new'} src={`${process.env.PUBLIC_URL}/banners/bnr_bg_new.png`} alt="img"/>
					</h3>
				</SBanner>
				{isLoading ? (
					<div>Loading...</div>
				) : (
					<>
						<section className={"emoticonListSect"}>
							{emoticons.map((emoticon: any) => (
								<article key={emoticon.name}
										 className={"emoticonList"}
										 onClick={() => handleClickEmoticon(emoticon.name)}
								>
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
										{emoticon.data
											.slice(4, 8)
											.map((d: IEmoticonSelectorData) => (
												<li key={d.image} className={"emoticon hide"}>
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
