import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PageNavbar(props) {
    const navigate = useNavigate();

    return (
        <>
            <div className="container sticky-top p-0">
                <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow-sm mb-3 rounded px-3 ">
                    <a type="button" className="navbar-brand" onClick={() => navigate('/')} title="Back">
                        <i className="fas fa-arrow-left me-2 text-white"></i>
                        <span className="fs-5 fw-semibold">{props.navTitle}</span>
                    </a>
                </nav>
            </div>
        </>
    )
}