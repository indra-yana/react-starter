import ProfileControl from "../utility/ProfileControl";
import React from "react";
import BackControl from "../utility/BackControl";

export default function DashboardNavbar(props) {
    return (
        <>
            <div className="container sticky-top p-0">
                <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow-sm mb-3 rounded px-3 ">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <BackControl />
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item my-auto">
                            <span className="fs-5 fw-semibold text-white text-center">{props.navTitle}</span>
                        </li>
                        <li className="nav-item dropdown mt-2 mt-sm-0 ms-2">
                            <ProfileControl />
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}