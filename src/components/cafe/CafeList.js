import React, { useState, useEffect } from "react";
import axios from "axios";
import Cafe from "./Cafe";
import "./CafeList.scss"

function CafeList({searchWord}) {
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    const [cafeList, setCafeList] = useState([])

    useEffect(() => {getCafeList()}, [])

    async function getCafeList() {
        await axios
            .get("http://localhost:8080/v1/admin/cafes?searchWord="+searchWord, config)
            .then(response => {
                var data = response.data['data']
                data.sort((a, b) => a.id - b.id);
                setCafeList(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            })
    };

    

    return <div className="cafe-list-layout">
        {cafeList.map((cafe) => {
            return <Cafe 
                key = {cafe.id}
                cafe = {cafe}
            />
        })}
    </div>
}

export default CafeList
