import React from "react";
import queryString from 'query-string';
import CafeInfo from "../../components/cafeinfo/CafeInfo";
import CafeThemeList from "../../components/cafeinfo/CafeThemeList";
import "./CafeInfoPage.scss"

function CafeInfoPage() {
    const cafeIdObj = queryString.parse(window.location.search);

    return <div className = "cafe-info-page-layout">
        <CafeInfo cafeId = {cafeIdObj.cid} />
        <CafeThemeList cafeId = {cafeIdObj.cid} />
    </div>;
}

export default CafeInfoPage;