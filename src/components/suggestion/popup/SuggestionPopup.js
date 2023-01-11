import React from 'react'
import { NavLink } from 'react-router-dom';
import axios from "axios"
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "./SuggestionPopup.scss"

function SuggestionPopup({suggestion, onClose, isOpen}) {
    var date = (suggestion.createdAt == null) ? " " : suggestion.createdAt;
    date = date.substring(0, 10);
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

    async function deleteSuggestionConfirm() {
        await deleteSuggestion()
        await handleComplete()
        window.location.reload()
    }

    async function handleCompleteConfirm() {
        await handleComplete()
        window.location.reload()
    }

    const cancelConfirm = () => console.log("취소했습니다.")

    const confirmSuggestionDelete = useConfirm(
        "건의를 삭제하시겠습니까?",
        deleteSuggestionConfirm,
        cancelConfirm
    );

    const confirmHandleComplete = useConfirm(
        "건의 처리를 완료하시겠습니까?",
        handleCompleteConfirm,
        cancelConfirm
    );

    async function deleteSuggestion() {
        await axios
            .delete("http://localhost:8080/v1/admin/suggestions/" + suggestion.id, config)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {console.error(error);});
    }

    async function handleComplete() {
        await axios
        .patch("http://localhost:8080/v1/admin/suggestions/" + suggestion.id + "?handledYn=true", {}, config)
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {console.error(error);});
    }

    async function goUserManagementScreen() {
    }

    return <Modal className='suggestion-popup-screen' isOpen = {isOpen} ariaHideApp={false}>
        <div className='bg' onClick={onClose}>
            <div className='suggestion-popup-layout' onClick={(e) => e.stopPropagation()}>
                <h1>건의 처리하기</h1>
                <NavLink to={`/cafes/info?cid=${suggestion.cafeId}`}>
                    <div className="user-manage-btn" onClick={() => goUserManagementScreen()}>
                        <h4>카페로 이동하기</h4>
                    </div>
                </NavLink>
                <FontAwesomeIcon className="faX" icon={faX} onClick={onClose}/>
                <div className='suggestion-info border-bottom-lg'>
                    <div className='suggestion-info__part'>
                        <div className='suggestion-info__title'>
                            <h2>건의 ID</h2> 
                            <h2>건의 일시</h2> 
                            <h2>방탈출 카페</h2> 
                            <h2>건의한 회원</h2> 
                        </div>
                        <div className='suggestion-info__content'>
                            <h2>{suggestion.id}</h2>
                            <h2>{date}</h2>
                            <h2>[{suggestion.cafeId}] {suggestion.cafeName}</h2>
                            <h2>[{suggestion.userId}] {suggestion.userNickname}</h2>
                        </div>
                    </div>
                </div>
                <div className="suggestion-content border-bottom-lg">
                    <h2>건의 내용</h2>
                    <h6>{ suggestion.content }</h6>
                </div>
                <div className="suggestion-popup-buttons">
                    <div className="btn delete-review-btn" onClick={() => confirmSuggestionDelete()}>
                        <h2>건의 삭제하기</h2>
                    </div>
                    {suggestion.handledYn
                        ? <div className="btn unhandlable-btn" >
                            <h2>처리 완료</h2>
                        </div>
                        : <div className="btn handle-complete-btn" onClick={() => confirmHandleComplete()}>
                            <h2>처리 완료하기</h2>
                        </div>
                    }
                </div>
            </div>
        </div>
    </Modal>
}

export default SuggestionPopup;
