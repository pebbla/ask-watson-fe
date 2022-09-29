import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserList.scss"
import User from "./User.js";

function UserList({searchWord}) {
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    const [userList, setUserList] = useState([])

    useEffect(() => {getUserList()}, [])

    async function getUserList() {
        var url = "http://localhost:8080/v1/admin/users"
        if(searchWord == null) await axios
            .get(url, config)
            .then(response => {
                var data = response.data['data']
                data.sort((a, b) => a.id - b.id);
                setUserList(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            })
        else await axios
            .get(url+"?searchWord="+searchWord, config)
            .then(response => {
                var data = response.data['data']
                data.sort((a, b) => a.id - b.id);
                setUserList(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            })
    };

    return <div className="user-list-layout">
        <table className="user-table">
            <thead >
                <tr>
                    <th>회원 ID</th>
                    <th>닉네임</th>
                    <th>전화번호</th>
                    <th>신고당한 횟수</th>
                    <th>리뷰수</th>
                    <th>등록날짜</th>
                    <th>상세보기</th>
                </tr>
            </thead>
            <tbody>
                {userList.map(user => {
                    return <User 
                        key = {user.id}
                        user={user} 
                    />
                })}
            </tbody>
        </table>
    </div>
}

export default UserList
