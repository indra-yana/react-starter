import { useNavigate } from "react-router-dom";
import ProfileControl from "../utility/ProfileControl";
import React from "react";

export default function DashboardNavbar(props) {
    const navigate = useNavigate();

    return (
        <>
            <div className="container sticky-top p-0">
                <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow-sm mb-3 rounded px-3 ">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a type="button" className="navbar-brand" onClick={() => navigate('/')} title="Back">
                                <i className="fas fa-arrow-left text-white"></i>
                            </a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item my-auto">
                            <span className="fs-5 fw-semibold text-white text-center">{props.navTitle}</span>
                        </li>
                        <ProfileControl />
                    </ul>
                </nav>
            </div>
        </>
    )
}