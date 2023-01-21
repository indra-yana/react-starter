import { useOutletContext } from "react-router-dom";
import { useAuthContext } from "src/hooks/useAuthContext";
import { useEffect, useState } from "react";
import { usePageTitle } from "src/hooks/usePageTitle"
import { useTranslation } from "react-i18next";

export default function ChangePassword(props) {
    const { t } = useTranslation();

    usePageTitle('Change Password');
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
                        <h4>TODO: Change Password</h4>
                    </div>
                </div>
            </section>
        </>
    )
}