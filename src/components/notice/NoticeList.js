import React, { useState, useEffect } from "react";
import axios from "axios";
import Notice from "./Notice.js";
import "./NoticeList.scss"

function NoticeList({searchWord}) {
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    const [noticeList, setNoticeList] = useState([])

    useEffect(() => {getNoticeList()}, [])

    async function getNoticeList() {
        await axios
            .get("http://localhost:8080/v1/notices?searchWord="+searchWord, config)
            .then(response => {
                var data = response.data['data']
                data.sort((a, b) => a.id - b.id);
                setNoticeList(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            })
    };

    return <div className="notice-list-layout">
        {noticeList.map((notice) => {
            return <Notice 
                key = {notice.id}
                notice = {notice}
            />
        })}
    </div>
}

export default NoticeList
