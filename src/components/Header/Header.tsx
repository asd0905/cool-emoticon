import { AnimatePresence, motion, useAnimation, useScroll } from "framer-motion";
import {Link, useLocation, useMatch, useNavigate, useNavigation, useRoutes, useSearchParams} from 'react-router-dom';
import { useEffect, useState } from "react";
import {useRecoilCallback, useRecoilState, useSetRecoilState} from 'recoil';
import {emoticonsAtom, isBodyFixedAtom, isDarkThemeAtom, userAtom} from '../../atoms/atom';
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
import {
	CLIENT_ID,
	COOL_EMOTICON_BASE_PATH, EToken,
	MEMBER_URL,
	SEARCH_API_URL,
	SEARCH_AUTH_USER_URL, SEARCH_GET_REFRESH_TOKEN_URL,
	SEARCH_GET_TOKEN_URL
} from '../../app.constant';
import React from "react";
import instance from '../../axiosIntercepter';
import {useParams} from 'react-router';
import axios from 'axios';
import {useForm} from 'react-hook-form';

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

interface IForm {
	search?: string;
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
	const {register, handleSubmit, reset, formState: {errors}} = useForm();
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
			if (scrollY.get() > 110 && window.outerWidth <= 767) {
				navAnimation.start("scroll").then();
			} else {
				navAnimation.start("top").then();
			}
		});
	}, [scrollY]);

	const [params] = useSearchParams();
	const [user, setUser] = useRecoilState(userAtom);
	const navigation = useNavigate();
	const handleLogin = () => {
		const loginParams = {
			client_id: CLIENT_ID,
			redirect_uri: `${window.location.href}/callback`,
			redirect_uri_next: `https:${window.location.href}/v2`
		}
		window.location.href = `${MEMBER_URL}/login?${new URLSearchParams(loginParams).toString()}`;
	}

	const handleLogout = async () => {
		const logoutUrl = `${MEMBER_URL}/logout?client_id=:client_id`;
		const token = sessionStorage.getItem(EToken.ACCESS_TOKEN);
		const setting = {
			headers: {
				Authorization: token,
				contentType: "application/json",
			}
		};
		// const response = await axios.get(logoutUrl.replace(':client_id', CLIENT_ID), setting);
		sessionStorage.removeItem(EToken.ACCESS_TOKEN);
		sessionStorage.removeItem(EToken.REFRESH_ACCESS_TOKEN);
		// console.log(response);
		const params = {
			client_id: CLIENT_ID,
			redirect_uri: window.location.href
		}
		setUser({});
		window.location.href = `${MEMBER_URL}/logoutByPage?${new URLSearchParams(params).toString()}`;
	}

	const getUser = async (): Promise<any> => {
		if (!sessionStorage.getItem(EToken.ACCESS_TOKEN)) {
			const loginCode = params.get('code');
			// const loginCode = 'SORT051923142023330519233H0gtu==';
			console.log(loginCode);
			if (!loginCode) {
				return;
			}
			const codeObj = {code: loginCode};
			console.log(`${SEARCH_GET_TOKEN_URL}?${new URLSearchParams(codeObj).toString()}`);
			const sortResult = await instance(`${SEARCH_GET_TOKEN_URL}?${new URLSearchParams(codeObj).toString()}`) as any;
			console.log(sortResult);
			if (sortResult.data.result) {
				sessionStorage.setItem(EToken.ACCESS_TOKEN, sortResult.data.data.id_token);
				sessionStorage.setItem(EToken.REFRESH_ACCESS_TOKEN, sortResult.data.data.id_token);
			}
		}

		try {
			const response = await instance(SEARCH_AUTH_USER_URL);
			if (response.data.result) {
				response.data.data.isAuth = true;
				setUser(response.data.data);
			}
			navigation(`/${COOL_EMOTICON_BASE_PATH}`);

			console.log(response);
		} catch (e) {
			const token = sessionStorage.getItem(EToken.REFRESH_ACCESS_TOKEN);
			if (token) {
				const setting = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					}
				};
				const refreshResp = await axios.get(SEARCH_GET_REFRESH_TOKEN_URL, setting) as any;
				console.log(refreshResp);
				if (refreshResp.result) {
					sessionStorage.setItem(EToken.ACCESS_TOKEN, refreshResp.data.id_token);
					sessionStorage.setItem(EToken.REFRESH_ACCESS_TOKEN, refreshResp.data.refresh_token);
					return getUser();
				}
			}
		}
	}

	/** recoil 값 확인 가능 */
	const logState = useRecoilCallback(({ snapshot }) => () => {
		console.log("현재 Snapshot에 포함된 states: ", snapshot.getLoadable(emoticonsAtom));
	});

	const handleSearch = (data: IForm) => {
		console.log(data);
	}

	useEffect(() => {
		getUser();
	}, []);
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
						{user?.isAuth && <img src={user?.profileImage} style={{width: '55px',
							height: '35px',
							display: 'block',
							padding: '0 10px'}} alt="img"/>}
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
									reset();
								}}
							/>
							<SInnerSearchBox>
								<form className={'searchInputBox'} onSubmit={handleSubmit(handleSearch)}>
										<input
											{...register('search', {
												required: true,
												minLength: {
													value: 2,
													message: '2글자 이상 입력해주세요.'
												}
											})}
											type='text'
											placeholder={"이모티콘을 검색해보세요!"}
										/>
										<SSearchSvg
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 512 512'
										>
											<path d='M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z' />
										</SSearchSvg>
								</form>
								{errors?.search?.message && <p className={'error'}>{errors?.search?.message as string}</p>}
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
									{user?.isAuth ? (
										<>
											<span>
												<img src={user.profileImage} alt="img"/>
											</span>
											<div>
												<h2>{user.name}</h2>
												<p>{user.email}</p>
											</div>
										</>
									) : '로그인 해주세요'
									}
								</SMenuUser>
								<ul>
									<li>
										{
											!user?.isAuth ? <span onClick={handleLogin}>로그인</span> : <span onClick={handleLogout}>로그아웃</span>
										}
										<span onClick={logState}>현재 스냅샷 보관</span>
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
