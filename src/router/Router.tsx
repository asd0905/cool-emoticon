import {Route, Routes} from 'react-router-dom';
import React from 'react';
import Main from '../pages/Main/Main';
import Header from '../components/Header/Header';
import New from '../pages/New/New';
import {isBodyFixedAtom} from '../atoms/atom';
import {useRecoilValue} from 'recoil';

export default function Router(){
    const isBodyFixed = useRecoilValue(isBodyFixedAtom);
    return <div style={{position: isBodyFixed ? 'fixed': 'static', overflowX: 'hidden', width: '100%'}}>
        <Header />
        <div style={{marginTop: 110}}></div>
        <Routes>
            <Route path={'/'} element={<Main />} />
            <Route path={'/new'} element={<New />} />
        </Routes>
    </div>
}
