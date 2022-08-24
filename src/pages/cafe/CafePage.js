import React, { useState, useEffect } from "react";
import axios from "axios";
import CafeList from "../../components/cafe/CafeList";
import "./CafePage.scss"

function CafePage() {
    return <div className = "cafe-page-layout">
        <CafeList />
    </div>;
}

export default CafePage;