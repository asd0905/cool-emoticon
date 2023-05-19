import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const SLayout = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 8;
	width: 100%;
`;

export const SHead = styled.div`
	display: flex;
	justify-content: space-between;
	height: 60px;
	align-items: center;
	padding: 0 10px;
	background-color: ${props => props.theme.white.lighter};
	position: relative;
	z-index: 1;
    .headLeftMenu {
        display: flex;
        height: 100%;
        .leftMenu {
            height: 100%;
            cursor: pointer;
            padding: 15px 10px;
            display: flex;
            align-items: center;
            svg {
                width: 20px;
                height: 20px;
            }
            @media screen and (min-width: 767px) {
                padding: 15px 20px;
                svg {
                    width: 30px;
                    height: 30px;
                }
            }
        }
    }

    .logo {
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 20px;
        font-weight: bold;
        color: ${props => props.theme.black.deepDark};
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        &:hover,
        &:focus {
            color: #000;
        }
        @media screen and (max-width: 767px) {
            font-size: 17px;
        }
    }
`;

export const SSearch = styled.div`
	cursor: pointer;
	padding: 0 10px;
	height: 100%;
	vertical-align: middle;
	display: inline-flex;
	align-items: center;
    @media screen and (min-width: 767px) {
        padding: 0 20px;
    }
`;

export const SSearchSvg = styled.svg`
	width: 25px;
	@media screen and (max-width: 767px) {
		width: 20px;
		height: 20px;
	}
`;

export const SOverlay = styled(motion.div)`
	position: fixed;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5);
	top: 0;
	left: 0;
	z-index: 9;
`;

export const SMenu = styled(motion.div)`
	background-color: ${props => props.theme.white.lighter};
	width: 80vw;
	max-width: 400px;
	height: 100vh;
	position: fixed;
	left: 0;
	top: 0;
	z-index: 10;
	display: grid;
	grid-template-rows: 1fr 50px;
`;

export const SMenuTop = styled.div`
	overflow-y: auto;
	ul {
		border-top: 1px solid rgba(0, 0, 0, 0.04);
		margin-top: 9px;
		padding-top: 13px;
		li {
			a {
				display: flex;
				height: 50px;
				align-items: center;
				color: #000;
				padding: 0 20px;
				font-size: 16px;
			}
		}
	}
`;

export const SMenuBtm = styled.div`
	height: 50px;
	display: flex;
	justify-content: space-between;
	padding: 0 20px;
	align-items: center;
`;
export const SMenuUser = styled.div`
	padding: 20px;
	display: flex;
	span {
		background-color: lightskyblue;
		width: 75px;
		height: 75px;
		border-radius: 20px;
		display: block;
	}
	div {
		margin-left: 15px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		h2 {
			font-size: 18px;
		}
		p {
			font-size: 13px;
		}
	}
`;

export const SNav = styled(motion.nav)`
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${props => props.theme.white.lighter};
`;

export const SNavLink = styled(Link)`
	position: relative;
	height: 100%;
	width: 10%;
	justify-content: center;
	align-items: center;
	color: ${props => props.theme.black.deepDark};
	display: flex;
	@media screen and (max-width: 767px) {
		width: 20%;
	}
`;

export const SBar = styled(motion.div)`
	width: 100%;
	height: 1px;
	background-color: ${props => props.theme.black.deepDark};
	position: absolute;
	left: 0;
	bottom: 0;
`;

export const SSearchBox = styled(motion.div)<{detailmatch: any}>`
	position: fixed;
	top: ${props => props.detailmatch ? '50px' : '110px'};
	left: 0;
	width: 100%;
	z-index: 1;
	@media screen and (max-width: 767px) {
		top: 0;
		z-index: 8;
	}
`;

export const SInnerSearchBox = styled.div`
	background-color: ${props => props.theme.white.darker};
	padding: 30px 0;
	z-index: 9;
	position: relative;
    .searchInputBox {
        height: 54px;
        width: 80vw;
        background-color: ${props => props.theme.white.lighter};
        position: relative;
        display: flex;
        margin: 0 auto;
        border-radius: 10px;
        max-width: 767px;
        @media screen and (min-width: 767px) {
            width: 50vw;
        }
        input {
            width: 100%;
            padding: 20px;
            border: 0;
            border-bottom-left-radius: 10px;
            border-top-left-radius: 10px;
        }
        svg {
            padding: 0 20px;
            width: 60px;
            height: 100%;
            border-bottom-right-radius: 10px;
            border-top-right-radius: 10px;
        }
    }
`;
