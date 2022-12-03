import React from "react";
import { Outlet } from "react-router-dom";
import BottomAppBar from "../components/navigation/BottomAppBar";
import HomeNavbar from "../components/navigation/HomeNavbar";

export default function HomeLayout(props) {
    return(
        <>
            <div className="container">
                <HomeNavbar/>
                <Outlet/>
                <BottomAppBar/>
            </div>
        </>
    )
}