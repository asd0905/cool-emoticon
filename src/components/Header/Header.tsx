import { AnimatePresence, motion, useAnimation, useScroll } from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import {useRecoilState, useSetRecoilState} from 'recoil';
import {isBodyFixedAtom, isDarkThemeAtom} from '../../atoms/atom';
import {
	SBar,
	SHead,
	SInnerSearchBox,
	SLayout,
	SMenu,
	SMenuBtm,
	SMenuTop,
	SMenuUser,
	SNav,
	SNavLink,
	SOverlay,
	SSearch,
	SSearchBox,
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

const logoVariants = {
	top: {
		opacity: 0,
	},
	scroll: {
		opacity: 1,
	}
}

export default function Header() {
	const [isMenu, setIsMenu] = useState(false);
	const [isSearch, setIsSearch] = useState(false);
	const homeMatch = useMatch("/");
	const homeMatch2 = useMatch(`${COOL_EMOTICON_BASE_PATH}`);
	const newMatch = useMatch(`${COOL_EMOTICON_BASE_PATH}/new`);
	const detailMatch = useMatch(`${COOL_EMOTICON_BASE_PATH}/detail/:id`);
	const { scrollY } = useScroll();
	const navAnimation = useAnimation();
	const setIsBodyFix = useSetRecoilState(isBodyFixedAtom);
	const [isDark, setIsDark] = useRecoilState(isDarkThemeAtom);
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
					<div className={'headLeftMenu'}>
						<span className={'leftMenu'} onClick={handleMenuClick}>
							<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
								<path d='M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z' />
							</svg>
						</span>
						{detailMatch && <Link className={'leftMenu'} to={`/${COOL_EMOTICON_BASE_PATH}`}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
								<path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
							</svg>
						</Link>}
					</div>
					{detailMatch ? (
						<motion.span transition={{duration: .2}}
									 variants={logoVariants}
									 initial={'top'}
									 animate={navAnimation}
									 className={'logo'}>
							{detailMatch.params.id}
						</motion.span>
						) :
						<Link className={'logo'} to={"/"}>COOL EMOTICON</Link>}
					<div className={'headLeftMenu'}>
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
						<motion.span
							className={'leftMenu'}
							onClick={() => setIsDark(prev => !prev)}
							animate={{rotate: isDark ? 180 : 0}}
							transition={{duration: .8}}
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
								<path d="M448 256c0-106-86-192-192-192V448c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/>
							</svg>
						</motion.span>
					</div>
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
							detailmatch={detailMatch}
						>
							<SOverlay
								key={"menuOverlay"}
								onClick={() => {
									setIsSearch(false);
									setIsBodyFix(false);
								}}
							/>
							<SInnerSearchBox>
								<div className={'searchInputBox'}>
									<input type='text' placeholder={"이모티콘을 검색해보세요!"} />
									<SSearchSvg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 512 512'
									>
										<path d='M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z' />
									</SSearchSvg>
								</div>
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
										<Link onClick={() => {
											setIsMenu(false);
											setIsBodyFix(false);
										}} to={`/${COOL_EMOTICON_BASE_PATH}`}>홈</Link>
										<Link onClick={() => {
											setIsMenu(false);
											setIsBodyFix(false);
										}} to={`/${COOL_EMOTICON_BASE_PATH}/new`}>신규</Link>
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
