import { Outlet } from "react-router-dom";
import { useLoadingState } from "src/hooks/useLoadingState";
import BottomAppBar from "src/views/components/navigation/BottomAppBar";
import HomeNavbar from "src/views/components/navigation/HomeNavbar";
import React from "react";
import { useAuthContext } from "src/hooks/useAuthContext";

export default function HomeLayout(props) {
    const { auth, setAuth } = useAuthContext();
    const [isLoading, setIsLoading] = useLoadingState(false);

    return (
        <>
            <div className="container">
                <HomeNavbar />
                <main id="main" className="pb-5">
                    <Outlet context={{
                        setIsLoading,
                        isLoading,
                        auth,
                        setAuth,
                    }} />
                </main>
                {/* <BottomAppBar /> */}
            </div>
        </>
    )
}