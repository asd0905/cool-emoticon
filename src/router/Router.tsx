import {Route, Routes} from 'react-router-dom';
import React from 'react';
import Main from '../pages/Main/Main';
import Header from '../components/Header/Header';

export default function Router(){
    return <>
        <Header />
        <Routes>
            <Route path={'/'} element={<Main />} />
        </Routes>
    </>
}
