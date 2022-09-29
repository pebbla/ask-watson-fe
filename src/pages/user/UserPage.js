import React, { useState } from "react";
import queryString from 'query-string';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import UserList from "../../components/user/UserList.js";
import "./UserPage.scss"

function UserPage() {
    const searchWordObj = queryString.parse(window.location.search);
    
    const [searchWord, setSearchWord] = useState(searchWordObj.searchWord)
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

    return <div className="user-page-layout">
        <div className="user-search-section">
            <div className="user-search-bar">
                <FontAwesomeIcon className="faMagnifyingGlass" icon={faMagnifyingGlass} />
                <input type="text" value={searchTxt} 
                    onChange={changeSearchTxt}
                    onKeyPress={onEnterKeyPressBlur}
                    placeholder = "회원 검색하기"
                /> 
            </div>
            <div className="user-search-btn" onClick={()=>setSearchWord(searchTxt)}>
                <h1>검색</h1>
            </div>
        </div>
        <UserList key = {searchWord} searchWord={searchWord}/>
    </div>
}

export default UserPage;
