import React, { useState, useEffect } from "react";
import axios from "axios";
import CafeTheme from "./CafeTheme";
import NewThemePopup from "../../theme/NewThemePopup";
import "./CafeThemeList.scss"

function CafeThemeList({cafeId}) {
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    const [themeList, setThemeList] = useState([])

    const [isModalOpen, setModalOpen] = useState(false)

    const openPopup = () => {
        setModalOpen(true)
    }

    const onClose = () => {
        setModalOpen(false)
    }

    useEffect(() => {getCafeThemes()}, [])

    async function getCafeThemes() {
        await axios
            .get("http://localhost:8080/v1/cafes/" + cafeId + "/themes" , config)
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
            <NewThemePopup cafeId={cafeId} onClose={onClose} isOpen={isModalOpen}/>
        </div>
        <div className="themes-info-list-section">
            {themeList.map((theme) => {
                return <CafeTheme 
                    key = {theme.id}
                    theme = {theme}
                />
            })}
        </div>

    </div>

}

export default CafeThemeList
