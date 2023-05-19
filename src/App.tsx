import React from 'react';
import Router from './router/Router';
import {GlobalStyle, theme, themeDark} from './theme/theme';
import {ThemeProvider} from 'styled-components';
import {useRecoilValue} from 'recoil';
import {isDarkThemeAtom} from './atoms/atom';

function App() {
    const isDark = useRecoilValue(isDarkThemeAtom);
    return (
        <>
            <ThemeProvider theme={isDark ? themeDark : theme}>
                <GlobalStyle />
                <Router />
            </ThemeProvider>
        </>
    );
}

export default App;
