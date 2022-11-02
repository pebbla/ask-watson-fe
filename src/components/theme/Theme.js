import React, { useState } from "react";
import ThemePopup from "./popup/ThemePopup.js";
import "./Theme.scss"
function Theme({theme, categories}) {
    const [isModalOpen, setModalOpen] = useState(false)

    const openPopup = () => {
        setModalOpen(true)
    }

    const onClose = () => {
        setModalOpen(false)
    }

    return <div className="theme-layout" onClick={openPopup}>
        <ThemePopup theme={theme} onClose={onClose} isOpen={isModalOpen} categories={categories}/>
        <div className="theme-name">
            <h1>{theme.id}. {theme.themeName}</h1>
            {theme.available ? <div></div> : <h1 className="unavailable-warning">      이용 불가능</h1>}
        </div>
        <div className="theme-info-section">
            <div className="theme-image"><img src={theme.imageUrl} alt={theme.themeName} /></div>
            <div className="theme-info">
                <div className="theme-info__part">
                    <div className="theme-info__title">
                        <h2>카테고리</h2>
                        <h2>난이도</h2>
                        <h2>제한시간</h2>
                        <h2>최소인원수</h2>
                        <h2>가격</h2>
                        <h2>테마설명</h2>
                    </div>
                    <div className="theme-info__content">
                        <h2>{theme.category.categoryName}</h2>
                        <h2>{theme.difficulty}</h2>
                        <h2>{theme.timeLimit}</h2>
                        <h2>{theme.minNumPeople}</h2>
                        <h2>{theme.price}</h2>
                        <h2>...</h2>
                    </div>
                </div>
                <div className="theme-info__part">
                    <div className="theme-info__title">
                        <h2>좋아요수</h2>
                        <h2>탈출수</h2>
                        <h2>리뷰수</h2>
                        <h2>별점</h2>
                        <h2>장치비율</h2>
                        <h2>활동성</h2>
                    </div>
                    <div className="theme-info__content">
                        <h2>❤️ {theme.heartCount}</h2>
                        <h2>🏃 {theme.escapeCount}</h2>
                        <h2>🗒 {theme.reviewCount}</h2>
                        <h2>⭐️ {theme.rating}</h2>
                        <h2>🎲 {theme.deviceRatio}</h2>
                        <h2>🏄 {theme.activity}</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Theme;