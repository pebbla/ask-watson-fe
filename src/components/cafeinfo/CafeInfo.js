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

function CafeInfo({cafe}) {
    let navigate = useNavigate();
    
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    const [isEditingCafe, setEditingCafe] = useState(false)
    const [locationMenus, setLocationMenus] = useState([])

    const [cafeNameTxt, setCafeNameTxt] = useState(cafe.cafeName)
    const [cafePhoneNumTxt, setCafePhoneNumTxt] = useState(cafe.cafePhoneNum)
    const [locationId, setLocationId] = useState(cafe.location.id)
    const [englishPossibleYn, setEnglishPossibleYn] = useState(cafe.englishPossible)
    const [cafeAddressTxt, setCafeAddressTxt] = useState(cafe.address)
    const [cafeWebsiteTxt, setCafeWebsiteTxt] = useState(cafe.website)
    const [cafeLongitude, setCafeLongitude] = useState(cafe.geography.longitude)
    const [cafeLatitude, setCafeLatitude] = useState(cafe.geography.latitude)

    useEffect(() => {init()}, [])
    
    async function init() {
        getLocations()
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

    async function modifyCafeInfo() {
        window.location.reload();
        await axios
            .put("http://localhost:8080/v1/admin/cafes/" + cafe.id,
            {
                cafeName: cafeNameTxt,
                cafePhoneNum: cafePhoneNumTxt,
                website: cafeWebsiteTxt,
                address: cafeAddressTxt,
                imageUrl: cafe.imageUrl,
                locationId: locationId,
                companyId: cafe.company.id,
                longitude: cafeLongitude,
                latitude: cafeLatitude,
                isEnglishPossible: englishPossibleYn
            }, config)
            .then((response) => {
                console.log(response.data['data']);
            })
            .catch((error) => {console.error(error);});
            
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

    function changeCafeNameTxt(e) {
        e.preventDefault();
        setCafeNameTxt(e.target.value)
    }

    function changeCafePhoneNumTxt(e) {
        e.preventDefault();
        setCafePhoneNumTxt(e.target.value);
    }

    function changeCafeAddressTxt(e) {
        e.preventDefault();
        setCafeAddressTxt(e.target.value);
    }

    function changeCafeWebsite(e) {
        e.preventDefault();
        setCafeWebsiteTxt(e.target.value);
    }

    function changeCafeLongitude(e) {
        e.preventDefault();
        setCafeLongitude(e.target.value);
    }

    function changeCafeLatitude(e) {
        e.preventDefault();
        setCafeLatitude(e.target.value);
    }

    return cafe != null 
    ? <div className="cafe-info-layout">
        <div className="image-section">
            <img src={cafe.imageUrl} alt={cafe.cafeName} />
            <FontAwesomeIcon className="faArrowLeft" icon={faArrowLeft} onClick={() => navigate(-1)} />
        </div>
        <div className="cafe-title-section mg_left mg_right">
            {isEditingCafe
            ? <input type="text" value={ cafeNameTxt } 
                onChange={changeCafeNameTxt} 
                onKeyPress={onEnterKeyPressBlur}
                placeholder = {cafe.cafeName}
                />
            : <h1>{cafe.cafeName}</h1>}
            {isEditingCafe
            ? <h5 onClick={()=>onClickEditingDone()}>수정완료</h5>
            : <FontAwesomeIcon className="faPencil" icon={faPencil} onClick={() => setEditingCafe(true)} />}
        </div>
        {isEditingCafe
        ? <div className="cafe-info-section mg_left mg_right editing-cafe">
            <div className="cafe-info__title">
                <h2>전화번호</h2>
                <h2>지역</h2>
                <h2>별점</h2>
                <h2>영어가능</h2>
                <h2>주소</h2>
                <h2>위도 X</h2>
                <h2>경도 Y</h2>
                <h2>웹사이트</h2>
            </div>
            <div className="cafe-info__content">
                {cafePhoneNumTxt !== null
                    ? <div className="editing-cafe__input">
                        <input type="text" value={ cafePhoneNumTxt } 
                            onChange={changeCafePhoneNumTxt} 
                            onKeyPress={onEnterKeyPressBlur}
                            />
                    </div>
                    : <div></div>}
                {locationMenus !== []
                    ? <div className="editing-cafe__input">
                        <LocationSelectBox locations = {locationMenus} defaultValue = {cafe.location.id} handleChange = {handleChangeOnLocationSelectBox}/>
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
                <div className="editing-cafe__input">
                    <textarea value = {cafeAddressTxt} 
                        onChange={changeCafeAddressTxt} 
                        onKeyPress={onEnterKeyPressBlur}
                        />
                </div>
                <div className="editing-cafe__input">
                    <input type="text" value={ cafeLongitude } 
                            onChange={changeCafeLongitude} 
                            onKeyPress={onEnterKeyPressBlur}
                            />
                </div>
                <div className="editing-cafe__input">
                    <input type="text" value={ cafeLatitude } 
                            onChange={changeCafeLatitude} 
                            onKeyPress={onEnterKeyPressBlur}
                            />
                </div>
                <div className="editing-cafe__input">
                    <input type="text" value={ cafeWebsiteTxt } 
                            onChange={changeCafeWebsite} 
                            onKeyPress={onEnterKeyPressBlur}
                            />
                </div>
            </div>
        </div>
        : <div className="cafe-info-section mg_left mg_right">
            <div className="cafe-info__title">
                <h2>전화번호</h2>
                <h2>지역</h2>
                <h2>별점</h2>
                <h2>영어가능</h2>
                <h2>주소</h2>
            </div>
            <div className="cafe-info__content">
                <h2>{cafe.cafePhoneNum}</h2>
                <h2>{cafe.location.state} | {cafe.location.city}</h2>
                <h2>{cafe.rating}</h2>
                {cafe.englishPossible ? <h2>O</h2> : <h2>X</h2>}
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
