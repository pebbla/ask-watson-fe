import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import FaqList from "../../components/faq/FaqList.js";
import "./FaqPage.scss"

function FaqPage() {
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

    return <div className = "faq-page-layout">
        <div className="faq-search-section">
            <div className="faq-search-bar">
                <FontAwesomeIcon className="faMagnifyingGlass" icon={faMagnifyingGlass} />
                <input type="text" value={searchTxt} 
                    onChange={changeSearchTxt}
                    onKeyPress={onEnterKeyPressBlur}
                    placeholder = "FAQ 검색하기"
                /> 
            </div>
            <div className="faq-search-btn" onClick={()=>setSearchWord(searchTxt)}>
                <h1>검색</h1>
            </div>
        </div>
        <NavLink to={`/faqs/new`}>
            <div className="add-faq-btn">
            
                <h2>+</h2>
            </div>
        </NavLink>
        <FaqList key = {searchWord} searchWord={searchWord}/>
    </div>;
}

export default FaqPage;