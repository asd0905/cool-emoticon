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
        darker: "#e5e5e5",
    },
}

export const themeDark: DefaultTheme = {
    red: "#E51013",
    black: {
        deepDark: "#141414",
        darker: "#181818",
        lighter: "#2F2F2F",
    },
    white: {
        lighter: "#fff",
        darker: "#e5e5e5",
    },
}

export const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        list-style: none;
        outline: none;
        text-decoration: none;
    }
`
