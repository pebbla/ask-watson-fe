import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { NavLink, Route } from 'react-router-dom';
import "./Notice.scss"

function Notice({notice}) {
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    var date = (notice.createdAt == null) ? " " : notice.createdAt;
    var title = (notice.title == null) ? " " : notice.title;
    var content = (notice.content == null) ? " " : notice.content;
    date = date.substring(0, 10)
    if(title.length > 81) title = title.substring(0, 79) + "..."
    if(content.length > 165) content = content.substring(0, 163) + "..."

    return <div className="notice-layout" >
        <FontAwesomeIcon className="faArrowRight" icon={faArrowRight} />
        <NavLink to={`/notices/info?nid=${notice.id}`}>
            <h1 className="notice-title">{title}</h1>
            <h2 className="notice-date">{date}</h2>
            <h3 className="notice-content">{content}</h3>
        </NavLink>
    </div>
}

export default Notice;