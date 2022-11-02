import React, { useState, useEffect } from 'react'
import axios from "axios"
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "./ThemePopup.scss"

function onEnterKeyPressBlur(e) {
    if(e.key === 'Enter') {
        e.preventDefault();
        e.target.blur();
    }
}

function CategorySelectBox({categories, defaultValue, handleChange}) {
    
    return (
		<select onChange={handleChange}>
			{categories.map((category) => (
				<option
					key={category.id}
					value={category.id}
					defaultValue={defaultValue === category.value}
				>
					{category.categoryName}
				</option>
			))}
		</select>
	)
}

function ThemePopup({theme, onClose, isOpen}) {
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };
    
    const [categoryItems, setCategoryItems] = useState([])

    const [themeNameTxt, setThemeNameTxt] = useState(theme.themeName)
    const [themeCategoryId, setThemeCategoryId] = useState(theme.category.id)
    const [themeExplanationTxt, setThemeExplanationTxt] = useState(theme.themeExplanation)
    const [themeTimeLimit, setThemeTimeLimit] = useState(theme.timeLimit)
    const [themeMinNumPeople, setThemeMinNumPeople] = useState(theme.minNumPeople)
    const [themePrice, setThemePrice] = useState(theme.price)
    const [themeReservationUrlTxt, setThemeReservationUrlTxt] = useState(theme.reservationUrl)
    const [themeImageUrl, setThemeImageUrl] = useState(theme.imageUrl)
    const [themeAvailable, setThemeAvailable] = useState(theme.available);
    const [isImageFileModified, setImageFileModified] = useState(false)
    const [themeImageFile, setThemeImageFile] = useState(null)
    

    const handleChangeOnLocationSelectBox = (e) => {
        setThemeCategoryId(e.target.value)
    }

    useEffect(() => {init()}, [])

    async function init() {
        getCategories();
    }

    async function getCategories() {
        await axios
        .get("http://localhost:8080/v1/categories", config)
        .then(response => {
            setCategoryItems(response.data['data']);
        })
        .catch((error) => {
            console.error("ERROR: " + error);
        })
    }

    async function modifyThemeInfo() {
        console.log("ThemePopup: " + themeImageUrl)
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
                imageUrl: theme.imageUrl,
                isAvailable: themeAvailable
            }

            formData.append("params", new Blob([JSON.stringify(jsonData)], {type: "application/json"}))
            if(isImageFileModified) formData.append("file", themeImageFile)

            await axios
            .put("http://localhost:8080/v1/admin/themes/" + theme.id, formData)
            .then((response) => {
                window.location.reload();
                console.log(response.data['data']);
            })
            .catch((error) => {console.error(error);});
        }
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
          } else {
            onCancel()
          }
        };
      
        return confirmAction;
    };

    async function deleteConfirm() {
        window.location.reload();
        deleteTheme()
    }

    const cancelConfirm = () => console.log("취소했습니다.")

    const confirmDelete = useConfirm(
        "테마를 삭제하시겠습니까?",
        deleteConfirm,
        cancelConfirm
    );

    async function deleteTheme() {
        await axios
            .delete("http://localhost:8080/v1/admin/themes/" + theme.id, config)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {console.error(error);});
    }

    function changeTxt(e, txtSetter) {
        e.preventDefault();
        txtSetter(e.target.value);
    }

    const setThumbnail = (e) => {
        setThemeImageUrl(URL.createObjectURL(e.target.files[0]))
        setThemeImageFile(e.target.files[0])
        setImageFileModified(true)
    };

    const handleChangeOnAvailabilityRadioBtn = (e) => {
        setThemeAvailable(e.target.value === "가능")
    }

    return <Modal className='theme-popup-screen' isOpen = {isOpen} ariaHideApp={false}>
        <div className='bg' onClick={onClose}>
            <div className='theme-popup-layout' onClick={(e) => e.stopPropagation()}>
                <FontAwesomeIcon className="faX" icon={faX} onClick={onClose}/>
                <div className="theme-name"><input type="text" value={ themeNameTxt } 
                    onChange={(e) => changeTxt(e, setThemeNameTxt)} 
                    onKeyPress={onEnterKeyPressBlur}
                    placeholder="테마 제목을 입력해주세요."/></div>
                <div className='image-and-unchangable-info'>
                    <div className='image-section'>
                        <div className="file-uploader-layout">
                            <input type="file" name="image_file" onChange={setThumbnail}></input>
                        </div>
                        { themeImageUrl !== "" ? <img className="theme-image" src={themeImageUrl} alt={themeNameTxt} /> : <div></div>}
                    </div>
                    <div className='unchangable-info'>
                        <div className="theme-info__part">
                            <div className="theme-info__title">
                                <h2>난이도</h2>
                                <h2>좋아요수</h2>
                                <h2>탈출수</h2>
                                <h2>리뷰수</h2>
                            </div>
                            <div className="theme-info__content">
                                <h2>💪 {theme.difficulty}</h2>
                                <h2>❤️ {theme.heartCount}</h2>
                                <h2>🏃 {theme.escapeCount}</h2>
                                <h2>🗒 {theme.reviewCount}</h2>
                            </div>
                        </div>
                        <div className="divider__ver"></div>
                        <div className="theme-info__part">
                            <div className="theme-info__title">
                                <h2>별점</h2>
                                <h2>장치비율</h2>
                                <h2>활동성</h2>
                            </div>
                            <div className="theme-info__content">
                                <h2>⭐️ {theme.rating}</h2>
                                <h2>🎲 {theme.deviceRatio}</h2>
                                <h2>🏄 {theme.activity}</h2>
                            </div>
                        </div>
                    </div>
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
                        <div className="editing-theme__input"><CategorySelectBox  categories = {categoryItems} defaultValue = {theme.category.id} handleChange = {handleChangeOnLocationSelectBox}/></div>
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
                    <div className="btn delete-theme-btn" onClick={() => confirmDelete()}>
                        <h2>테마 삭제하기</h2>
                    </div>
                    <div className="btn modify-theme-btn" onClick={() => modifyThemeInfo()}>
                        <h2>테마 수정하기</h2>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
}

export default ThemePopup;
