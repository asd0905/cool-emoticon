import React from 'react';
import Router from './router/Router';
import {GlobalStyle, theme} from './theme/theme';
import {ThemeProvider} from 'styled-components';

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Router />
            </ThemeProvider>
        </>
    );
}

export default App;
