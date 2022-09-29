import React, { useState, useEffect } from 'react'
import axios from "axios"
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "./UserPopup.scss"

function UserPopup({user, onClose, isOpen}) {
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    var date = (user.createdAt == null) ? " " : user.createdAt;
    date = date.substring(0, 10);
    
    const useConfirm = (message = null, onConfirm, onCancel) => {
        if (!onConfirm || typeof onConfirm !== "function") {
          return;
        }
        if (onCancel && typeof onCancel !== "function") {
          return;
        }
      
        const confirmAction = () => {
          if (window.confirm(message)) {
            onConfirm()
          } else {
            onCancel()
          }
        };
      
        return confirmAction;
    };

    async function deleteUserConfirm() {
        await deleteUser()
        window.location.reload()
    }

    const cancelConfirm = () => console.log("취소했습니다.")

    const confirmUserDelete = useConfirm(
        "회원을 정말 퇴출하시겠습니까?",
        deleteUserConfirm,
        cancelConfirm
    );

    async function deleteUser() {
        await axios
            .delete("http://localhost:8080/v1/users/" + user.id, config)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {console.error(error);});
    }

    return <Modal className='user-popup-screen' isOpen = {isOpen} ariaHideApp={false}>
        <div className='bg' onClick={onClose}>
            <div className='user-popup-layout' onClick={(e) => e.stopPropagation()}>
                <h1>회원 상세보기</h1>
                <FontAwesomeIcon className="faX" icon={faX} onClick={onClose}/>
                <div className='user-info'>
                <div className='user-info__part'>
                        <div className='user-info__title'>
                            <h2>회원 ID</h2> 
                            <h2>닉네임</h2> 
                            <h2>전화번호</h2>
                            <h2>생년월일</h2>
                            <h2>성별</h2>
                            <h2>마켓팅 동의 여부</h2>
                        </div>
                        <div className='user-info__content'>
                            <h2>{user.id}</h2>
                            <h2>{user.userNickname}</h2>
                            <h2>{user.userPhoneNum}</h2>
                            <h2>{user.userBirth}</h2>
                            <h2>{user.userGender === "F" ? "여" : "남"}</h2>
                            <h2>{user.marketingAgreeYn ? "동의" : "비동의"}</h2>
                        </div>
                    </div>
                    <div className='user-info__part'>
                        <div className='user-info__title'>
                            <h2>리뷰수</h2>
                            <h2>탈출수</h2>
                            <h2>신고당한 횟수</h2>
                            <h2>등록날짜</h2>
                        </div>
                        <div className='user-info__content'>
                            <h2>{user.reviewCount}</h2>
                            <h2>{user.escapeCompleteCount}</h2>
                            <h2>{user.reportedCount}</h2>
                            <h2>{date}</h2>
                        </div>
                    </div>
                </div>
                <div className="user-delete-btn" onClick={() => confirmUserDelete()}>
                    <h2>회원 퇴출하기</h2>
                </div>
            </div>
        </div>
    </Modal>
}

export default UserPopup;
