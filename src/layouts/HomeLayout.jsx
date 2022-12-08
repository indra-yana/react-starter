import { Outlet, useOutletContext } from "react-router-dom";
import { useLoadingState } from "../hooks/useLoadingState";
import BottomAppBar from "../components/navigation/BottomAppBar";
import HomeNavbar from "../components/navigation/HomeNavbar";
import React from "react";

export default function HomeLayout(props) {
    const { auth, setAuth } = useOutletContext();
    const [isLoading, setIsLoading] = useLoadingState(false);

    return (
        <>
            <div className="container">
                <HomeNavbar />
                <main id="main" className="pb-5 vh-100">
                    <Outlet context={{
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