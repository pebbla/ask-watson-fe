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
        if(themeNameTxt === "") window.alert("테마 제목을 입력해주세요.")
        else if(themeCategoryId == null) window.alert("카테고리를 선택해주세요.")
        else if(themeTimeLimit == null) window.alert("제한시간을 입력해주세요.")
        else if(themePrice == null) window.alert("가격을 입력해주세요.")
        else await axios
            .put("http://localhost:8080/v1/admin/themes/" + theme.id,
            {
                themeName: themeNameTxt,
                themeExplanation: themeExplanationTxt,
                categoryId: themeCategoryId,
                timeLimit: themeTimeLimit,
                minNumPeople: themeMinNumPeople,
                price: themePrice,
                reservationUrl: themeReservationUrlTxt,
                imageUrl: theme.imageUrl,
                difficulty: theme.difficulty
            }, config)
            .then((response) => {
                window.location.reload();
                console.log(response.data['data']);
                
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

    return <Modal className='theme-popup-screen' isOpen = {isOpen} ariaHideApp={false}>
        <div className='bg' onClick={onClose}>
            <div className='theme-popup-layout' onClick={(e) => e.stopPropagation()}>
                <FontAwesomeIcon className="faX" icon={faX} onClick={onClose}/>
                <div className="theme-name"><input type="text" value={ themeNameTxt } 
                    onChange={(e) => changeTxt(e, setThemeNameTxt)} 
                    onKeyPress={onEnterKeyPressBlur}
                    placeholder="테마 제목을 입력해주세요."/></div>
                <div className='image-and-unchangable-info'>
                    <img className="theme-image" src={theme.imageUrl} alt={theme.themeName} />
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
                        <textarea className="editing-theme__input" value = {themeExplanationTxt} 
                                onChange={(e) => changeTxt(e, setThemeExplanationTxt)} 
                                onKeyPress={onEnterKeyPressBlur}
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
