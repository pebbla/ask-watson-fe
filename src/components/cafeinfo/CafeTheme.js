import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./CafeTheme.scss"

function CafeTheme({theme}) {
    
    return <div className="cafe-info-theme-layout">
        <div className="theme-title-section">
            <h1>{theme.themeName}</h1>
            <FontAwesomeIcon className="faArrowRight" icon={faArrowRight} />
        </div>
    </div>
}

export default CafeTheme
