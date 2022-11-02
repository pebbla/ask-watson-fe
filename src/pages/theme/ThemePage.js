import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ThemeList from "../../components/theme/ThemeList.js";
import "./ThemePage.scss"

function ThemePage() {
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    const [searchWord, setSearchWord] = useState("")
    const [searchTxt, setSearchTxt] = useState("");
    const [categoryMenus, setCategoryMenus] = useState([])

    useEffect(() => {init()}, [])
    
    async function init() {
        getCategories()
    }

    async function getCategories() {
        await axios
        .get("http://localhost:8080/v1/categories", config)
        .then(response => {
            setCategoryMenus(response.data['data']);
        })
        .catch((error) => {
            console.error("ERROR: " + error);
        })
    }

    function changeSearchTxt(e) {
        e.preventDefault();
        setSearchTxt(e.target.value);
    }

    function onEnterKeyPressBlur(e) {
        if(e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
            setSearchWord(searchTxt)
        }
    }

    return <div className = "theme-page-layout">
        <div className="theme-search-section">
            <div className="theme-search-bar">
                <FontAwesomeIcon className="faMagnifyingGlass" icon={faMagnifyingGlass} />
                <input type="text" value={searchTxt} 
                    onChange={changeSearchTxt}
                    onKeyPress={onEnterKeyPressBlur}
                    placeholder = "테마 검색하기"
                /> 
            </div>
            <div className="theme-search-btn" onClick={()=>setSearchWord(searchTxt)}>
                <h1>검색</h1>
            </div>
        </div>
        <ThemeList key = {searchWord} searchWord={searchWord} categories={categoryMenus}/>
    </div>;
}

export default ThemePage;