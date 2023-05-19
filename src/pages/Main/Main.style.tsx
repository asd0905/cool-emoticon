import styled from "styled-components";

export const SLayout = styled.div`
	.newBannerWrap {
		max-width: 1024px;
		padding: 30px 0 30px 20px;
		margin: 0 auto;
		@media screen and (min-width: 1024px) {
			padding: 30px 20px;
		}
	}
	.styleBannerWrapDiv {
		background-color: ${props => props.theme.white.darker};
		.styleBannerWrap {
			max-width: 1024px;
			padding: 30px 0 30px 20px;
			margin: 0 auto;
			@media screen and (min-width: 1024px) {
				padding: 30px 20px;
			}
			article {
				margin-bottom: 30px;
			}
			.web {
				display: grid;
				grid-template-columns: 130px 1fr;
				align-items: center;
				h3 {
					strong {
						display: block;
					}
					span {
						margin-left: 0;
						margin-top: 10px;
					}
				}
				& > div {
					grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
				}
			}
		}
	}
	.bannerTitle {
		font-size: 18px;
		margin-bottom: 15px;
		padding-left: 10px;
		a {
			display: inline-flex;
			align-items: center;
			color:  ${props => props.theme.black.deepDark};
			svg {
				width: 15px;
				margin-left: 10px;
			}
		}
	}
`;

export const STitle3 = styled.h3<{ color: string }>`
	font-size: 18px;
	margin-bottom: 10px;
	padding-left: 10px;
	color: ${(props) => props.color};
	span {
		color: #fff;
		background-color: ${(props) => props.color};
		font-size: 13px;
		display: inline-flex;
		border-radius: 16px;
		align-items: center;
		height: 26px;
		padding: 0 13px;
		margin-left: 10px;
	}
`;
