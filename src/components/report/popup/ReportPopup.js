import React from 'react'
import { NavLink } from 'react-router-dom';
import axios from "axios"
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "./ReportPopup.scss"

function ReportPopup({report, onClose, isOpen}) {
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };
    
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

    async function deleteReviewConfirm() {
        await deleteReview()
        await handleComplete()
        window.location.reload()
    }

    async function handleCompleteConfirm() {
        await handleComplete()
        window.location.reload()
    }

    const cancelConfirm = () => console.log("취소했습니다.")

    const confirmReviewDelete = useConfirm(
        "리뷰를 삭제하시겠습니까?",
        deleteReviewConfirm,
        cancelConfirm
    );

    const confirmHandleComplete = useConfirm(
        "신고 처리를 완료하시겠습니까?",
        handleCompleteConfirm,
        cancelConfirm
    );

    async function deleteReview() {
        await axios
            .delete("http://localhost:8080/v1/reviews/" + report.review.id, config)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {console.error(error);});
    }

    async function handleComplete() {
        await axios
        .patch("http://localhost:8080/v1/admin/reports/" + report.id + "?handledYn=true", {}, config)
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {console.error(error);});
    }

    async function goUserManagementScreen() {
    }

    return <Modal className='report-popup-screen' isOpen = {isOpen} ariaHideApp={false}>
        <div className='bg' onClick={onClose}>
            <div className='report-popup-layout' onClick={(e) => e.stopPropagation()}>
                <h1>신고 처리하기</h1>
                <NavLink to={`/users?searchWord=${report.reportedUser.userNickname}`}>
                    <div className="user-manage-btn" onClick={() => goUserManagementScreen()}>
                        <h4>회원 퇴출하러가기</h4>
                    </div>
                </NavLink>
                <FontAwesomeIcon className="faX" icon={faX} onClick={onClose}/>
                <div className='report-info border-bottom-lg'>
                    <div className='report-info__part'>
                        <div className='report-info__title'>
                            <h2>신고 ID</h2> 
                            <h2>신고당한 회원 ID</h2> 
                            <h2>신고당한 회원 닉네임</h2> 
                            <h2>방탈출 카페</h2> 
                        </div>
                        <div className='report-info__content'>
                            <h2>{report.id}</h2>
                            <h2>{report.reportedUser.id}</h2>
                            <h2>{report.reportedUser.userNickname}</h2>
                            <h2>{report.cafeName}</h2>
                        </div>
                    </div>
                    <div className='report-info__part'>
                        
                        <div className='report-info__title'>
                            <h2>ㅤ</h2>
                            <h2>신고한 회원 ID</h2> 
                            <h2>신고한 회원 닉네임</h2> 
                            <h2>방탈출 테마</h2> 
                        </div>
                        <div className='report-info__content'>
                            <h2>ㅤ</h2>
                            <h2>{report.reporter.id}</h2>
                            <h2>{report.reporter.userNickname}</h2>
                            <h2>{report.themeName}</h2>
                        </div>
                    </div>
                </div>
                <div className="report-content border-bottom-lg">
                    <h2>리뷰내용</h2>
                    <h6>{ report.review.content }</h6>
                </div>
                <div className="report-content">
                    <h2>신고내용</h2>
                    <h6>{ report.content }</h6>
                </div>
                <div className="report-popup-buttons">
                    {report.handledYn
                        ? <div className="btn unhandlable-btn" >
                            <h2>처리 완료</h2>
                        </div>
                        : <div className="btn handle-complete-btn" onClick={() => confirmHandleComplete()}>
                            <h2>처리 완료하기</h2>
                        </div>
                    }
                    {report.review == null
                        ? <div className="btn unhandlable-btn" >
                            <h2>리뷰 삭제 완료</h2>
                        </div>
                        : <div className="btn delete-review-btn" onClick={() => confirmReviewDelete()}>
                            <h2>리뷰 삭제하기</h2>
                        </div>
                    }
                </div>
            </div>
        </div>
    </Modal>
}

export default ReportPopup;
