import { Outlet } from "react-router-dom";
import { useAuthContext } from "src/hooks/useAuthContext";
import { useLoadingState } from "src/hooks/useLoadingState";
import Alert from "src/views/components/utility/Alert";
import PageNavbar from "src/views/components/navigation/PageNavbar";
import React, { useState } from "react";

export default function AuthLayout(props) {
    const { auth, setAuth } = useAuthContext();

    const [navTitle, setNavTitle] = useState("");
    const [alert, setAlert] = useState({});
    const [isLoading, setIsLoading] = useLoadingState(false);

    return (
        <>
            <div className="container">
                <PageNavbar navTitle={navTitle} />
                <main id="main" className="vh-100">
                    <Alert className="mt-4" alert={alert} onAlertCloseClick={() => setAlert({})} />
                    <Outlet context={{
                        setNavTitle,
                        setAlert,
                        setIsLoading,
                        isLoading,
                        auth,
                        setAuth,
                    }} />
                </main>
            </div>
        </>
    )
}