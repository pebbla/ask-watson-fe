import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Cafe.scss"

function Cafe() {
    const [cafeList, setCafeList] = useState([])

    var config = {
        headers: { 'Content-Type': 'application/json' }
      };

    useEffect(() => {
        getCafeList();
    }, []);

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

    return <div className = "cafe-layout">
        <div className="search-section">

        </div>
        <div className="cafe-list-section">
            <h1 onClick={() => getCafeList()}>getCafeList</h1>
        </div>
    </div>;
}

export default Cafe;