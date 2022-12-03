import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import reactLogo from "../../assets/react.svg"

export default function HomeNavbar(props) {
    const { isLogin, setIsLogin } = useState();

    return (
        <>
            <div className="container sticky-top p-0">
                <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow-sm mb-3 px-3 rounded">
                    <a className="navbar-brand ">
                        <img src={reactLogo} alt="avatar" width="32" height="32" className="rounded-circle border border-1 border-secondary" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon "></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto">
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

                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item me-3 mt-2 mt-sm-0">
                                <form className="d-flex">
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                    {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                                </form>
                            </li>
                            {!isLogin &&
                                <li className="nav-item mt-2 mt-sm-0">
                                    <div className="d-flex gap-2">
                                        <NavLink to={'/auth/login'} className="btn btn-outline-light">Login</NavLink>
                                        <button type="button" className="btn btn-warning me-2" >Sign-up</button>
                                    </div>
                                </li>}
                            {isLogin &&
                                <li className="nav-item dropdown mt-2 mt-sm-0">
                                    <a id="navbarDropdown" className="nav-link dropdown-toggle p-1" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                        <img src="/vite.svg" alt="avatar" width="32" height="32" className="rounded-circle border border-1 border-secondary" />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="#">Name</a></li>
                                        <li><a className="dropdown-item" href="#">Email</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><a className="dropdown-item" style={{ cursor: 'pointer', }}>Logout</a></li>
                                    </div>
                                </li>}
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    )
}