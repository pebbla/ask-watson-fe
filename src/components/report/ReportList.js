import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReportList.scss"
import Report from "./Report.js";

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
                    return <Report 
                        key = {report.id}
                        report={report} 
                    />
                })}
            </tbody>
        </table>
    </div>
}

export default ReportList
