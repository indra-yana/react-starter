import React, { useEffect, useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import PageNavbar from "../components/navigation/PageNavbar";

export default function AuthLayout(props) {
    const [navTitle, setNavTitle] = useState("");
    const navigation = useNavigation();

    return(
        <>
            <div className="container">
                <PageNavbar navTitle={navTitle} />
                <main id="main" className={`vh-100 ${navigation.state === 'loading' ? 'loading' : ''}`} >
                    <Outlet context={{ setNavTitle }}/>
                </main>
            </div>
        </>
    )
}