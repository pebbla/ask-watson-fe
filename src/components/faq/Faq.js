import React, { useState } from "react";
import axios from "axios";
import { NavLink, Route } from 'react-router-dom';
import "./Faq.scss"

function Faq({faq}) {
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    var content = (faq.content == null) ? " " : faq.content;
    if(content.length > 159) content = content.substring(0, 157) + "..."

    return <div className="faq-layout" >
        {/* <NavLink to={`/faqs/info?cid=${faq.id}`}> */}
        <div className="faq-title"><h1>Q. </h1><h2>{faq.title}</h2></div>
        <div className="faq-content"><h1>A. </h1><h3>{content}</h3></div>
        {/* </NavLink> */}
    </div>
}

export default Faq;