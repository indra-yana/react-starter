import { useOutletContext } from "react-router-dom";
import { useAuthContext } from "src/hooks/useAuthContext";
import { useEffect, useState } from "react";
import { usePageTitle } from "src/hooks/usePageTitle"
import { useTranslation } from "react-i18next";

export default function ManageProfile(props) {
    const { t } = useTranslation();

    usePageTitle('Manage Profile');
    const { auth } = useAuthContext();
    const { isLoading, setIsLoading, setAlert } = useOutletContext();
    const { isLogin = false, user = {} } = auth;
    const [userList, setUserList] = useState([]);

    useEffect(() => {

    }, []);

    return (
        <>
            <section className="px-3">
                <div className="row">
                    <div className="col-md-12">
                        <h4>TODO: Profile Management</h4>
                    </div>
                </div>
            </section>
        </>
    )
}