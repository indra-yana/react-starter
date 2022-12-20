import { useAuthContext } from "../../../../hooks/useAuthContext";
import { usePageTitle } from "../../../../hooks/usePageTitle"
import { useTranslation } from 'react-i18next';
import Breadcrumb from "../../../components/utility/Breadcrumb";
import BreadcrumbItem from "../../../components/utility/BreadcrumbItem";
import { Link } from "react-router-dom";

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
                            <h5 className="card-header">{t('label.overview')}</h5>
                            <div className="card-body">
                                <h5 className="card-title">{t('message.welcome_back', { name: user.name || '' })}</h5>
                                <p className="card-text">{t('label.help_description')}</p>
                                <Link to={'/help'} className="btn btn-primary">{t('label.help')}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}