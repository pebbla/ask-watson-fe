import React, { useState, useEffect } from "react"
import axios from "axios"
import queryString from 'query-string';
import CafeInfo from "../../components/cafeinfo/CafeInfo.js";
import CafeThemeList from "../../components/cafeinfo/cafetheme/CafeThemeList.js";
import "./CafeInfoPage.scss"

function CafeInfoPage() {
    const cafeIdObj = queryString.parse(window.location.search);

    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    const [cafe, setCafe] = useState(null)
    const [locationMenus, setLocationMenus] = useState([])

    useEffect(() => {init()}, [])
    
    async function init() {
        getLocations()
        getCafeInfo()
    }

    async function getLocations() {
        await axios
        .get("http://localhost:8080/v1/locations", config)
        .then(response => {
            setLocationMenus(response.data['data']);
        })
        .catch((error) => {
            console.error("ERROR: " + error);
        })
    }

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
        ? <CafeInfo cafe = {cafe} locations={locationMenus}/>
        : <div></div>}
        <CafeThemeList cafeId = {cafeIdObj.cid}/>
    </div>;
}

export default CafeInfoPage;