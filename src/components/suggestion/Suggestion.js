import React, { useState } from "react";
import "./Suggestion.scss"
import SuggestionPopup from "./popup/SuggestionPopup.js";

function Suggestion({suggestion}) {
    var date = (suggestion.createdAt == null) ? " " : suggestion.createdAt;
    date = date.substring(0, 10);
    const [isModalOpen, setModalOpen] = useState(false)

    const openPopup = () => {
        setModalOpen(true)
    }

    const onClose = () => {
        setModalOpen(false)
    }

    return <tr>
        <SuggestionPopup suggestion={suggestion} onClose={onClose} isOpen={isModalOpen}/>
        <td>{suggestion.id}</td>
        <td>{date}</td>
        <td className="suggestion-contents">{suggestion.content}</td>
        <td>[{suggestion.cafeId}] {suggestion.cafeName}</td>
        <td className="handle-btns">{suggestion.handledYn 
            ? <div className="handle-btn handled" onClick={openPopup}>
                <h2>처리완료</h2>
            </div>
            : <div className="handle-btn not-yet-handled" onClick={openPopup}>
                <h2>처리하기</h2>
            </div>}
        </td>
    </tr>
}

export default Suggestion;
