import React, { useState, useEffect } from "react";
// import CafeSearchBar from "../../components/searchbar/CafeSearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import CafeList from "../../components/cafe/CafeList";
import "./CafePage.scss"

function CafePage() {
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

    return <div className = "cafe-page-layout">
        <div className="cafe-search-section">
            <div className="cafe-search-bar">
                <FontAwesomeIcon className="faMagnifyingGlass" icon={faMagnifyingGlass} />
                <input type="text" value={searchTxt} 
                    onChange={changeSearchTxt}
                    onKeyPress={onEnterKeyPressBlur}
                    placeholder = "카페 검색하기"
                /> 
            </div>
            <div className="cafe-search-btn" onClick={()=>setSearchWord(searchTxt)}>
                <h1>검색</h1>
            </div>
        </div>
        {/* <CafeList searchWord={searchWord}/> */}
        <CafeList key = {searchWord} searchWord={searchWord}/>
    </div>;
}

export default CafePage;