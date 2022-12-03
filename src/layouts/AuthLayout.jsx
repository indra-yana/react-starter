import React from "react";
import { Outlet } from "react-router-dom";
import PageNavbar from "../components/navigation/PageNavbar";

export default function AuthLayout(props) {
    return(
        <>
            <div className="container">
                <PageNavbar/>
                <Outlet/>
            </div>
        </>
    )
}