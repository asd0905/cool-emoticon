import { AnimatePresence, useAnimation, useScroll } from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { isBodyFixedAtom } from "../../atoms/atom";
import {
	SBar,
	SHead,
	SInnerSearchBox,
	SLayout,
	SLink,
	SMenu,
	SMenuBtm,
	SMenuBtn,
	SMenuTop,
	SMenuUser,
	SNav,
	SNavLink,
	SOverlay,
	SSearch,
	SSearchBox,
	SSearchInputBox,
	SSearchSvg,
} from "./Header.style";
import { COOL_EMOTICON_BASE_PATH } from "../../app.constant";
import React from "react";

const navVariants = {
	top: {
		marginTop: 0,
	},
	scroll: {
		marginTop: "-50px",
	},
};

export default function Header() {
	const [isMenu, setIsMenu] = useState(false);
	const [isSearch, setIsSearch] = useState(false);
	const homeMatch = useMatch("/");
	const homeMatch2 = useMatch(`${COOL_EMOTICON_BASE_PATH}`);
	const newMatch = useMatch(`${COOL_EMOTICON_BASE_PATH}/new`);
	const { scrollY } = useScroll();
	const navAnimation = useAnimation();
	const setIsBodyFix = useSetRecoilState(isBodyFixedAtom);
	const handleMenuClick = () => {
		setIsMenu((prev) => !prev);
		setIsSearch(false);
		setIsBodyFix(true);
	};
	const handleSearchClick = () => {
		setIsSearch((prev) => !prev);
		setIsMenu(false);
		setIsBodyFix(true);
	};
	useEffect(() => {
		scrollY.on("change", () => {
			if (scrollY.get() > 110) {
				navAnimation.start("scroll").then();
			} else {
				navAnimation.start("top").then();
			}
		});
	}, [scrollY]);
	return (
		<>
			<SLayout>
				<SHead>
					<SMenuBtn onClick={handleMenuClick}>
						<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
							<path d='M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z' />
						</svg>
					</SMenuBtn>
					<SLink to={"/"}>COOL EMOTICON</SLink>
					{!isSearch && (
						<SSearch>
							<SSearchSvg
								onClick={handleSearchClick}
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 512 512'
							>
								<path d='M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z' />
							</SSearchSvg>
						</SSearch>
					)}
				</SHead>
				{homeMatch || homeMatch2 || newMatch ? (
					<SNav
						variants={navVariants}
						animate={navAnimation}
						initial={"top"}
						transition={{ duration: 0.2 }}
					>
						<SNavLink to={`/${COOL_EMOTICON_BASE_PATH}`}>
							홈 {(homeMatch || homeMatch2) && <SBar layoutId={"navBar"} />}
						</SNavLink>
						<SNavLink to={`/${COOL_EMOTICON_BASE_PATH}/new`}>
							신규 {newMatch && <SBar layoutId={"navBar"} />}
						</SNavLink>
					</SNav>
				) : null}
			</SLayout>
			<AnimatePresence>
				{isSearch ? (
					<>
						<SSearchBox
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<SOverlay
								key={"menuOverlay"}
								onClick={() => {
									setIsSearch(false);
									setIsBodyFix(false);
								}}
							/>
							<SInnerSearchBox>
								<SSearchInputBox>
									<input type='text' placeholder={"이모티콘을 검색해보세요!"} />
									<SSearchSvg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 512 512'
									>
										<path d='M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z' />
									</SSearchSvg>
								</SSearchInputBox>
							</SInnerSearchBox>
						</SSearchBox>
					</>
				) : null}
				{isMenu ? (
					<>
						<SOverlay
							key={"menuOverlay"}
							onClick={() => {
								setIsMenu(false);
								setIsBodyFix(false);
							}}
							transition={{ duration: 0.2 }}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						/>
						<SMenu
							key={"menu"}
							transition={{ duration: 0.2 }}
							initial={{ left: "-100%" }}
							animate={{ left: 0 }}
							exit={{ left: "-100%" }}
						>
							<SMenuTop>
								<SMenuUser>
									<span></span>
									<div>
										<h2>김지란</h2>
										<p>test@jiran.com</p>
									</div>
								</SMenuUser>
								<ul>
									<li>
										<Link to={"/"}>홈</Link>
										<Link to={"/new"}>신규</Link>
									</li>
								</ul>
							</SMenuTop>
							<SMenuBtm>
								<span>COOLEMOTICON</span>
								<span>jirancomms</span>
							</SMenuBtm>
						</SMenu>
					</>
				) : null}
			</AnimatePresence>
		</>
	);
}
