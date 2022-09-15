import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./CafeSearchBar.scss"

function onEnterKeyPressBlur(e) {
    if(e.key === 'Enter') {
        e.preventDefault();
        e.target.blur();
    }
}

function CafeSearchBar() {
    const [searchTxt, setSearchTxt] = useState("");

    function changeSearchTxt(e) {
        e.preventDefault();
        setSearchTxt(e.target.value);
    }

    return <div className="cafe-search-section">
        <div className="cafe-search-bar">
            <FontAwesomeIcon className="faMagnifyingGlass" icon={faMagnifyingGlass} />
            <input type="text" value={searchTxt} 
                onChange={changeSearchTxt}
                onKeyPress={onEnterKeyPressBlur}
                // onBlur={(e)=>onUpdateSearchTxt(e)}
                placeholder = "카페 검색하기"
            /> 
        </div>
        <div className="cafe-search-btn">
            <h1>검색</h1>
        </div>
    </div>
}

export default CafeSearchBar