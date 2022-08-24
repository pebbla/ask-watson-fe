import React from "react";
import CafeSearchBar from "../../components/searchbar/CafeSearchBar";
import CafeList from "../../components/cafe/CafeList";
import "./CafePage.scss"

function CafePage() {
    return <div className = "cafe-page-layout">
        <CafeSearchBar />
        <CafeList />
    </div>;
}

export default CafePage;