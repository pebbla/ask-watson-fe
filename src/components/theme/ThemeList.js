import React, { useState, useEffect } from "react";
import axios from "axios";
import Theme from "./Theme.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "./ThemeList.scss"

function ThemeList({searchWord}) {
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    const [themeList, setThemeList] = useState([])
    const [isSortedByUpdate, setSortByUpdate] = useState(false)

    useEffect(() => {getThemeList()}, [isSortedByUpdate])

    async function getThemeList() {
        if(isSortedByUpdate) {
            console.log("sortbyupdate true");
            await axios
            .get("http://localhost:8080/v1/admin/themes?searchWord="+searchWord+"&sortByUpdateYn=true", config)
            .then(response => {
                var data = response.data['data']
                setThemeList(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            })
        } else {
            console.log("sortbyupdate false");
            await axios
            .get("http://localhost:8080/v1/admin/themes?searchWord="+searchWord, config)
            .then(response => {
                var data = response.data['data']
                data.sort((a, b) => a.id - b.id);
                setThemeList(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            })
        }
    };

    return <div className="theme-list-layout">
        {isSortedByUpdate
            ? <div className="sort-btn" onClick={() => setSortByUpdate(false)}>
                <FontAwesomeIcon className="faCheckCircle" icon={faCheckCircle}/>
                <h6>수정 안된것 먼저 보기</h6>
            </div>
            : <div className="sort-btn" onClick={() => setSortByUpdate(true)}>
                <div className="circle" ></div>
                <h6>수정 안된것 먼저 보기</h6>
            </div>}
        <div className="theme-list">
        {themeList.map((theme) => {
            return <Theme 
                key = {theme.id}
                theme = {theme}
            />
        })}
        </div>
    </div>
}

export default ThemeList
