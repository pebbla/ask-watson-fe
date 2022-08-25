import React, { useState, useEffect } from "react";
import GridLayout from "react-grid-layout";
import axios from "axios";
import Cafe from "./Cafe";
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

    return <div className="cafe-list-layout">
        {/* <GridLayout cols={12} rowHeight={30} width={1200}> */}
        {cafeListData.map((cafe) => {
            return <Cafe 
                key = {cafe.id}
                cafe = {cafe}
            />
        })}
        {/* </GridLayout> */}
    </div>
}

export default CafeList
