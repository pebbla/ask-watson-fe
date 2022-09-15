import React, { useState, useEffect } from "react";
import axios from "axios";
import Theme from "./Theme.js";
import "./ThemeList.scss"

function ThemeList({searchWord}) {
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    const [themeList, setThemeList] = useState([])

    useEffect(() => {getThemeList()}, [])

    async function getThemeList() {
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
    };

    return <div className="theme-list-layout">
        {themeList.map((theme) => {
            return <Theme 
                key = {theme.id}
                theme = {theme}
            />
        })}
    </div>
}

export default ThemeList
