import React from "react";
import { ReactNode } from "react";
import styled from "styled-components";

const SBanner = styled.div`
	&.mainBanner {
		background-color: #f6f9fc;
		padding: 20px;
		h1 {
			text-align: center;
			font-size: 30px;
			padding: 20px 20px 30px;
		}
		video {
			width: 100%;
			display: block;
			max-width: 745px;
			margin: 0 auto;
		}
	}
	&.newMainBanner {
		padding: 0 30px;
		background-color: #ff8600;
		background-image: url(//update.coolmessenger.com/_ImageServer/jirancomms/img/culture_bg.png);
		video {
			width: 100%;
			display: block;
			max-width: 700px;
			margin: 0 auto;
		}
	}
`;

export default function MainBanner({
	type,
	children,
}: {
	type: string;
	children: ReactNode;
}) {
	return <SBanner className={type}>{children}</SBanner>;
}
