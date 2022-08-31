import React, { useState, useEffect } from "react";
import axios from "axios";
import Cafe from "./Cafe";
import "./CafeList.scss"

function CafeList() {
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    const [cafeList, setCafeList] = useState([])

    useEffect(() => {getCafeList()}, [])

    async function getCafeList() {
        await axios
            .get("http://localhost:8080/v1/cafes", config)
            .then(response => {
                setCafeList(response.data['content']);
                console.log(response.data['content']);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            })
    };

    return <div className="cafe-list-layout">
        {/* <GridLayout cols={12} rowHeight={30} width={1200}> */}
        {cafeList.map((cafe) => {
            return <Cafe 
                key = {cafe.id}
                cafe = {cafe}
            />
        })}
        {/* </GridLayout> */}
    </div>
}

export default CafeList
