import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useMotionValue } from "framer-motion";
import { EEmoticon, IEmoticon } from "../../app.constant";
import { useRecoilState, useRecoilValue } from "recoil";
import { emoticonsAtom, isDraggableAtom } from "../../atoms/atom";
import { SSlider } from "./FMSlider.style";
import React from "react";
import styled, { keyframes } from "styled-components";

interface ISliderType {
	type: string;
	list?: number[];
}

const rotate = keyframes`
	0% {
		transform: rotate(0deg);
	}
	30%{
		transform: rotate(8deg);
	}
	50%{
		transform: rotate(0deg);
	}
	70% {
		transform: rotate(-8deg);
	}
	/* 100% {
		transform: rotate(0);
	} */
`;

const SAniBanner = styled.div`
	a {
		transition: box-shadow 0.2s;
	}
	&:not(.styleBannerBox):hover {
		a {
			box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.3);
			img {
				animation: ${rotate} 0.4s infinite ease-in;
			}
			p {
				text-decoration: underline;
			}
		}
	}
	&.styleBannerBox:hover {
		img {
			animation: ${rotate} 0.4s infinite ease-in;
		}
	}
`;

export default function FMSlider({ type, list }: ISliderType) {
	const slideRef = useRef<HTMLDivElement>(null);
	const [constraints, setConstraints] = useState<number>(0);
	const [isDraggable, setIsDrag] = useRecoilState<boolean>(isDraggableAtom);
	const x = useMotionValue(0);
	const emoticons = useRecoilValue(emoticonsAtom);

	useEffect(() => {
		const setIsDraggable = () => {
			if (slideRef && slideRef.current) {
				const clientWidth = document.body.clientWidth;
				const constraints =
					slideRef.current.scrollWidth - document.body.clientWidth + 30;
				setConstraints(constraints);
				if (clientWidth > 1024) {
					setIsDrag(false);
				} else {
					setIsDrag(true);
				}
				x.set(0);
			}
		};
		setIsDraggable();
		window.addEventListener("resize", setIsDraggable);
		return () => window.removeEventListener("resize", setIsDraggable);
	}, [emoticons, x]);
	return (
		<>
			<SSlider
				ref={slideRef}
				drag={isDraggable && "x"}
				initial={{ x: 0 }}
				transition={{ duration: 2 }}
				style={{ x }}
				dragTransition={{ bounceDamping: 30 }}
				dragConstraints={{
					left: -constraints,
					right: 0,
				}}
				className={`${!isDraggable ? "web" : ""}`}
			>
				{list && list.length > 0
					? emoticons?.emoticonList
							.slice(list[0], list[1])
							.map((e: IEmoticon) => (
								<SAniBanner className={"styleBannerBox"} key={e.emoticonName}>
									<Link to={"/"}>
										<img
											src={`${emoticons?.baseUrl}${e.emoticonName}/image_pack/${e.images[0].image}`}
											alt='img'
										/>
									</Link>
								</SAniBanner>
							))
					: emoticons?.emoticonList.map((e: IEmoticon) => (
							<SAniBanner
								className={`newBannerBox ${type}`}
								key={e.emoticonName}
							>
								<Link to={"/"}>
									<img
										src={`${emoticons?.baseUrl}${e.emoticonName}/image_pack/${e.images[0].image}`}
										alt='img'
									/>
									<p>{e.emoticonName}</p>
								</Link>
							</SAniBanner>
					  ))}
			</SSlider>
		</>
	);
}
