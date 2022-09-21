import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Cafe from "./Cafe.js";
import "./CafeList.scss"

function CafeList({searchWord}) {
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    const [cafeList, setCafeList] = useState([])
    const [isSortedByUpdate, setSortByUpdate] = useState(true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {getCafeList()}, [isSortedByUpdate])

    async function getCafeList() {
        if(isSortedByUpdate) {
            console.log("sortbyupdate true");
            await axios
            .get("http://localhost:8080/v1/admin/cafes?searchWord="+searchWord+"&sortByUpdateYn=true", config)
            .then(response => {
                var data = response.data['data']
                setCafeList(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            })
        } else {
            console.log("sortbyupdate false");
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
        }
        
    };

    return <div className="cafe-list-layout">
        {isSortedByUpdate
            ? <div className="sort-btn" onClick={() => setSortByUpdate(false)}>
                <FontAwesomeIcon className="faCheckCircle" icon={faCheckCircle} />
                <h6>수정 안된것 먼저 보기</h6>
            </div>
            : <div className="sort-btn" onClick={() => setSortByUpdate(true)}>
                <div className="circle" ></div>
                <h6>수정 안된것 먼저 보기</h6>
            </div>}
        <div className="cafe-list">
        {cafeList.map((cafe) => {
            return <Cafe 
                key = {cafe.id}
                cafe = {cafe}
            />
        })}
        </div>
    </div>
}

export default CafeList
