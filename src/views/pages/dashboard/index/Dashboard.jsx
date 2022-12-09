import { useLocation } from "react-router-dom";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import { usePageTitle } from "../../../../hooks/usePageTitle"
import Breadcrumb from "../../../components/utility/Breadcrumb";
import BreadcrumbItem from "../../../components/utility/BreadcrumbItem";

export default function Dashboard(props) {
    usePageTitle('Dashboard');
    const { auth } = useAuthContext();
    const { isLogin = false, user = {} } = auth;

    return (
        <>
            <section className="px-3">
                <Breadcrumb>
                    <BreadcrumbItem title="Dashboard" link="/dashboard" />
                    <BreadcrumbItem title="Index" active />
                </Breadcrumb>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <h5 className="card-header">Overview</h5>
                            <div className="card-body">
                                <h5 className="card-title">Welcome back <i>{user.name || ''}</i></h5>
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}