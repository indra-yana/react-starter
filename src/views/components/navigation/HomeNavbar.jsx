import { NavLink } from "react-router-dom";
import { useAuthContext } from "src/hooks/useAuthContext";
import LangSwitcher from "../utility/LangSwitcher";
import ProfileControl from "../utility/ProfileControl";
import React, { useState } from "react";
import reactLogo from "../../../assets/react.svg"

export default function HomeNavbar(props) {
    const { auth } = useAuthContext();

    return (
        <>
            <div className="container sticky-top p-0">
                <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow-sm mb-3 px-3 rounded">
                    <a className="navbar-brand ">
                        <img src={reactLogo} alt="avatar" width="32" height="32" className="rounded-circle border border-1 border-secondary" />
                    </a>
                    {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon "></span>
                    </button> */}
                    <button className="btn btn-outline-light d-inline-block d-md-none ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto">
                            {auth.isLogin &&
                                <li>
                                    <NavLink to={'/dashboard'} className="nav-link px-2">Dashboard</NavLink>
                                </li>}
                            <li>
                                <NavLink to={'/help'} className="nav-link px-2">Help?</NavLink>
                            </li>
                            {/* <li><a href="#" className="nav-link px-2 active">Home</a></li>
                                <li><a href="#" className="nav-link px-2">About</a></li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Others
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item">Account</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li> */}
                        </ul>

                        <ul className="navbar-nav ms-auto gap-2 my-auto">
                            <li className="nav-item me-3 mt-2 mt-sm-0">
                                <form className="d-flex">
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                    {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                                </form>
                            </li>
                            {!auth.isLogin &&
                            <li className="nav-item my-auto">
                                <div className="d-flex gap-2">
                                    <NavLink to={'/auth/login'} className="btn btn-outline-light">Login</NavLink>
                                    <NavLink to={'/auth/register'} className="btn btn-warning">Sign-up</NavLink>
                                </div>
                            </li>}
                            <li className="nav-item my-auto">
                                <LangSwitcher />
                            </li>
                            <li className="nav-item dropdown my-auto">
                                <ProfileControl />
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    )
}