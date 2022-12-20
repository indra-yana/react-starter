import { useAuthContext } from "../../../../hooks/useAuthContext";
import { usePageTitle } from "../../../../hooks/usePageTitle"
import { useTranslation } from 'react-i18next';
import Breadcrumb from "../../../components/utility/Breadcrumb";
import BreadcrumbItem from "../../../components/utility/BreadcrumbItem";

export default function Dashboard(props) {
    usePageTitle('Dashboard');
    const { t } = useTranslation();
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
                                <h5 className="card-title">{t('message.welcome_back', {name: user.name || ''})}</h5>
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}