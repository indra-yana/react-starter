import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PageNavbar(props) {
    const navigate = useNavigate();

    return (
        <>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow-sm mb-3 rounded">
                <div className="container">
                    <a type="button" className="navbar-brand" onClick={() => navigate(-1)}>
                        <i className="fas fa-arrow-left me-2 text-white"></i>
                        <span className="fs-5 fw-semibold">Login</span>
                    </a>
                </div>
            </nav>
        </>
    )
}