import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReportList.scss"

function ReportList({searchWord}) {
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    const [reportList, setReportList] = useState([])

    useEffect(() => {getReportList()}, [])

    async function getReportList() {
        await axios
            .get("http://localhost:8080/v1/admin/reports?searchWord="+searchWord, config)
            .then(response => {
                var data = response.data['data']
                data.sort((a, b) => a.id - b.id);
                setReportList(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            })
    };

    return <div className="report-list-layout">
        <table className="report-table">
            <thead >
                <tr>
                    <th>신고 ID</th>
                    <th>내용</th>
                    <th>신고당한 회원</th>
                    <th>신고 일시</th>
                    <th>신고 처리</th>
                </tr>
            </thead>
            <tbody>
                {reportList.map(report => {
                    var date = (report.createdAt == null) ? " " : report.createdAt;
                    date = date.substring(0, 10);

                    return <tr>
                        <td>{report.id}</td>
                        <td>{report.content}</td>
                        <td>{report.reportedUser.userNickname}</td>
                        <td>{date}</td>
                        <td>{report.handledYn ? "처리완료" : "처리하기"}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}

export default ReportList
