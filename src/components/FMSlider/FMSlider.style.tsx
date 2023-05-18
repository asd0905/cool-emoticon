import styled from 'styled-components';
import {motion} from 'framer-motion';

export const SSlider = styled(motion.div)`
    display: flex;
    .newBannerBox {
        padding: 10px;
        min-width: 200px;
        a {
            padding: 20px 30px;
            box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .1);
            border-radius: 10px;
            //height: calc(100% - 40px);
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            p {
                color: #000;
                text-align: center;
                margin-top: 10px;
            }
        }
    }
    .styleBannerBox {
        //padding: 10px;
        min-width: 150px;
        a {
            padding: 10px 20px;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    }
    &.web {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
        grid-template-rows: repeat(auto-fit, minmax(190px, 1fr));
    }
`
