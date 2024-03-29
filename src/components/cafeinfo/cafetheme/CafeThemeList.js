import React, { useState, useEffect } from "react";
import axios from "axios";
import CafeTheme from "./CafeTheme.js";
import NewThemePopup from "../../../components/theme/popup/NewThemePopup.js";
import "./CafeThemeList.scss"

function CafeThemeList({cafeId}) {
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    const [themeList, setThemeList] = useState([])
    const [isModalOpen, setModalOpen] = useState(false)
    const [categoryMenus, setCategoryMenus] = useState([])

    async function openPopup() {
        setModalOpen(true)
    }

    const onClose = () => {
        setModalOpen(false)
    }

    useEffect(() => {init()}, [])
    
    async function init() {
        getCategories()
        getCafeThemes()
    }

    async function getCategories() {
        await axios
        .get("http://localhost:8080/v1/categories", config)
        .then(response => {
            setCategoryMenus(response.data['data']);
            console.log(response.data['data']);
        })
        .catch((error) => {
            console.error("ERROR: " + error);
        })
    }

    async function getCafeThemes() {
        await axios
            .get("http://localhost:8080/v1/admin/cafes/" + cafeId + "/themes" , config)
            .then(response => {
                setThemeList(response.data['data']);
                console.log(response.data['data']);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            })
    }

    return <div className="cafe-info__themes">
        <div className="themes-info-title-section">
            <h1>테마정보</h1>
            <div className="add-theme-btn" onClick={openPopup}>
                <h2>테마 추가하기</h2>
            </div>
            <NewThemePopup cafeId={cafeId} onClose={onClose} isOpen={isModalOpen} categories={categoryMenus}/>
        </div>
        <div className="themes-info-list-section">
            {categoryMenus.length > 0&& themeList.map((theme) => {
                return <CafeTheme 
                    key = {theme.id}
                    theme = {theme}
                    categories={categoryMenus}
                />
            })}
        </div>

    </div>

}

export default CafeThemeList
