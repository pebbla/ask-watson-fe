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

function CompanySelectBox({companies, defaultValue, handleChange}) {
    
    return (
		<select onChange={handleChange}>
			{companies.map((company) => (
				<option
					key={company.id}
					value={company.id}
					defaultValue={defaultValue === company.value}
				>
					{company.companyName}
				</option>
			))}
		</select>
	)
}

function CafeInfo({cafeId}) {
    let navigate = useNavigate();
    
    var config = {
        headers: { 'Content-Type': 'application/json' }
    };

    const [cafe, setCafe] = useState(null)
    const [isEditingCafe, setEditingCafe] = useState(false)
    const [locationMenus, setLocationMenus] = useState([])
    const [companyMenus, setCompanyMenus] = useState([])

    const [cafePhoneNumTxt, setCafePhoneNumTxt] = useState("")
    const [locationId, setLocationId] = useState(-1)
    const [companyId, setCompanyId] = useState(-1)
    const [englishPossibleYn, setEnglishPossibleYn] = useState(false)
    const [cafeAddressTxt, setCafeAddressTxt] = useState("")
    
    useEffect(() => {init()}, [])

    async function init() {
        getCafeInfo()
        getLocations()
        getCompanies()
    }

    async function getLocations() {
        await axios
        .get("http://localhost:8080/v1/locations", config)
        .then(response => {
            setLocationMenus(response.data['dataList']);
        })
        .catch((error) => {
            console.error("ERROR: " + error);
        })
    }

    async function getCompanies() {
        await axios
        .get("http://localhost:8080/v1/companies", config)
        .then(response => {
            setCompanyMenus(response.data['dataList']);
        })
        .catch((error) => {
            console.error("ERROR: " + error);
        })
    }


    async function getCafeInfo() {
        await axios
            .get("http://localhost:8080/v1/cafes/"+cafeId, config)
            .then(response => {
                setCafe(response.data['data']);
                setCafePhoneNumTxt(cafe.cafePhoneNum)
                setLocationId(cafe.location.id)
                setCompanyId(cafe.company.id)
                setEnglishPossibleYn(cafe.isEnglishPossible)
                setCafeAddressTxt(cafe.address)
            })
            .catch((error) => {
                console.error("ERROR: " + error);
            })
    }

    // async function modifyCafeInfo() {
    //     await axios
    //         .put("http://localhost:8080/v1/admin/cafes/" + cafeId,
    //         {
    //             // cafeName: cafeName,

    //             cafePhoneNum: cafePhoneNumTxt,
            
    //             private String website;
            
    //             private String address;
            
    //             private String imageUrl;
            
    //             private Long locationId;
            
    //             private Long companyId;
            
    //             private Double longitude;
            
    //             private Double latitude;
            
    //             private Boolean isEnglishPossible;
    //         }, config)
    //         .then((response) => {
    //             console.log(response.data['data']);
    //         })
    //         .catch((error) => {console.error(error);});
    //     // e.target.blur();
    //     console.log("투두가 수정되었습니다.");
    // }

    async function deleteCafe() {
        await axios
            .delete("http://localhost:8080/v1//admin/cafes/" + cafeId, config)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {console.error(error);});
    }

    async function onClickEditingDone() {
        setEditingCafe(false);
        
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

    const handleChangeOnCompanySelectBox = (e) => {
        setCompanyId(e.target.value)
    }

    const handleChangeOnEngPosRadioBtn = (e) => {
        setEnglishPossibleYn(e.target.value === "가능")
    }

    function changeCafePhoneNumTxt(e) {
        e.preventDefault();
        setCafePhoneNumTxt(e.target.value);
    }

    function changeCafeAddressTxt(e) {
        e.preventDefault();
        setCafeAddressTxt(e.target.value);
    }

    return cafe != null 
    ? <div className="cafe-info-layout">
        <div className="image-section">
            <img src={cafe.imageUrl} alt={cafe.cafeName} />
            <FontAwesomeIcon className="faArrowLeft" icon={faArrowLeft} onClick={() => navigate(-1)} />
        </div>
        <div className="cafe-title-section mg_left mg_right">
            <h1>{cafe.cafeName}</h1>
            {isEditingCafe
            ? <h5 onClick={()=>onClickEditingDone()}>수정완료</h5>
            : <FontAwesomeIcon className="faPencil" icon={faPencil} onClick={() => setEditingCafe(true)} />}
        </div>
        {isEditingCafe
        ? <div className="cafe-info-section mg_left mg_right editing-cafe">
            <div className="cafe-info__title">
                <h2>전화번호</h2>
                <h2>지역</h2>
                <h2>체인명</h2>
                <h2>별점</h2>
                <h2>영어가능</h2>
                <h2>주소</h2>
            </div>
            <div className="cafe-info__content">
                {cafePhoneNumTxt !== null
                    ? <div className="editing-cafe__input">
                        <input type="text" value={ cafePhoneNumTxt } 
                            onChange={changeCafePhoneNumTxt} 
                            onKeyPress={onEnterKeyPressBlur}
                            placeholder = {cafe.cafePhoneNum}
                            />
                    </div>
                    : <div></div>}
                {locationMenus !== []
                    ? <div className="editing-cafe__input">
                        <LocationSelectBox locations = {locationMenus} defaultValue = {cafe.location.id} handleChange = {handleChangeOnLocationSelectBox}/>
                    </div>
                    : <div></div>}
                {locationMenus !== []
                    ? <div className="editing-cafe__input">
                        <CompanySelectBox companies = {companyMenus} defaultValue = {cafe.company.id} handleChange = {handleChangeOnCompanySelectBox}/>
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
                        placeholder = {cafe.address}
                        />
                </div>
            </div>
        </div>
        : <div className="cafe-info-section mg_left mg_right">
            <div className="cafe-info__title">
                <h2>전화번호</h2>
                <h2>지역</h2>
                <h2>체인명</h2>
                <h2>별점</h2>
                <h2>영어가능</h2>
                <h2>주소</h2>
            </div>
            <div className="cafe-info__content">
                <h2>{cafe.cafePhoneNum}</h2>
                <h2>{cafe.location.state} | {cafe.location.city}</h2>
                <h2>{cafe.company.companyName}</h2>
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
