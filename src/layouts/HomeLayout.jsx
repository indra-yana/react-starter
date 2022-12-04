import React from "react";
import { Outlet } from "react-router-dom";
import BottomAppBar from "../components/navigation/BottomAppBar";
import HomeNavbar from "../components/navigation/HomeNavbar";
import { useLoadingState } from "../hooks/useLoadingState";

export default function HomeLayout(props) {
    const [isLoading, setIsLoading] = useLoadingState(false);

    return(
        <>
            <div className="container">
                <HomeNavbar/>
                <main id="main" className="pb-5 vh-100">
                    <Outlet context={{ setIsLoading }}/>
                </main>
                <BottomAppBar/>
            </div>
        </>
    )
}