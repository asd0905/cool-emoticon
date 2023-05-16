import {AnimatePresence, motion, useAnimation, useScroll} from 'framer-motion';
import {Link, useMatch} from 'react-router-dom';
import styled from 'styled-components';
import {useEffect, useState} from 'react';
import {useSetRecoilState} from 'recoil';
import {isBodyFixedAtom} from '../../atoms/atom';

const SLayout = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 8;
    width: 100%;
`

const SHead = styled.div`
    display: flex;
    justify-content: space-between;
    height: 60px;
    align-items: center;
    padding: 0 10px;
    background-color: #fff;
    position: relative;
    z-index: 1;
`;

const SMenuBtn = styled.div`
    width: 30px;
    height: 30px;
    cursor: pointer;
    padding: 15px;
    @media screen and (max-width: 767px) {
        width: 20px;
        height: 20px;
    }
`;

const SSearch = styled.div`
    cursor: pointer;
    padding: 0 20px;
    height: 100%;
    vertical-align: middle;
    display: inline-flex;
    align-items: center;
`;

const SSearchSvg = styled.svg`
    width: 30px;
    height: 30px;
    @media screen and (max-width: 767px) {
        width: 20px;
        height: 20px;
    }
`

const SLink = styled(Link)`
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    color: #000000;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    &:hover, &:focus {
        color: #000;
    }
    @media screen and (max-width: 767px) {
        font-size: 17px;
    }
`

const SOverlay = styled(motion.div)`
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    z-index: 9;
`

const SMenu = styled(motion.div)`
    background-color: #ffffff;
    width: 80vw;
    max-width: 400px;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    display: grid;
    grid-template-rows: 1fr 50px;
`

const SMenuTop = styled.div`
    overflow-y: auto;
    ul {
        border-top: 1px solid rgba(0,0,0,.04);
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
`

const SMenuBtm = styled.div`
    height: 50px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    align-items: center;
`
const SMenuUser = styled.div`
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
`

const SNav = styled(motion.nav)`
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
`

const SNavLink = styled(Link)`
    position: relative;
    height: 100%;
    width: 10%;
    justify-content: center;
    align-items: center;
    color: #000;
    display: flex;
`

const SBar = styled(motion.div)`
    width: 100%;
    height: 1px;
    background-color: #000;
    position: absolute;
    left: 0;
    bottom: 0;
`

const SSearchBox = styled(motion.div)`
    position: fixed;
    top: 110px;
    left: 0;
    width: 100%;
    @media screen and (max-width: 767px) {
        top: 0;
        z-index: 8;
    }
`

const SInnerSearchBox = styled.div`
    background-color: #fafafa;
    padding: 30px 0;
    z-index: 9;
    position: relative;
`

const SSearchInputBox = styled.div`
    width: 50vw;
    height: 54px;
    background-color: #ffffff;
    position: relative;
    display: flex;
    margin: 0 auto;
    border-radius: 10px;
    input {
        width: 100%;
        padding: 20px;
        border: 0;
        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;
    }
    svg {
        padding: 0 20px;
        height: 100%;
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
    }
`

const navVariants = {
    top: {
        marginTop: 0,
    },
    scroll: {
        marginTop: '-50px',
    }
}

export default function Header() {
    const [isMenu, setIsMenu] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const homeMatch = useMatch('/');
    const newMatch = useMatch('/new');
    const {scrollY} = useScroll();
    const navAnimation = useAnimation();
    const setIsBodyFix = useSetRecoilState(isBodyFixedAtom);
    const handleMenuClick = () => {
        setIsMenu(prev => !prev);
        setIsSearch(false);
        setIsBodyFix(true);
    }
    const handleSearchClick = () => {
        setIsSearch(prev => !prev);
        setIsMenu(false);
        setIsBodyFix(true);
    }
    useEffect(() => {
        scrollY.on('change', () => {
            if (scrollY.get() > 110) {
                navAnimation.start('scroll').then();
            } else {
                navAnimation.start('top').then();
            }
        })
    }, [scrollY])
    return (
        <>
            <SLayout>
                <SHead>
                    <SMenuBtn onClick={handleMenuClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
                        </svg>
                    </SMenuBtn>
                    <SLink to={'/'}>
                        COOL EMOTICON
                    </SLink>
                    {!isSearch && <SSearch>
                        <SSearchSvg onClick={handleSearchClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                        </SSearchSvg>
                    </SSearch>}
                </SHead>
                <SNav variants={navVariants} animate={navAnimation} initial={'top'} transition={{duration: .2}}>
                    <SNavLink to={'/'}>홈 {homeMatch && <SBar layoutId={'navBar'} />}</SNavLink>
                    <SNavLink to={'/new'}>신규 {newMatch && <SBar layoutId={'navBar'} />}</SNavLink>
                </SNav>
            </SLayout>
            <AnimatePresence>
                {isSearch ? <>
                    <SSearchBox
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        <SOverlay
                            key={'menuOverlay'}
                            onClick={() => {
                                setIsSearch(false);
                                setIsBodyFix(false);
                            }}
                        />
                        <SInnerSearchBox>
                            <SSearchInputBox>
                                <input type="text" placeholder={'이모티콘을 검색해보세요!'} />
                                <SSearchSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                                </SSearchSvg>
                            </SSearchInputBox>
                        </SInnerSearchBox>
                    </SSearchBox>
                </> : null}
                {isMenu ? <>
                    <SOverlay
                        key={'menuOverlay'}
                        onClick={() => {
                            setIsMenu(false);
                            setIsBodyFix(false);
                        }}
                        transition={{duration: 0.2}}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    />
                    <SMenu
                        key={'menu'}
                        transition={{duration: 0.2}}
                        initial={{left: '-100%'}}
                        animate={{left: 0}}
                        exit={{left: '-100%'}}
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
                                   <Link to={'/'}>홈</Link>
                                   <Link to={'/new'}>신규</Link>
                               </li>
                            </ul>
                        </SMenuTop>
                        <SMenuBtm>
                            <span>COOLEMOTICON</span>
                            <span>jirancomms</span>
                        </SMenuBtm>
                    </SMenu>
                </> : null}
            </AnimatePresence>
        </>
    )
}
