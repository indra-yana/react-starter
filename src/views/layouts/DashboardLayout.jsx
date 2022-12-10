import { Form, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect } from "react";
import { useLoadingState } from "../../hooks/useLoadingState";
import { useState } from "react";
import Alert from "../components/utility/Alert";
import ProfileControl from "../components/utility/ProfileControl";
import DashboardNavbar from "../components/navigation/DashboardNavbar";

export default function DashboardLayout(props) {
    const { auth, setAuth } = useAuthContext();
    const [isLoading, setIsLoading] = useLoadingState(false);
    const [navTitle, setNavTitle] = useState("");
    const [alert, setAlert] = useState({});
    const [isSearching, seIsSearching] = useState(false);
    const navigate = useNavigate();
    const user = auth.user || {};

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
            <div className="wrapper d-flex align-items-stretch">
                <nav id="sidebar-wrapper" className="rounded shadow-sm">
                    <div className="px-3 py-4  sidebar-menu">
                        {/* <a href="#" className="img logo rounded-circle mb-2" style={{ backgroundImage: "url('/assets/img/avatar-profile.png')" }}></a> */}
                        <div className="d-flex justify-content-center mb-4">
                            <ProfileControl className="mb-2" size="avatar-95" title={true} />
                        </div>
                        <hr />
                        <form className="d-flex mb-3" role="search" action="#">
                            <input className="form-control form-control-xs me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-light" type="submit">
                                <i className="fas fa-search"></i>
                            </button>
                        </form>
                        <ul className="list-unstyled components mb-5">
                            <li className="active">
                                <a className="nav-main" href="#">Dashboard</a>
                            </li>
                            <li>
                                <a className="nav-main dropdown-toggle" href="#pageSubmenu" data-bs-toggle="collapse" aria-expanded="true">User</a>
                                <ul className="collapse list-unstyled" id="pageSubmenu">
                                    <li>
                                        <a className="nav-link nav-sub" href="#"> Manage</a>
                                    </li>
                                    <li>
                                        <a className="nav-link nav-sub" href="#"> Role</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a className="nav-main" href="#">About</a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer bottom p-3">
                        <p>
                            Copyright &copy; All rights reserved | This template is made with <i className="text-white fas fa-coffee mx-1" aria-hidden="true"></i>
                            <br />
                            by <a className="text-white fst-italic" href="mailto:indra.ndra26@gmail.com"> -- Indra Yana</a>
                        </p>
                    </div>
                </nav>

                <div id="content" className="p-2 p-md-3">
                    <DashboardNavbar />
                    <main id="main" className="py-5">
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
            </div>
        </>
    )
}