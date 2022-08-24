import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function Cafe({id, cafeName, cafePhoneNum, isEnglishPossible, website, address, rating, reviewCount, companyId, locationId}) {
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    return <div className="cafe-layout">
        {id}, {cafeName}, {cafePhoneNum}, {isEnglishPossible}, {website}, {address}, {rating}, {reviewCount}, {companyId}, {locationId}
    </div>
}

Cafe.propTypes = {
    id: PropTypes.number.isRequired,
    cafeName: PropTypes.string,
    cafePhoneNum: PropTypes.string,
    isEnglishPossible: PropTypes.bool,
    website: PropTypes.string,
    address: PropTypes.string,
    rating: PropTypes.number,
    reviewCount: PropTypes.number,
    companyId: PropTypes.number,
    locationId: PropTypes.number
};

export default Cafe;