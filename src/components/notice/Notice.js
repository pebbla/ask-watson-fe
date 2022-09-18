import React, { useState } from "react";
import axios from "axios";
import { NavLink, Route } from 'react-router-dom';
import "./Notice.scss"

function Notice({notice}) {
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    var date = (notice.createdAt == null) ? " " : notice.createdAt;
    var content = (notice.content == null) ? " " : notice.content;
    date = date.substring(0, 10)
    if(content.length > 165) content = content.substring(0, 163) + "..."

    return <div className="notice-layout" >
        {/* <NavLink to={`/notices/info?cid=${notice.id}`}> */}
        <h1 className="notice-title">{notice.title}</h1>
        <h2 className="notice-date">{date}</h2>
        <h3 className="notice-content">{content}</h3>
        {/* </NavLink> */}
    </div>
}

export default Notice;