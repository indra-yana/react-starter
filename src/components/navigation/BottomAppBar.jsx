import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function BottomAppBar(props) {
    return (
        <>
            <div className="container px-0 fixed-bottom" style={{ maxWidth: '640px' }}>
                <nav className="navbar navbar-dark bg-dark navbar-expand p-0 rounded-top">
                    <ul className="navbar-nav nav-justified w-100">
                        <li className="nav-item">
                            <a href="#" className="nav-link text-center active">
                                <i className="fas fa-house"></i>
                                <span className="small d-block">Home</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <Link to={'/contacts'} className="nav-link text-center">
                                <i className="fas fa-dashboard"></i>
                                <span className="small d-block">Dashboard</span>
                            </Link>
                        </li>
                        <li className="nav-item dropup">
                            <Link className="nav-link text-center" role="button" id="dropdownMenuProfile" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-bars"></i>
                                <span className="small d-block">Others</span>
                            </Link>

                            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuProfile">
                                <a className="dropdown-item" href="#">Edit Profile</a>
                                <a className="dropdown-item" href="#">Notification</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Logout</a>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}