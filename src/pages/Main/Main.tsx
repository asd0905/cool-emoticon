import {useQuery} from 'react-query';
import {getEmoticon} from '../../api';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {EEmoticon, IEmoticonData} from '../../app.constant';
import {useSetRecoilState} from 'recoil';
import {emoticonsAtom} from '../../atoms/atom';
import FMSlider from '../../components/FMSlider/FMSlider';

const SLayout = styled.div`
    .mainBanner {
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
    .newBannerWrap {
        padding: 30px 0 30px 20px;
    }
    .styleBannerWrap {
        background-color: #fafafa;
        padding: 30px 0 30px 20px;
    }
    .bannerTitle {
        font-size: 18px;
        margin-bottom: 15px;
        padding-left: 10px;
        a {
            display: inline-flex;
            align-items: center;
            color: #000;
            svg {
                width: 15px;
                margin-left: 10px;
            }
        }
    }
`;

export default function Main() {
    const setEmoticons = useSetRecoilState<IEmoticonData>(emoticonsAtom);
    const {data, isLoading} = useQuery(['emoticon'], getEmoticon,{
        refetchOnWindowFocus: false,
        onSuccess: (response) => {
            setEmoticons(response.data)
        }
    });
    // console.log(isLoading, data)
    return <>
        <SLayout>
            <div className={'mainBanner'}>
                <h1>쿨서비스 이모티콘</h1>
                <video autoPlay={true} muted={true} loop={true} playsInline={true} >
                    <source src="//update.coolmessenger.com/_ImageServer/jirancomms/img/상단.mp4" type="video/mp4" />
                </video>
            </div>
            <article className={'newBannerWrap'}>
                <h2 className={'bannerTitle'}>
                    <Link to={'/'}>
                        신규 이모티콘
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
                        </svg>
                    </Link>
                </h2>
                {isLoading ? <div>Loading...</div> :
                    <FMSlider type={EEmoticon.NEW} />
                }
            </article>
            <section className={'styleBannerWrap'}>
                <article>
                    <h2 className={'bannerTitle'}>
                        <Link to={'/'}>
                            스타일
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
                            </svg>
                        </Link>
                    </h2>
                    <h3>#귀여운</h3>
                    <FMSlider type={EEmoticon.STYLE} />
                    <h3>#동물</h3>
                    <FMSlider type={'style'} />
                </article>
            </section>
        </SLayout>
    </>
}
