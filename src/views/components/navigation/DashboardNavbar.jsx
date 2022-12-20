import { NavLink } from "react-router-dom";
import LangSwitcher from "../utility/LangSwitcher";
import React from "react";

export default function DashboardNavbar(props) {

    function handleToggleMenuClick(e) {
        document.getElementById("sidebar-wrapper").classList.toggle("active");
        document.getElementById("content").classList.toggle("active-content");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light rounded shadow">
                <div className="container-fluid">
                    <button type="button" id="sidebarCollapse" className="btn btn-toggle" onClick={handleToggleMenuClick}>
                        <i className="text-white fa-solid fa-bars"></i>
                        <span className="sr-only">Toggle Menu</span>
                    </button>
                    <button className="btn btn-outline-light d-inline-block d-lg-none ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="nav navbar-nav ms-auto">
                            <li className="nav-item">
                                <NavLink to={'/'} className="nav-link fw-bold">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/help'} className="nav-link fw-bold">
                                    Help?
                                </NavLink>
                            </li>
                            <li className="nav-item my-auto">
                                <LangSwitcher/>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}