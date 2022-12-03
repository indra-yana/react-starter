import React from "react";
import { Outlet } from "react-router-dom";
import BottomAppBar from "../components/navigation/BottomAppBar";
import HomeNavbar from "../components/navigation/HomeNavbar";

export default function HomeLayout(props) {
    return(
        <>
            <div className="container">
                <HomeNavbar/>
                <main className="pb-5 vh-100">
                    <Outlet/>
                </main>
                <BottomAppBar/>
            </div>
        </>
    )
}