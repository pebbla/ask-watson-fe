import React, { useState } from "react";
import "./User.scss"
import UserPopup from "./popup/UserPopup.js";

function User({user}) {
    var date = (user.createdAt == null) ? " " : user.createdAt;
                    date = date.substring(0, 10);
    const [isModalOpen, setModalOpen] = useState(false)

    const openPopup = () => {
        setModalOpen(true)
    }

    const onClose = () => {
        setModalOpen(false)
    }

    return <tr>
        <UserPopup user={user} onClose={onClose} isOpen={isModalOpen}/>
        <td>{user.id}</td>
        <td>{user.userNickname}</td>
        <td>{user.userPhoneNum}</td>
        <td>{user.reportedCount}</td>
        <td>{user.reviewCount}</td>
        <td>{date}</td>
        <td className="handle-btns">
            <div className="user-info-btn" onClick={openPopup}>
                <h2>상세보기</h2>
            </div>
        </td>
    </tr>
}

export default User;
