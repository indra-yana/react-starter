import { NavLink, useNavigate, useNavigation, useOutletContext, useSearchParams } from "react-router-dom";
import { Toast } from "src/utils/alert";
import { useAuthContext } from "src/hooks/useAuthContext";
import { useEffect, useState } from "react";
import { usePageTitle } from "src/hooks/usePageTitle"
import { UserService } from "src/core/service/UserService";
import { useTranslation } from "react-i18next";
import Breadcrumb from "src/views/components/utility/Breadcrumb";
import BreadcrumbItem from "src/views/components/utility/BreadcrumbItem";
import { link } from "src/router/navlinks";
import ManageProfile from "./profile/ManageProfile";
import Tab from "src/views/components/utility/Tab";
import ChangePassword from "./password/ChangePassword";

const tabData = [
    {
        title: "Profile",
        content: <ManageProfile />,
    },
    {
        title: "Change Password",
        content: <ChangePassword />,
    },
];

export default function Setting(props) {
    const { t } = useTranslation();

    usePageTitle('Settings');
    const { auth } = useAuthContext();
    const { isLoading, setIsLoading, setAlert } = useOutletContext();
    const { isLogin = false, user = {} } = auth;
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const defaultTab = searchParams.get('tab') || 0;

    useEffect(() => {

    }, []);

    return (
        <>
            <section className="px-3">
                <Breadcrumb>
                    <BreadcrumbItem title="Setting" link={link.getPath('setting')} />
                    <BreadcrumbItem title="Manage" active />
                </Breadcrumb>
                <div className="row">
                    <div className="col-md-12">
                        <Tab tabs={tabData} active={defaultTab} />
                    </div>
                </div>
            </section>
        </>
    )
}
