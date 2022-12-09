import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function BottomAppBar(props) {
    return (
        <>
            <div className="container px-0 fixed-bottom" style={{ maxWidth: '640px' }}>
                <nav className="navbar navbar-dark bg-dark navbar-expand p-0 rounded-top">
                    <ul className="navbar-nav nav-justified w-100">
                        <li className="nav-item">
                            <NavLink to={'/'} className="nav-link text-center">
                                <i className="fas fa-house"></i>
                                <span className="small d-block">Home</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/dashboard'} className="nav-link text-center">
                                <i className="fas fa-dashboard"></i>
                                <span className="small d-block">Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="nav-item dropup">
                            <NavLink className="nav-link text-center" role="button" id="dropdownMenuProfile" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-bars"></i>
                                <span className="small d-block">Others</span>
                            </NavLink>

                            <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end d-grid gap-1 p-2 rounded-3 mx-0 border-0 shadow w-220px" aria-labelledby="dropdownMenuProfile">
                                <li><a className="dropdown-item rounded-2 active" href="#">Edit Profile</a></li>
                                <li><a className="dropdown-item rounded-2" href="#">Notification</a></li>
                                <li><a className="dropdown-item rounded-2" href="#">Something else here</a></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><a className="dropdown-item rounded-2" href="#">Separated link</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}