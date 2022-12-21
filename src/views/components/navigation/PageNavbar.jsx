import BackControl from "../utility/BackControl";
import LangSwitcher from "../utility/LangSwitcher";
import ProfileControl from "../utility/ProfileControl";
import React from "react";

export default function PageNavbar(props) {
    return (
        <>
            <div className="container sticky-top p-0">
                <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow-sm mb-3 rounded px-3 ">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <BackControl />
                            <span className="fs-5 fw-semibold text-white text-center">{props.navTitle}</span>
                        </li>
                    </ul>
                    <button className="btn btn-outline-light d-inline-block d-md-none ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto gap-2">
                            <li className="nav-item my-auto">
                                <LangSwitcher />
                            </li>
                            <li className="nav-item dropdown mt-2 mt-sm-0 ms-2">
                                <ProfileControl />
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    )
}