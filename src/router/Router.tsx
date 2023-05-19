import {Route, Routes, useMatch} from 'react-router-dom';
import React from "react";
import Main from "../pages/Main/Main";
import Header from "../components/Header/Header";
import New from "../pages/New/New";
import { isBodyFixedAtom } from "../atoms/atom";
import { useRecoilValue } from "recoil";
import { COOL_EMOTICON_BASE_PATH } from "../app.constant";
import Detail from "../pages/Detail/Detail";

export default function Router() {
	const isBodyFixed = useRecoilValue(isBodyFixedAtom);
	const detailMatch = useMatch(`${COOL_EMOTICON_BASE_PATH}/detail/:id`);
	return (
		<div
			style={{
				position: isBodyFixed ? "fixed" : "static",
				overflowX: "hidden",
				width: "100%",
			}}
		>
			<Header />
			<div style={{ marginTop: detailMatch ? 60 : 110 }}></div>
			<Routes>
				<Route path={`/`} element={<Main />} />
				<Route path={`/${COOL_EMOTICON_BASE_PATH}`} element={<Main />} />
				<Route path={`/${COOL_EMOTICON_BASE_PATH}/new`} element={<New />} />
				<Route
					path={`/${COOL_EMOTICON_BASE_PATH}/detail/:emoticonName`}
					element={<Detail />}
				/>
			</Routes>
		</div>
	);
}
