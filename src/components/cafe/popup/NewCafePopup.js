import React, { useState, useEffect } from 'react'
import axios from "axios"
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "./NewCafePopup.scss"

function onEnterKeyPressBlur(e) {
    if(e.key === 'Enter') {
        e.preventDefault();
        e.target.blur();
    }
}

function LocationSelectBox({locations, handleChange}) {
    
    return (
		<select onChange={handleChange} defaultValue={'선택'}>
            <option value="선택" disabled hidden>선택</option>
			{locations.map((location) => (
				<option
					key={location.id}
					value={location.id}
				>
					{location.state} | {location.city}
				</option>
			))}
		</select>
	)
}

function NewCafePopup({onClose, isOpen}) {
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };
    
    const [locationMenus, setLocationMenus] = useState([])

    const [cafeNameTxt, setCafeNameTxt] = useState("")
    const [cafeLocationId, setCafeLocationId] = useState()
    const [cafePhoneNumTxt, setCafePhoneNumTxt] = useState("")
    const [cafeEnglishPossibleYn, setCafeEnglishPossibleYn] = useState(false)
    const [cafeAddressTxt, setCafeAddressTxt] = useState("")
    const [cafeWebsiteTxt, setCafeWebsiteTxt] = useState("")
    const [cafeLongitude, setCafeLongitude] = useState()
    const [cafeLatitude, setCafeLatitude] = useState()
    const [cafeImageUrl, setCafeImageUrl] = useState("")
    const [cafeImageFile, setCafeImageFile] = useState(null)

    const handleChangeOnLocationSelectBox = (e) => {
        setCafeLocationId(e.target.value)
    }

    useEffect(() => {init()}, [])

    async function init() {
        getLocations();
    }

    async function getLocations() {
        await axios
        .get("http://localhost:8080/v1/locations", config)
        .then(response => {
            setLocationMenus(response.data['data']);
        })
        .catch((error) => {
            console.error("ERROR: " + error);
        })
    }

    async function addCafe() {
        if(cafeNameTxt === "") window.alert("카페 이름을 입력해주세요.")
        else if(cafePhoneNumTxt === "") window.alert("전화번호를 입력해주세요.")
        else if(cafeLocationId == null) window.alert("카페 위치를 선택해주세요.")
        else if(cafeLongitude == null) window.alert("경도를 입력해주세요.")
        else if(cafeLatitude == null) window.alert("위도를 입력해주세요.")
        else {
            let formData = new FormData()

            let jsonData = {
                cafeName: cafeNameTxt,
                cafePhoneNum: cafePhoneNumTxt,
                website: cafeWebsiteTxt,
                address: cafeAddressTxt,
                imageUrl: "",
                locationId: cafeLocationId,
                longitude: cafeLongitude,
                latitude: cafeLatitude,
                isEnglishPossible: cafeEnglishPossibleYn
            }
            
            formData.append("params", new Blob([JSON.stringify(jsonData)], {type: "application/json"}))
            formData.append("file", cafeImageFile)

            await axios
            .post("http://localhost:8080/v1/admin/cafes", formData)
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

    const handleChangeOnEngPosRadioBtn = (e) => {
        setCafeEnglishPossibleYn(e.target.value === "가능")
    }

    const setThumbnail = (e) => {
        setCafeImageUrl(URL.createObjectURL(e.target.files[0]))
        setCafeImageFile(e.target.files[0])
    };

    return <Modal className='cafe-popup-screen' isOpen = {isOpen} ariaHideApp={false}>
        <div className='bg' onClick={onClose}>
            <div className='cafe-popup-layout' onClick={(e) => e.stopPropagation()}>
                <FontAwesomeIcon className="faX" icon={faX} onClick={onClose}/>
                <div className="cafe-name"><input type="text" value={ cafeNameTxt } 
                    onChange={(e) => changeTxt(e, setCafeNameTxt)} 
                    onKeyPress={onEnterKeyPressBlur}
                    placeholder="카페 제목을 입력해주세요."/></div>
                <div className="cafe-image-bg">
                    <div className="file-uploader-layout">
                        <input type="file" name="image_file" onChange={setThumbnail}></input>
                    </div>
                    { cafeImageUrl !== "" ? <img className="cafe-image" src={cafeImageUrl} alt={cafeNameTxt} /> : <div></div>}
                </div>
                <div className="cafe-changable-info">
                    <div className="cafe-info__title">
                        <h2>전화번호</h2>
                        <h2>지역</h2>
                        <h2>영어가능</h2>
                        <h2>웹사이트</h2>
                        <h2>경도 X</h2>
                        <h2>위도 Y</h2>
                        <h2>주소</h2>
                    </div>
                    <div className="cafe-info__inputs">
                        <div className="editing-cafe__input"><input type="text" value={ cafePhoneNumTxt } 
                                onChange={(e) => changeTxt(e, setCafePhoneNumTxt)} 
                                onKeyPress={onEnterKeyPressBlur}/></div>
                        <div className="editing-cafe__input"><LocationSelectBox  locations = {locationMenus} handleChange = {handleChangeOnLocationSelectBox}/></div>
                        <div className="english-possible-radio-section editing-cafe__input">
                            <input id="engPos"
                                value="가능"
                                name="englishPossibleYn"
                                type="radio"
                                checked={cafeEnglishPossibleYn === true}
                                onChange={handleChangeOnEngPosRadioBtn} />
                            <label htmlFor="engPos">가능</label>

                            <input id="engImpos"
                                value="불가능"
                                name="englishPossibleYn"
                                type="radio"
                                checked={cafeEnglishPossibleYn === false}
                                onChange={handleChangeOnEngPosRadioBtn} />
                            <label htmlFor="engImpos">불가능</label>
                        </div>
                        <div className="editing-cafe__input"><input type="text" value={ cafeWebsiteTxt } 
                                onChange={(e) => changeTxt(e, setCafeWebsiteTxt)} 
                                onKeyPress={onEnterKeyPressBlur}/></div>
                        <div className="editing-cafe__input"><input type="number" value={ cafeLongitude } 
                                onChange={(e) => changeTxt(e, setCafeLongitude)} 
                                onKeyPress={onEnterKeyPressBlur}
                                step="0.000000000000000000000001"/></div>
                        <div className="editing-cafe__input"><input type="number" value={ cafeLatitude } 
                                onChange={(e) => changeTxt(e, setCafeLatitude)} 
                                onKeyPress={onEnterKeyPressBlur}
                                step="0.000000000000000000000001"/></div>
                        <textarea className="editing-cafe__input" value = {cafeAddressTxt} 
                                onChange={(e) => changeTxt(e, setCafeAddressTxt)} 
                        />
                    </div>
                </div>
                <div className="cafe-popup-buttons">
                    <div className="add-cafe-btn" onClick={() => addCafe()}>
                        <h2>카페 추가하기</h2>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
}

export default NewCafePopup;
