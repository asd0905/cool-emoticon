import styled from "styled-components";

export const SLayout = styled.div`
    .newBannerWrap {
        padding: 30px 0 30px 20px;
        @media screen and (min-width: 1024px) {
            padding: 30px 20px;
        }
    }
    .styleBannerWrap {
        background-color: #fafafa;
        padding: 30px 0 30px 20px;
        @media screen and (min-width: 1024px) {
            padding: 30px 20px;
        }
        article {
            margin-bottom: 30px;
        }
        .web {
            display: grid;
            grid-template-columns: 100px 1fr;
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
                grid-template-columns: repeat(auto-fill, minmax(150px, 180px));
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
            color: #000;
            svg {
                width: 15px;
                margin-left: 10px;
            }
        }
    }
`;

export const STitle3 = styled.h3<{color: string}>`
    font-size: 18px;
    margin-bottom: 10px;
    padding-left: 10px;
    color: ${props => props.color};
    span {
        color: #fff;
        background-color: ${props => props.color};
        font-size: 13px;
        display: inline-flex;
        border-radius: 16px;
        align-items: center;
        height: 26px;
        padding: 0 13px;
        margin-left: 10px;
    }
`
