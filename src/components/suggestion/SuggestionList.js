import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SuggestionList.scss"
import Suggestion from "./Suggestion.js";

function SuggestionList({searchWord}) {
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    const [suggestionList, setSuggestionList] = useState([])

    useEffect(() => {getSuggestionList()}, [])

    async function getSuggestionList() {
        await axios
            .get("http://localhost:8080/v1/admin/suggestions?searchWord="+searchWord, config)
            .then(response => {
                var data = response.data['data']
                data.sort((a, b) => a.id - b.id);
                setSuggestionList(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            })
    };

    return <div className="suggestion-list-layout">
        <table className="suggestion-table">
            <thead >
                <tr>
                    <th>건의 ID</th>
                    <th>건의 일시</th>
                    <th>내용</th>
                    <th>카페</th>
                    <th>건의 처리</th>
                </tr>
            </thead>
            <tbody>
                {suggestionList.map(suggestion => {
                    return <Suggestion 
                        key = {suggestion.id}
                        suggestion={suggestion} 
                    />
                })}
            </tbody>
        </table>
    </div>
}

export default SuggestionList
