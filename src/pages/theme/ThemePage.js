import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ThemeList from "../../components/theme/ThemeList";
import "./ThemePage.scss"
import NewThemePopup from "../../components/theme/popup/NewThemePopup";

function ThemePage() {
    const [searchWord, setSearchWord] = useState("")
    const [searchTxt, setSearchTxt] = useState("");
    const [isModalOpen, setModalOpen] = useState(false)

    const openPopup = () => {
        setModalOpen(true)
    }

    const onClose = () => {
        setModalOpen(false)
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
        {/* <div className="add-theme-btn" onClick={openPopup}>
            <h2>+</h2>
        </div>
        <NewThemePopup onClose={onClose} isOpen={isModalOpen}/> */}
        <ThemeList key = {searchWord} searchWord={searchWord}/>
    </div>;
}

export default ThemePage;