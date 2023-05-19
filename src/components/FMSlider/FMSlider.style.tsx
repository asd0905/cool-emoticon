import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

export const SSlider = styled(motion.div)`
	display: flex;
	.newBannerBox {
		padding: 10px;
		min-width: 170px;
		a {
			padding: 20px 30px;
			box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
			border-radius: 10px;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
            img {
                max-width: 100%;
            }
			p {
				color: ${props => props.theme.black.deepDark};
				text-align: center;
				margin-top: 15px;
			}
		}
	}
	.styleBannerBox {
		//padding: 10px;
		min-width: 130px;
		a {
			padding: 10px;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
            img {
                max-width: 100%;
            }
		}
	}
	&.web {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
		grid-template-rows: repeat(auto-fit, minmax(190px, 1fr));
	}
`;

export const rotate = keyframes`
	0% {
		transform: rotate(0deg);
	}
	30%{
		transform: rotate(3deg);
	}
	50%{
		transform: rotate(0deg);
	}
	70% {
		transform: rotate(-3deg);
	}
	/* 100% {
		transform: rotate(0);
	} */
`;

export const SAniBanner = styled.div`
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
