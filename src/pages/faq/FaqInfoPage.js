import React, { useState, useEffect } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom"
import queryString from 'query-string';
import "./FaqInfoPage.scss"

function FaqInfoPage() {
    const faqIdObj = queryString.parse(window.location.search);

    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    let navigate = useNavigate();
    const [faq, setFaq] = useState(null)

    const [titleTxt, setTitleTxt] = useState("")
    const [contentTxt, setContentTxt] = useState("");

    function changeTxt(e, txtSetter) {
        e.preventDefault();
        txtSetter(e.target.value);
    }

    function onEnterKeyPressBlur(e) {
        if(e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    }

    useEffect(() => {getFaqInfo()}, [])

    async function getFaqInfo() {
        await axios
            .get("http://localhost:8080/v1/faqs/"+ faqIdObj.fid, config)
            .then(response => {
                console.log(response.data['data'])
                setFaq(response.data['data']);
                setTitleTxt(response.data['data'].title)
                setContentTxt(response.data['data'].content)
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            })
    }

    async function modifyFaq() {
        if(titleTxt === "") window.alert("제목을 입력해주세요.")
        else if(contentTxt === "") window.alert("내용을 입력해주세요.")
        else await axios
            .put("http://localhost:8080/v1/admin/faqs/"+faq.id,
            {
                title: titleTxt,
                content: contentTxt
            }, config)
            .then((response) => {
                window.location.replace("/faqs");
                console.log(response.data['data']);
            })
            .catch((error) => {console.error(error);});
    }

    async function deleteFaq() {
        await axios
            .delete("http://localhost:8080/v1/admin/faqs/" + faq.id, config)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {console.error(error);});
    }

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
            navigate(-1)
          } else {
            onCancel()
          }
        };
      
        return confirmAction;
    };

    async function deleteConfirm() {
        deleteFaq()
    }
    const cancelConfirm = () => console.log("취소했습니다.")

    const confirmDelete = useConfirm(
        "FAQ를 삭제하시겠습니까?",
        deleteConfirm,
        cancelConfirm
    );

    return <div className = "faq-info-page-layout">
        <h1 className="page-title">FAQ 수정</h1>
        { faq != null
        ? <><div className="title-section">
                <h1>제목</h1>
                <input type="text" value={titleTxt}
                    onChange={(e) => changeTxt(e, setTitleTxt)}
                    onKeyPress={onEnterKeyPressBlur}
                    placeholder="제목을 입력해주세요" 
                    maxLength={255} />
            </div><div className="content-section">
                    <h1>내용</h1>
                    <textarea value={contentTxt}
                        onChange={(e) => changeTxt(e, setContentTxt)}
                        onKeyPress={onEnterKeyPressBlur}
                        placeholder="내용을 입력해주세요"
                        maxLength={2000} />
                </div><div className="btns">
                    <div className="delete-btn faq-btn" onClick={() => confirmDelete()}>
                        <h1>FAQ 삭제</h1>
                    </div>
                    <div className="modify-btn faq-btn" onClick={() => modifyFaq()}>
                        <h1>FAQ 수정</h1>
                    </div>
                </div></>
        : <div></div>}
    </div>;
}

export default FaqInfoPage;