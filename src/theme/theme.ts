import {createGlobalStyle, DefaultTheme} from 'styled-components';

export const theme: DefaultTheme = {
    red: "#E51013",
    black: {
        deepDark: "#141414",
        darker: "#181818",
        lighter: "#2F2F2F",
    },
    white: {
        lighter: "#fff",
        darker: "#fafafa",
    },
}

export const themeDark: DefaultTheme = {
    red: "#E51013",
    black: {
        deepDark: "#3a4b53",
        darker: "#57707d",
        lighter: "#7d97a5s",
    },
    white: {
        lighter: "#c5c5c5",
        darker: "#b1b1b1",
    },
}

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'NanumSquareRound';
        src:
                //url('https://resource.coolmessenger.com/webdata/coolschool/resources/fonts/nanum-square-round/NanumSquareRoundR.woff2') format('woff2'),
        //url('https://resource.coolmessenger.com/webdata/coolschool/resources/fonts/nanum-square-round/NanumSquareRoundR.woff') format('woff'),
        url('https://resource.coolmessenger.com/webdata/coolschool/resources/fonts/nanum-square-round/NanumSquareRoundR.eot') format('embedded-opentype');
        font-weight: normal;
        font-style: normal;
    }
    * {
        font-family: NanumSquareRound, sans-serif;
        padding: 0;
        margin: 0;
        list-style: none;
        outline: none;
        text-decoration: none;
        box-sizing: border-box;
    }
`
