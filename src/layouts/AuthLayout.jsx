import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import PageNavbar from "../components/navigation/PageNavbar";
import { useLoadingState } from "../hooks/useLoadingState";

export default function AuthLayout(props) {
    const [navTitle, setNavTitle] = useState("");
    const [isLoading, setIsLoading] = useLoadingState(false);

    return(
        <>
            <div className="container">
                <PageNavbar navTitle={navTitle} />
                <main id="main" className="vh-100">
                    <Outlet context={{ setNavTitle, setIsLoading }}/>
                </main>
            </div>
        </>
    )
}