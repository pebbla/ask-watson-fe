import React from "react"
import { Link, NavLink } from "react-router-dom"
import watson_logo from '../../../assets/watson_with_left_hand_up.png';
import "./SideBar.scss"

function SideBar() {
    const menus = [
        { name: "방탈출 카페", path: "/cafe" },
        { name: "방탈출 테마", path: "/theme" },
        { name: "공지", path: "/notice" },
        { name: "FAQ", path: "/faq" },
        { name: "회원 관리", path: "/user-management" },
        { name: "신고 처리", path: "/report-process" },
    ]

    return (
        <div className="side-bar">
            <Link to="/cafe">
                <div className="welcome-message">
                    <img src={watson_logo} className="watson-logo" alt="watson-logo" />
                    <h1>ASK WATSON</h1>
                </div>
            </Link>
            <hr />
            <div className="menu">
                <div className="menu-item">
                    {menus.map((menu, index) => {
                        return (
                            <NavLink
                                exact 
                                style={{color:"#B7B7B7", textDecoration:"none"}}
                                to={menu.path}
                                key={index}
                                className="menu-item"
                                activeClassName="active"
                            >
                                <h2>{menu.name}</h2>
                            </NavLink>
                        )
                    })}
                </div>
            </div>
            <div className="log-out">
                로그아웃
            </div>
        </div>
    )
}

export default SideBar