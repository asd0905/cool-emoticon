import { useQuery } from "react-query";
import { getEmoticon } from "../../api";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { EEmoticon, EQueryKey, IEmoticonData } from "../../app.constant";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { emoticonsAtom, isDraggableAtom } from "../../atoms/atom";
import FMSlider from "../../components/FMSlider/FMSlider";
import { SLayout, STitle3 } from "./Main.style";
import MainBanner from "../../components/MainBanner/MainBanner";
import React from "react";

export default function Main() {
	const setEmoticons = useSetRecoilState<IEmoticonData>(emoticonsAtom);
	const isDraggable = useRecoilValue<boolean>(isDraggableAtom);
	const { isLoading } = useQuery([EQueryKey.EMOTICONS], getEmoticon, {
		// refetchOnWindowFocus: false,
		onSuccess: (response) => {
			setEmoticons(response.data);
		},
	});
	// console.log(isLoading, data)
	return (
		<>
			<SLayout>
				<MainBanner type={"mainBanner"}>
					<h1>쿨서비스 이모티콘</h1>
					<video autoPlay={true} muted={true} loop={true} playsInline={true}>
						<source
							src='//update.coolmessenger.com/_ImageServer/jirancomms/img/상단.mp4'
							type='video/mp4'
						/>
					</video>
				</MainBanner>
				{isLoading ? (
					<div>Loading...</div>
				) : (
					<>
						<article className={"newBannerWrap"}>
							<h2 className={"bannerTitle"}>
								<Link to={"/"}>
									신규 이모티콘
									<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
										<path d='M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z' />
									</svg>
								</Link>
							</h2>
							<FMSlider type={EEmoticon.NEW} />
						</article>
						<div className='styleBannerWrapDiv'>
							<section className={"styleBannerWrap"}>
								<h2 className={"bannerTitle"}>
									<Link to={"/"}>
										스타일
										<svg
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 448 512'
										>
											<path d='M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z' />
										</svg>
									</Link>
								</h2>
								<article className={!isDraggable ? "web" : ""}>
									<STitle3 color={"rgb(244, 196, 0)"}>
										<strong>#귀여운</strong>
										<span>#선생님</span>
									</STitle3>
									<FMSlider type={EEmoticon.STYLE} list={[6, 11]} />
								</article>
								<article className={!isDraggable ? "web" : ""}>
									<STitle3 color={"rgb(144, 199, 100)"}>
										<strong>#동물</strong>
										<span>#쿨 캐릭터</span>
									</STitle3>
									<FMSlider type={EEmoticon.STYLE} list={[1, 6]} />
								</article>
							</section>
						</div>
					</>
				)}
			</SLayout>
		</>
	);
}
