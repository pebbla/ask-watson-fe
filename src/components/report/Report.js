import React, { useState } from "react";
import "./Report.scss"
import ReportPopup from "./popup/ReportPopup.js";

function Report({report}) {
    var date = (report.createdAt == null) ? " " : report.createdAt;
                    date = date.substring(0, 10);
    const [isModalOpen, setModalOpen] = useState(false)

    const openPopup = () => {
        setModalOpen(true)
    }

    const onClose = () => {
        setModalOpen(false)
    }

    return <tr>
        <ReportPopup report={report} onClose={onClose} isOpen={isModalOpen}/>
        <td>{report.id}</td>
        <td className="report-contents">{report.content}</td>
        <td>{report.reportedUser.userNickname}</td>
        <td>{date}</td>
        <td className="handle-btns">{report.handledYn 
            ? <div className="handle-btn handled" onClick={openPopup}>
                <h2>처리완료</h2>
            </div>
            : <div className="handle-btn not-yet-handled" onClick={openPopup}>
                <h2>처리하기</h2>
            </div>}
        </td>
    </tr>
}

export default Report;
