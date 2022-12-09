import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect } from "react";
import { useLoadingState } from "../../hooks/useLoadingState";
import { useState } from "react";
import Alert from "../components/utility/Alert";
import BottomAppBar from "../components/navigation/BottomAppBar";
import DashboardNavbar from "../components/navigation/DashboardNavbar";

export default function DashboardLayout(props) {
    const { auth, setAuth } = useAuthContext();
    const [isLoading, setIsLoading] = useLoadingState(false);
    const [navTitle, setNavTitle] = useState("");
    const [alert, setAlert] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isLogin) {
            navigate('/auth/login');
        } else {
            if (auth.user.emailVerifiedAt === null) {
                navigate(`/auth/verify/undefined?email=${auth.user.email}`);
            }
        }
    }, [auth.isLogin]);

    return (
        <>
            <div className="container">
                <DashboardNavbar navTitle={navTitle} />
                <main id="main" className="pb-5 vh-100">
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
                <BottomAppBar />
            </div>
        </>
    )
}