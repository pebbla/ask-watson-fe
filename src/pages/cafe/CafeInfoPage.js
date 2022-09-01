import React, { useState, useEffect } from "react"
import axios from "axios"
import queryString from 'query-string';
import CafeInfo from "../../components/cafeinfo/CafeInfo";
import CafeThemeList from "../../components/cafeinfo/CafeThemeList";
import "./CafeInfoPage.scss"

function CafeInfoPage() {
    const cafeIdObj = queryString.parse(window.location.search);

    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    const [cafe, setCafe] = useState(null)

    useEffect(() => {getCafeInfo()}, [])

    async function getCafeInfo() {
        await axios
            .get("http://localhost:8080/v1/cafes/"+ cafeIdObj.cid, config)
            .then(response => {
                setCafe(response.data['data']);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            })
    }

    return <div className = "cafe-info-page-layout">
        { cafe!==null 
        ? <CafeInfo cafe = {cafe} />
        : <div></div>}
        <CafeThemeList cafeId = {cafeIdObj.cid} />
    </div>;
}

export default CafeInfoPage;