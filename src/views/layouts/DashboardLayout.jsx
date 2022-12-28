import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "src/hooks/useAuthContext";
import { useEffect } from "react";
import { useLoadingState } from "src/hooks/useLoadingState";
import { useState } from "react";
import Alert from "src/views/components/utility/Alert";
import DashboardNavbar from "src/views/components/navigation/DashboardNavbar";
import ProfileControl from "src/views/components/utility/ProfileControl";
import SideBarMenu from "src/views/components/navigation/SideBarMenu";

export default function DashboardLayout(props) {
    const [navTitle, setNavTitle] = useState("");
    const [isLoading, setIsLoading] = useLoadingState(false);
    const [alert, setAlert] = useState({});
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const { auth, setAuth } = useAuthContext();
    const { isLogin = false, user = {} } = auth;

    useEffect(() => {
        if (!isLogin) {
            navigate('/auth/login');
        } else {
            if (user.emailVerifiedAt === null) {
                navigate(`/auth/verify/undefined?email=${user.email}`);
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
                        <form className="d-flex mb-3" role="search" onSubmit={(e) => e.preventDefault()}>
                            <input className="form-control form-control-xs" type="search" placeholder="Search Menu" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                            {/* <button className="btn btn-outline-light ms-2" type="submit">
                                <i className="fas fa-search"></i>
                            </button> */}
                        </form>

                        <SideBarMenu search={search} />

                    </div>
                    <div className="footer bottom px-3 pb-3 pt-2">
                        <small className="text-muted">
                            Copyright &copy; All rights reserved | This template is made with <i className="text-white fas fa-coffee mx-1" aria-hidden="true"></i>
                            <br />
                            by <a className="text-white fst-italic text-muted" href="mailto:indra.ndra26@gmail.com"> -- Indra Yana</a>
                        </small>
                    </div>
                </nav>

                <div id="content" className="p-2 p-md-3">
                    <DashboardNavbar />
                    <main id="main" className="py-5">
                        <Alert className="my-2" alert={alert} onAlertCloseClick={() => setAlert({})} />
                        <Outlet context={{
                            setNavTitle,
                            setAlert,
                            alert,
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