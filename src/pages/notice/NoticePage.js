import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import NoticeList from "../../components/notice/NoticeList.js";
import "./NoticePage.scss"

function NoticePage() {
    const [searchWord, setSearchWord] = useState("")
    const [searchTxt, setSearchTxt] = useState("");

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

    return <div className = "notice-page-layout">
        <div className="notice-search-section">
            <div className="notice-search-bar">
                <FontAwesomeIcon className="faMagnifyingGlass" icon={faMagnifyingGlass} />
                <input type="text" value={searchTxt} 
                    onChange={changeSearchTxt}
                    onKeyPress={onEnterKeyPressBlur}
                    placeholder = "공지 검색하기"
                /> 
            </div>
            <div className="notice-search-btn" onClick={()=>setSearchWord(searchTxt)}>
                <h1>검색</h1>
            </div>
        </div>
        <NavLink to={`/notices/new`}>
            <div className="add-notice-btn">
            
                <h2>+</h2>
            </div>
        </NavLink>
        <NoticeList key = {searchWord} searchWord={searchWord}/>
    </div>;
}

export default NoticePage;