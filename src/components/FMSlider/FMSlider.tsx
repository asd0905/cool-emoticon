import {Link} from 'react-router-dom';
import {useEffect, useRef, useState} from 'react';
import {useMotionValue} from 'framer-motion';
import {EEmoticon, IEmoticon} from '../../app.constant';
import {useRecoilValue} from 'recoil';
import {emoticonsAtom} from '../../atoms/atom';
import { SSlider } from './FMSlider.style';

interface ISliderType {
    type: string;
}

export default function FMSlider({type}: ISliderType) {
    const slideRef = useRef<HTMLDivElement>(null);
    const [constraints, setConstraints] = useState<number>(0);
    const [isDraggable, setIsDrag] = useState<boolean>(true);
    const x = useMotionValue(0);
    const emoticons = useRecoilValue(emoticonsAtom);
    const [emoticonsForStyle, setEmoticonsForStyle] = useState([]);

    switch (type) {
        case EEmoticon.NEW:

    }

    useEffect(() => {
        const setIsDraggable = () => {
            if (slideRef && slideRef.current) {
                const clientWidth = document.body.clientWidth;
                const constraints = slideRef.current.scrollWidth - document.body.clientWidth + 30;
                setConstraints(constraints);
                if (clientWidth > 1024) {
                    setIsDrag(false);
                    x.set(0);
                } else {
                    setIsDrag(true);
                }
            }
        }
        setIsDraggable();
        window.addEventListener('resize', setIsDraggable);
        return () => window.removeEventListener('resize', setIsDraggable);
    }, [emoticons, x])
    return (
        <SSlider
            ref={slideRef}
            drag={isDraggable && 'x'}
            initial={{ x: 0 }}
            transition={{duration: 2}}
            style={{x}}
            dragTransition={{ bounceDamping: 30}}
            dragConstraints={{
                left: -`${constraints}`,
                right: 0
            }}
            className={`${!isDraggable ? 'web' : ''}`}
        >
            {emoticons?.emoticonList.map((e: IEmoticon) =>
                <div className={'newBannerBox'} key={e.emoticonName}>
                    <Link to={'/'}>
                        <img src={`${emoticons?.baseUrl}${e.emoticonName}/image_pack/${e.images[0].image}`} alt="img" />
                        <p>{e.emoticonName}</p>
                    </Link>
                </div>
            )}

            {/*{
                emoticons
            }*/}
        </SSlider>
    )
}
