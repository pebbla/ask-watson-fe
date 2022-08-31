import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPencil } from "@fortawesome/free-solid-svg-icons";
import "./CafeInfo.scss"

function CafeInfo({cafeId}) {
    console.log("cafeId"+cafeId)
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    const [cafe, setCafe] = useState(null)
    
    useEffect(() => {getCafeInfo()}, [])

    async function getCafeInfo() {
        console.log(cafeId)
        await axios
            .get("http://localhost:8080/v1/cafes/"+cafeId, config)
            .then(response => {
                setCafe(response.data['data']);
                
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            })
    }

    return cafe != null 
    ? <div className="cafe-info-layout">
        <div className="image-section">
            <img src={cafe.imageUrl} alt={cafe.cafeName} />
            <FontAwesomeIcon className="faArrowLeft" icon={faArrowLeft} />
        </div>
        <div className="cafe-title-section mg_left mg_right">
            <h1>{cafe.cafeName}</h1>
            <FontAwesomeIcon className="faPencil" icon={faPencil} />
        </div>
        <div className="cafe-info-section mg_left mg_right">
            <div className="cafe-info__title">
                <h2>전화번호</h2>
                <h2>지역</h2>
                <h2>체인명</h2>
                <h2>별점</h2>
                <h2>영어가능</h2>
                <h2>주소</h2>
            </div>
            <div className="cafe-info__content">
                <h2>{cafe.cafePhoneNum}</h2>
                <h2>{cafe.location.state} | {cafe.location.city}</h2>
                <h2>{cafe.company.companyName}</h2>
                <h2>{cafe.rating}</h2>
                {cafe.englishPossible ? <h2>O</h2> : <h2>X</h2>}
                <h2>{cafe.address}</h2>
            </div>
        </div>
        <div className="cafe-website-btn" onClick={() => window.open(cafe.website, '_blank')}>
            <h6>웹사이트로 이동</h6>
        </div>
    </div>
    : <div></div>
}

export default CafeInfo
