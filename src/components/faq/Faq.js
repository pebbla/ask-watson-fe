import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from 'react-router-dom';
import "./Faq.scss"

function Faq({faq}) {
    var title = (faq.title == null) ? " " : faq.title;
    var content = (faq.content == null) ? " " : faq.content;
    if(title.length > 77) title = title.substring(0, 75) + "..."
    if(content.length > 159) content = content.substring(0, 157) + "..."

    return <div className="faq-layout" >
        <FontAwesomeIcon className="faArrowRight" icon={faArrowRight} />
        <NavLink to={`/faqs/info?fid=${faq.id}`}>
        <div className="faq-title"><h1>Q. </h1><h2>{title}</h2></div>
        <div className="faq-content"><h1>A. </h1><h3>{content}</h3></div>
        </NavLink>
    </div>
}

export default Faq;