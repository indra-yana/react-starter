import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
import { Toast } from "../../../../../utils/alert";
import { useAuthContext } from "../../../../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { usePageTitle } from "../../../../../hooks/usePageTitle"
import { UserService } from "../../../../../core/service/UserService";
import Breadcrumb from "../../../../components/utility/Breadcrumb";
import BreadcrumbItem from "../../../../components/utility/BreadcrumbItem";
import ButtonDelete from "../../../../components/button/ButtonDelete";
import ButtonEdit from "../../../../components/button/ButtonEdit";
import Card from "../../../../components/utility/Card";
import DataTable from 'react-data-table-component';
import ButtonCreate from "../../../../components/button/ButtonCreate";
import { useTranslation } from "react-i18next";

export default function ManageUser(props) {
    const { t } = useTranslation();

    const columns = [
        {
            name: t('label.name'),
            selector: (row) => row.name,
        },
        {
            name: t('label.email'),
            selector: (row) => row.email,
        },
        {
            name: t('label.username'),
            selector: (row) => row.username,
        },
        {
            name: t('label.verified_at'),
            selector: (row) => row.emailVerifiedAt,
            cell: (row) => row.emailVerifiedAt ?? 'N/A',
        },
        {
            name: t('label.actions'),
            button: true,
            cell: (row) =>
                <>
                    <ButtonEdit onClick={(e) => navigate(`edit/${row.id}`)} />
                    {user.id !== row.id && <ButtonDelete onClick={(e) => handleDelete(row)} />}
                </>
        },
    ];

    usePageTitle('Manage User');
    const { auth } = useAuthContext();
    const { isLoading, setIsLoading, setAlert } = useOutletContext();
    const { isLogin = false, user = {} } = auth;
    const { listState, deleteState, list, deleteData } = UserService();
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(listState.LOADING);

        if (listState.SUCCESS) {
            const { message, data = {} } = listState.RESULT;
            setUserList(data);
        } else if (listState.ERROR) {
            const { message, error = {} } = listState.RESULT;
            setValidation(error);

            setAlert({
                show: true,
                type: 'error',
                message,
            });

            Toast.error(message);
        }
    }, [listState]);
    
    useEffect(() => {
        setIsLoading(listState.LOADING);

        if (deleteState.SUCCESS) {
            const { message, data = {} } = deleteState.RESULT;

            setAlert({
                show: true,
                type: 'success',
                autoClose: true,
                message,
            });
            Toast.success(message);

            list();
        } else if (deleteState.ERROR) {
            const { message, error = {} } = deleteState.RESULT;

            setAlert({
                show: true,
                type: 'error',
                message,
            });

            Toast.error(message);
        }
    }, [deleteState]);

    useEffect(() => {
        list();
    }, []);

    function handleDelete(row) {
        Toast.delete().then(async (result) => {
            if (result.isConfirmed) {
                await deleteData(row.id);
            }
        })
    }

    return (
        <>
            <section className="px-3">
                <Breadcrumb>
                    <BreadcrumbItem title="User" link="/dashboard/user/manage" />
                    <BreadcrumbItem title="Manage" active />
                </Breadcrumb>
                <div className="row">
                    <div className="col-md-12">
                        <Card title={t('label.registered_user')}>
                            <ButtonCreate text={t('label.create_new')} onClick={(e) => navigate(`create`)} />
                            <DataTable
                                columns={columns}
                                data={userList}
                                highlightOnHover
                                striped
                                pagination
                                responsive
                                progressPending={isLoading}
                            />
                        </Card>
                    </div>
                </div>
            </section>
        </>
    )
}