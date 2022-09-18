import React, { useState, useEffect } from "react";
import axios from "axios";
import Faq from "./Faq.js";
import "./FaqList.scss"

function FaqList({searchWord}) {
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    const [faqList, setFaqList] = useState([])

    useEffect(() => {getFaqList()}, [])

    async function getFaqList() {
        await axios
            .get("http://localhost:8080/v1/faqs?searchWord="+searchWord, config)
            .then(response => {
                var data = response.data['data']
                data.sort((a, b) => a.id - b.id);
                setFaqList(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            })
    };

    return <div className="faq-list-layout">
        {faqList.map((faq) => {
            return <Faq 
                key = {faq.id}
                faq = {faq}
            />
        })}
    </div>
}

export default FaqList
