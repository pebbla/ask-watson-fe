import React, { useState } from "react";
import axios from "axios"
import "./NewFaqPage.scss"

function NewFaqPage() {
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

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

    async function addFaq() {
        if(titleTxt === "") window.alert("제목을 입력해주세요.")
        else if(contentTxt === "") window.alert("내용을 입력해주세요.")
        else await axios
            .post("http://localhost:8080/v1/admin/faqs",
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

    return <div className = "new-faq-page-layout">
        <h1 className="page-title">FAQ 등록</h1>
        <div className="title-section">
            <h1>제목</h1>
            <input type="text" value={ titleTxt } 
                onChange={(e) => changeTxt(e, setTitleTxt)} 
                onKeyPress={onEnterKeyPressBlur}
                placeholder = "제목을 입력해주세요"
                maxLength={255}
                />
        </div>
        <div className="content-section">
            <h1>내용</h1>
            <textarea value={ contentTxt } 
                onChange={(e) => changeTxt(e, setContentTxt)} 
                onKeyPress={onEnterKeyPressBlur}
                placeholder = "내용을 입력해주세요"
                maxLength={2000}
                />
        </div>
        <div className="add-faq-btn" onClick={() => addFaq()}>
            <h1>FAQ 등록</h1>
        </div>
    </div>;
}

export default NewFaqPage;