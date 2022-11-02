import React, { useState } from 'react'
import axios from "axios"
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "./NewThemePopup.scss"

function onEnterKeyPressBlur(e) {
    if(e.key === 'Enter') {
        e.preventDefault();
        e.target.blur();
    }
}

function CategorySelectBox({categories, handleChange}) {
    
    return (
		<select onChange={handleChange} defaultValue={'선택'}>
            <option value="선택" disabled hidden>선택</option>
			{categories.map((category) => (
				<option
					key={category.id}
					value={category.id}
				>
					{category.categoryName}
				</option>
			))}
		</select>
	)
}

function NewThemePopup({cafeId, onClose, isOpen, categories}) {
    const [themeNameTxt, setThemeNameTxt] = useState("")
    const [themeCategoryId, setThemeCategoryId] = useState()
    const [themeExplanationTxt, setThemeExplanationTxt] = useState("")
    const [themeTimeLimit, setThemeTimeLimit] = useState()
    const [themeMinNumPeople, setThemeMinNumPeople] = useState(2)
    const [themePrice, setThemePrice] = useState()
    const [themeReservationUrlTxt, setThemeReservationUrlTxt] = useState("")
    const [themeImageUrl, setThemeImageUrl] = useState("")
    const [themeImageFile, setThemeImageFile] = useState(null)
    const [themeAvailable, setThemeAvailable] = useState(true);

    const handleChangeOnLocationSelectBox = (e) => {
        setThemeCategoryId(e.target.value)
    }

    async function addTheme() {
        if(themeNameTxt === "") window.alert("테마 제목을 입력해주세요.")
        else if(themeCategoryId == null) window.alert("카테고리를 선택해주세요.")
        else if(themeTimeLimit == null) window.alert("제한시간을 입력해주세요.")
        else if(themePrice == null) window.alert("가격을 입력해주세요.")
        else {
            let formData = new FormData()

            let jsonData = {
                themeName: themeNameTxt,
                themeExplanation: themeExplanationTxt,
                categoryId: themeCategoryId,
                timeLimit: themeTimeLimit,
                minNumPeople: themeMinNumPeople,
                price: themePrice,
                reservationUrl: themeReservationUrlTxt,
                imageUrl: "",
                isAvailable: themeAvailable
            }

            formData.append("params", new Blob([JSON.stringify(jsonData)], {type: "application/json"}))
            formData.append("file", themeImageFile)

            await axios
            .post("http://localhost:8080/v1/admin/cafes/" + cafeId + "/themes", formData)
            .then((response) => {
                window.location.reload();
                console.log(response.data['data']);
            })
            .catch((error) => {console.error(error);});
        }
    }

    function changeTxt(e, txtSetter) {
        e.preventDefault();
        txtSetter(e.target.value);
    }

    const setThumbnail = (e) => {
        setThemeImageUrl(URL.createObjectURL(e.target.files[0]))
        setThemeImageFile(e.target.files[0])
    };

    const handleChangeOnAvailabilityRadioBtn = (e) => {
        setThemeAvailable(e.target.value === "가능")
    }

    return <Modal className='new-theme-popup-screen' isOpen = {isOpen} ariaHideApp={false}>
        <div className='bg' onClick={onClose}>
            <div className='theme-popup-layout' onClick={(e) => e.stopPropagation()}>
                <FontAwesomeIcon className="faX" icon={faX} onClick={onClose}/>
                <div className="theme-name"><input type="text" value={ themeNameTxt } 
                    onChange={(e) => changeTxt(e, setThemeNameTxt)} 
                    onKeyPress={onEnterKeyPressBlur}
                    placeholder="테마 제목을 입력해주세요."/></div>
                <div className="image-bg">
                <div className="file-uploader-layout">
                    <input type="file" name="image_file" onChange={setThumbnail}></input>
                </div>
                    { themeImageUrl !== "" ? <img className="theme-image" src={themeImageUrl} alt={themeNameTxt} /> : <div></div>}
                </div>
                <div className="theme-changable-info">
                    <div className="theme-info__title">
                        <h2>카테고리</h2>
                        <h2>제한시간</h2>
                        <h2>최소인원수</h2>
                        <h2>가격</h2>
                        <h2>예약 URL</h2>
                        <h2>이용가능</h2>
                        <h2>테마설명</h2>
                    </div>
                    <div className="theme-info__inputs">
                        <div className="editing-theme__input"><CategorySelectBox categories = {categories} handleChange = {handleChangeOnLocationSelectBox}/></div>
                        <div className="editing-theme__input"><input type="number" value={ themeTimeLimit } 
                                onChange={(e) => changeTxt(e, setThemeTimeLimit)} 
                                onKeyPress={onEnterKeyPressBlur}/> 분</div>
                        <div className="editing-theme__input"><input type="number" value={ themeMinNumPeople } 
                                onChange={(e) => changeTxt(e, setThemeMinNumPeople)} 
                                onKeyPress={onEnterKeyPressBlur}/> 명</div>
                        <div className="editing-theme__input"><input type="number" value={ themePrice } 
                                onChange={(e) => changeTxt(e, setThemePrice)} 
                                onKeyPress={onEnterKeyPressBlur}/> 원</div>
                        <div className="editing-theme__input"><input type="text" value={ themeReservationUrlTxt } 
                                onChange={(e) => changeTxt(e, setThemeReservationUrlTxt)} 
                                onKeyPress={onEnterKeyPressBlur}/></div>
                        <div className="english-possible-radio-section editing-cafe__input">
                            <input id="available"
                                value="가능"
                                name="availability"
                                type="radio"
                                checked={themeAvailable === true}
                                onChange={handleChangeOnAvailabilityRadioBtn} />
                            <label htmlFor="available">가능</label>

                            <input id="unavailable"
                                value="불가능"
                                name="availability"
                                type="radio"
                                checked={themeAvailable === false}
                                onChange={handleChangeOnAvailabilityRadioBtn} />
                            <label htmlFor="unavailable">불가능</label>
                        </div>
                        <textarea className="editing-theme__input" value = {themeExplanationTxt} 
                                onChange={(e) => changeTxt(e, setThemeExplanationTxt)} 
                        />
                    </div>
                </div>
                <div className="theme-popup-buttons">
                    <div className="add-theme-btn" onClick={() => addTheme()}>
                        <h2>테마 추가하기</h2>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
}

export default NewThemePopup;
