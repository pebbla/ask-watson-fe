import React, { useState, useEffect } from "react";
import axios from "axios";
import Cafe from "./Cafe";
import CafeSearchBar from "../searchbar/CafeSearchBar"
import "./CafeList.scss"

function CafeList() {
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    const [cafeListData, setCafeListData] = useState([])

    useEffect(() => {getCafeList()}, [])

    async function getCafeList() {
        await axios
            .get("http://localhost:8080/v1/cafes", config)
            .then(response => {
                setCafeListData(response.data['content']);
                console.log(response.data['content']);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            })
    };

    return <div className="cafe-list__layout">
        <CafeSearchBar />
        {cafeListData.map((cafe) => {
            return <Cafe 
                key = {cafe.id}
                id = {cafe.id}
                cafeName = {cafe.cafeName}
                cafePhoneNum = {cafe.cafePhoneNum}
                isEnglishPossible = {cafe.isEnglishPossible}
                website = {cafe.website}
                address = {cafe.address}
                rating = {cafe.rating}
                reviewCount = {cafe.reviewCount}
                companyId = {cafe.company.id}
                locationId = {cafe.location.id}
            />
        })}
    </div>
}

export default CafeList
