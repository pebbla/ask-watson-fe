import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faPencil } from "@fortawesome/free-solid-svg-icons"
import "./CafeInfo.scss"

function onEnterKeyPressBlur(e) {
    if(e.key === 'Enter') {
        e.preventDefault();
        e.target.blur();
    }
}

function LocationSelectBox({locations, defaultValue, handleChange}) {
    
    return (
		<select onChange={handleChange}>
			{locations.map((location) => (
				<option
					key={location.id}
					value={location.id}
					defaultValue={defaultValue === location.value}
				>
					{location.state} | {location.city}
				</option>
			))}
		</select>
	)
}

function CafeInfo({cafe, locations}) {
    let navigate = useNavigate();
    
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    const [isEditingCafe, setEditingCafe] = useState(false)
    const [cafeNameTxt, setCafeNameTxt] = useState(cafe.cafeName)
    var cafePhoneNum = (cafe.cafePhoneNum == null || cafe.cafePhoneNum === "") ? "-" : cafe.cafePhoneNum
    const [cafePhoneNumTxt, setCafePhoneNumTxt] = useState(cafePhoneNum)
    const [locationId, setLocationId] = useState(cafe.location.id)
    const [englishPossibleYn, setEnglishPossibleYn] = useState(cafe.isEnglishPossible)
    const [cafeAvailable, setCafeAvailable] = useState(cafe.available);
    const [cafeAddressTxt, setCafeAddressTxt] = useState(cafe.address)
    const [cafeWebsiteTxt, setCafeWebsiteTxt] = useState(cafe.website)
    const [cafeLongitude, setCafeLongitude] = useState(cafe.geography.longitude)
    const [cafeLatitude, setCafeLatitude] = useState(cafe.geography.latitude)
    const [cafeImageUrl, setCafeImageUrl] = useState(cafe.imageUrl)
    const [isImageFileModified, setImageFileModified] = useState(false)
    const [cafeImageFile, setCafeImageFile] = useState(null)

    async function modifyCafeInfo() {
        if(cafeNameTxt === "") window.alert("카페 이름을 입력해주세요.")
        else if(cafePhoneNumTxt === "") window.alert("전화번호를 입력해주세요.")
        else if(locationId == null) window.alert("카페 위치를 선택해주세요.")
        else if(cafeLongitude == null) window.alert("경도를 입력해주세요.")
        else if(cafeLatitude == null) window.alert("위도를 입력해주세요.")
        else {
            let formData = new FormData()

            let jsonData = {
                cafeName: cafeNameTxt,
                cafePhoneNum: cafePhoneNumTxt,
                website: cafeWebsiteTxt,
                address: cafeAddressTxt,
                imageUrl: cafe.imageUrl,
                locationId: locationId,
                longitude: cafeLongitude,
                latitude: cafeLatitude,
                isEnglishPossible: englishPossibleYn,
                isAvailable: cafeAvailable
            }
            
            formData.append("params", new Blob([JSON.stringify(jsonData)], {type: "application/json"}))
            if(isImageFileModified) formData.append("file", cafeImageFile)

            await axios
            .put("http://localhost:8080/v1/admin/cafes/" + cafe.id, formData)
            .then((response) => {
                window.location.reload();
                console.log(response.data['data']);
            })
            .catch((error) => {console.error(error);});
        }
    }

    async function deleteCafe() {
        await axios
            .delete("http://localhost:8080/v1/admin/cafes/" + cafe.id, config)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {console.error(error);});
    }

    async function onClickEditingDone() {
        setEditingCafe(false)
        modifyCafeInfo()
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
        deleteCafe()
    }
    const cancelConfirm = () => console.log("취소했습니다.")

    const confirmDelete = useConfirm(
        "카페를 삭제하시겠습니까?",
        deleteConfirm,
        cancelConfirm
    );

    const handleChangeOnLocationSelectBox = (e) => {
        setLocationId(e.target.value)
    }

    const handleChangeOnEngPosRadioBtn = (e) => {
        setEnglishPossibleYn(e.target.value === "가능")
    }

    const handleChangeOnAvailabilityRadioBtn = (e) => {
        setCafeAvailable(e.target.value === "가능")
    }

    function changeTxt(e, txtSetter) {
        e.preventDefault();
        txtSetter(e.target.value);
    }

    const setThumbnail = (e) => {
        setCafeImageUrl(URL.createObjectURL(e.target.files[0]))
        setCafeImageFile(e.target.files[0])
        setImageFileModified(true)
    };

    return cafe != null 
    ? <div className="cafe-info-layout">
        <div className="image-section">
            {isEditingCafe
                ? <div className="file-uploader-layout">
                    <input type="file" name="image_file" onChange={setThumbnail}></input>
                </div>
                : <div></div>
            }
            <img src={cafeImageUrl} alt={cafe.cafeName} />
            <FontAwesomeIcon className="faArrowLeft" icon={faArrowLeft} onClick={() => navigate(-1)} />
        </div>
        <div className="cafe-title-section mg_left mg_right">
            {isEditingCafe
            ? <input type="text" value={ cafeNameTxt } 
                onChange={(e) => changeTxt(e, setCafeNameTxt)} 
                onKeyPress={onEnterKeyPressBlur}
                placeholder = {cafe.cafeName}
                />
            : <div className="cafe-name">
                <h1>{cafe.cafeName}</h1>
                {cafe.available ? <div></div> : <h1 className="unavailable-warning">      이용 불가능</h1>}
            </div>}
            {isEditingCafe
            ? <div className="modify-cafe-btn" onClick={() => onClickEditingDone()}>
                <h2>수정완료</h2>
            </div>
            : <FontAwesomeIcon className="faPencil" icon={faPencil} onClick={() => setEditingCafe(true)} />}
        </div>
        {isEditingCafe
        ? <div className="cafe-info-section mg_left mg_right editing-cafe">
            <div className="cafe-info__title">
                <h2>전화번호</h2>
                <h2>지역</h2>
                <h2>별점</h2>
                <h2>영어가능</h2>
                <h2>이용가능</h2>
                <h2>웹사이트</h2>
                <h2>경도 X</h2>
                <h2>위도 Y</h2>
                <h2>주소</h2>
            </div>
            <div className="cafe-info__content">
                {cafePhoneNumTxt !== null
                    ? <div className="editing-cafe__input">
                        <input type="text" value={ cafePhoneNumTxt } 
                            onChange={(e) => changeTxt(e, setCafePhoneNumTxt)} 
                            onKeyPress={onEnterKeyPressBlur}
                            />
                    </div>
                    : <div></div>}
                {locations !== []
                    ? <div className="editing-cafe__input">
                        <LocationSelectBox locations = {locations} defaultValue = {cafe.location.id} handleChange = {handleChangeOnLocationSelectBox}/>
                    </div>
                    : <div></div>}
                <h2>{cafe.rating}</h2>
                <div className="english-possible-radio-section editing-cafe__input">
                    <input id="engPos"
                        value="가능"
                        name="englishPossibleYn"
                        type="radio"
                        checked={englishPossibleYn === true}
                        onChange={handleChangeOnEngPosRadioBtn} />
                    <label htmlFor="engPos">가능</label>

                    <input id="engImpos"
                        value="불가능"
                        name="englishPossibleYn"
                        type="radio"
                        checked={englishPossibleYn === false}
                        onChange={handleChangeOnEngPosRadioBtn} />
                    <label htmlFor="engImpos">불가능</label>
                </div>
                <div className="english-possible-radio-section editing-cafe__input">
                            <input id="available"
                                value="가능"
                                name="availability"
                                type="radio"
                                checked={cafeAvailable === true}
                                onChange={handleChangeOnAvailabilityRadioBtn} />
                            <label htmlFor="available">가능</label>

                            <input id="unavailable"
                                value="불가능"
                                name="availability"
                                type="radio"
                                checked={cafeAvailable === false}
                                onChange={handleChangeOnAvailabilityRadioBtn} />
                            <label htmlFor="unavailable">불가능</label>
                        </div>
                <div className="editing-cafe__input">
                    <input type="text" value={ cafeWebsiteTxt } 
                            onChange={(e) => changeTxt(e, setCafeWebsiteTxt)} 
                            onKeyPress={onEnterKeyPressBlur}
                            />
                </div>
                <div className="editing-cafe__input">
                    <input type="number" value={ cafeLongitude } 
                            onChange={(e) => changeTxt(e, setCafeLongitude)} 
                            onKeyPress={onEnterKeyPressBlur}
                            step="0.000000000000000000000001"
                            />
                <div className="editing-cafe__input">
                    <input type="number" value={ cafeLatitude } 
                            onChange={(e) => changeTxt(e, setCafeLatitude)} 
                            onKeyPress={onEnterKeyPressBlur}
                            step="0.000000000000000000000001"
                            />
                </div>
                </div>
                <div className="editing-cafe__input">
                    <textarea value = {cafeAddressTxt} 
                        onChange={(e) => changeTxt(e, setCafeAddressTxt)} />
                </div>
            </div>
        </div>
        : <div className="cafe-info-section mg_left mg_right">
            <div className="cafe-info__title">
                <h2>전화번호</h2>
                <h2>지역</h2>
                <h2>별점</h2>
                <h2>영어가능</h2>
                <h2>이용가능</h2>
                <h2>주소</h2>
            </div>
            <div className="cafe-info__content">
                <h2>{cafePhoneNum}</h2>
                <h2>{cafe.location.state} | {cafe.location.city}</h2>
                <h2>{cafe.rating}</h2>
                {cafe.isEnglishPossible ? <h2>O</h2> : <h2>X</h2>}
                {cafe.available ? <h2>O</h2> : <h2>X</h2>}
                <h2>{cafe.address}</h2>
            </div>
        </div>}
        {isEditingCafe
        ? <div className="cafe-delete-btn" onClick={() => confirmDelete()}>
            <h6>카페 삭제하기</h6>
        </div>
        : <div className="cafe-website-btn" onClick={() => window.open(cafe.website, '_blank')}>
            <h6>웹사이트로 이동</h6>
        </div>}
    </div>
    : <div></div>
}

export default CafeInfo
