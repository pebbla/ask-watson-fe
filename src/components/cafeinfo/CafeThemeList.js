import React, { useState, useEffect } from "react";
import axios from "axios";
import CafeTheme from "./CafeTheme";
import "./CafeThemeList.scss"

function CafeThemeList({cafeId}) {
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    const [themeList, setThemeList] = useState([])

    useEffect(() => {getCafeThemes()}, [])

    async function getCafeThemes() {
        await axios
            .get("http://localhost:8080/v1/cafes/" + cafeId + "/themes" , config)
            .then(response => {
                setThemeList(response.data['dataList']);
                console.log(response.data['dataList']);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            })
    }

    return <div className="cafe-info__themes">
        <div className="themes-info-title-section">
            <h1>테마정보</h1>
            <div className="add-theme-btn">
                <h2>테마 추가하기</h2>
            </div>
        </div>
        <div className="themes-info-list-section">
            {themeList.map((theme) => {
                return <CafeTheme 
                    key = {theme.id}
                    theme = {theme}
                />
            })}
        </div>

    </div>

}

export default CafeThemeList
