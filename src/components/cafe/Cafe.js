import React, { useState } from "react";
import axios from "axios";
import "./Cafe.scss"
function Cafe({cafe}) {
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    const openCafeInfoPage = async (cafeId) => {
        window.location.href = "/cafe-info";
            
    }


    return <div className="cafe-layout" onClick={()=>openCafeInfoPage(cafe.id)}>
        <h1 className="cafe-name">{cafe.id}. {cafe.cafeName}</h1>
        <div className="cafe-info-section">
            <div className="cafe-image">사진</div>
            <div className="cafe-info">
                <div className="cafe-info__title">
                    <h2>전화번호</h2>
                    <h2>지역</h2>
                    <h2>체인명</h2>
                    <h2>별점</h2>
                    <h2>리뷰수</h2>
                    <h2>영어가능</h2>
                </div>
                <div className="cafe-info__content">
                    <h2>{cafe.cafePhoneNum}</h2>
                    <h2>{cafe.location.state} | {cafe.location.city}</h2>
                    <h2>{cafe.company.companyName}</h2>
                    <h2>{cafe.rating}</h2>
                    <h2>{cafe.reviewCount}</h2>
                    {cafe.englishPossible ? <h2>O</h2> : <h2>X</h2>}
                </div>
                
            </div>
        </div>
        {/* {id}, {cafeName}, {cafePhoneNum}, {isEnglishPossible}, {website}, {address}, {rating}, {reviewCount}, {companyId}, {locationId} */}
    </div>
}

// Cafe.propTypes = {
//     id: PropTypes.number.isRequired,
//     cafeName: PropTypes.string,
//     cafePhoneNum: PropTypes.string,
//     isEnglishPossible: PropTypes.bool,
//     website: PropTypes.string,
//     address: PropTypes.string,
//     rating: PropTypes.number,
//     reviewCount: PropTypes.number,
//     companyId: PropTypes.number,
//     locationId: PropTypes.number
// };

export default Cafe;