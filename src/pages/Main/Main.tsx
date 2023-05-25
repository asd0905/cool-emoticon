import { useQuery } from "react-query";
import { getEmoticon } from "../../api";
import { Link } from "react-router-dom";
import { EEmoticon, EQueryKey, IEmoticonData } from "../../app.constant";
import {useRecoilValue, useSetRecoilState} from 'recoil';
import { emoticonsAtom, isDraggableAtom } from "../../atoms/atom";
import FMSlider from "../../components/FMSlider/FMSlider";
import { SLayout, STitle3 } from "./Main.style";
import MainBanner from "../../components/MainBanner/MainBanner";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from "react";
import Slider from "react-slick";
import styled from 'styled-components';

const SBanner = styled.div`
	margin-bottom: 20px;
	.slick-dots {
		position: static;
		li {
			display: inline-flex;
			justify-content: center;
			align-items: center;
			button {
				text-indent: -9999px;
				display: inline-block;
				width: 8px;
				height: 8px;
				background-color: rgba(0, 0, 0, .2);
				border-radius: 50%;
			}
			&.slick-active {
				button {
					background-color: #000;
				}
			}
		}
	}
`

const SSlickBox = styled.div<{color: string}>`
	background-color: ${props => props.color};
	img {
		max-width: 944px;
		width: 100%;
		margin: 0 auto;
		display: block;
	}
`

export default function Main() {
	const setEmoticons = useSetRecoilState<IEmoticonData>(emoticonsAtom);
	const isDraggable = useRecoilValue<boolean>(isDraggableAtom);
	const { isLoading } = useQuery([EQueryKey.EMOTICONS], getEmoticon, {
		// refetchOnWindowFocus: false,
		onSuccess: (response) => {
			setEmoticons(response.data);
			console.log(1);
		},
	});
	// console.log(isLoading, data);
	const settings = {
		arrows: false,
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
        speed: 800,
	}
	return (
		<>
			<SLayout>
				{/*<MainBanner type={"mainBanner"}>
					<h1>쿨서비스 이모티콘</h1>
					<video autoPlay={true} muted={true} loop={true} playsInline={true}>
						<source
							src='//update.coolmessenger.com/_ImageServer/jirancomms/img/상단.mp4'
							type='video/mp4'
						/>
					</video>
				</MainBanner>*/}
				<SBanner>
					<Slider {...settings}>
						<SSlickBox color={'rgb(199, 228, 218)'}>
							<img src={`${process.env.PUBLIC_URL}/banners/kakao_main_0.gif`} alt="img"/>
						</SSlickBox>
						<SSlickBox color={'rgb(255, 214, 214)'}>
							<img src={`${process.env.PUBLIC_URL}/banners/kakao_main_1.gif`} alt="img"/>
						</SSlickBox>
					</Slider>
				</SBanner>
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
