import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import PageNavbar from "../components/navigation/PageNavbar";
import Alert from "../components/utility/Alert";
import { useLoadingState } from "../hooks/useLoadingState";

export default function AuthLayout(props) {
    const [navTitle, setNavTitle] = useState("");
    const [alert, setAlert] = useState({});
    const [isLoading, setIsLoading] = useLoadingState(false);

    return(
        <>
            <div className="container">
                <PageNavbar navTitle={navTitle} />
                <main id="main" className="vh-100">
                    <Alert className="mt-4" alert={alert} onAlertCloseClick={() => setAlert({})} />
                    <Outlet context={{ setNavTitle, setAlert, setIsLoading }}/>
                </main>
            </div>
        </>
    )
}