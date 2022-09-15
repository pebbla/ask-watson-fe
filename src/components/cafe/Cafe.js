import React, { useState } from "react";
import axios from "axios";
import { NavLink, Route } from 'react-router-dom';
import "./Cafe.scss"
function Cafe({cafe}) {
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    return <div className="cafe-layout">
        <NavLink to={`/cafes/info?cid=${cafe.id}`}>
        <h1 className="cafe-name">{cafe.id}. {cafe.cafeName}</h1>
        <div className="cafe-info-section">
            <div className="cafe-image"><img src={cafe.imageUrl} alt={cafe.cafeName} /></div>
            <div className="cafe-info">
                <div className="cafe-info__title">
                    <h2>전화번호</h2>
                    <h2>지역</h2>
                    <h2>별점</h2>
                    <h2>리뷰수</h2>
                    <h2>영어가능</h2>
                </div>
                <div className="cafe-info__content">
                    <h2>{cafe.cafePhoneNum}</h2>
                    <h2>{cafe.location.state} | {cafe.location.city}</h2>
                    <h2>{cafe.rating}</h2>
                    <h2>{cafe.reviewCount}</h2>
                    {cafe.englishPossible ? <h2>O</h2> : <h2>X</h2>}
                </div>
            </div>
        </div>
        </NavLink>
    </div>
}

export default Cafe;