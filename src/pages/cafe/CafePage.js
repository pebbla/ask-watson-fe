import React, { useState, useEffect } from "react";
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import CafeList from "../../components/cafe/CafeList.js";
import "./CafePage.scss"
import NewCafePopup from "../../components/cafe/popup/NewCafePopup.js";

function CafePage() {
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    const [searchWord, setSearchWord] = useState("")
    const [searchTxt, setSearchTxt] = useState("");
    const [isModalOpen, setModalOpen] = useState(false)
    const [locationMenus, setLocationMenus] = useState([])

    useEffect(() => {init()}, [])

    async function init() {
        getLocations();
    }

    async function openPopup () {
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

    async function getLocations() {
        await axios
        .get("http://localhost:8080/v1/locations", config)
        .then(response => {
            setLocationMenus(response.data['data']);
            console.log(response.data['data']);
        })
        .catch((error) => {
            console.error("ERROR: " + error);
        })
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
        <div className="add-cafe-btn" onClick={openPopup}>
            <h2>+</h2>
        </div>
        <NewCafePopup onClose={onClose} isOpen={isModalOpen} locations={locationMenus}/>
        <CafeList key = {searchWord} searchWord={searchWord} locations={locationMenus}/>
    </div>;
}

export default CafePage;