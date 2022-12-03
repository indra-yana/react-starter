import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PageNavbar from "../components/navigation/PageNavbar";

export default function AuthLayout(props) {
    const [navTitle, setNavTitle] = useState("");

    return(
        <>
            <div className="container">
                <PageNavbar navTitle={navTitle} />
                <main className="vh-100">
                    <Outlet context={{ setNavTitle }}/>
                </main>
            </div>
        </>
    )
}