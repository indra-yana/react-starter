import { dateFormat } from "src/utils/dateformater";
import { RoleService } from "src/core/service/RoleService";
import { Toast } from "src/utils/alert";
import { useNavigate, useOutletContext } from "react-router-dom";
import { usePageTitle } from "src/hooks/usePageTitle"
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Breadcrumb from "src/views/components/utility/Breadcrumb";
import BreadcrumbItem from "src/views/components/utility/BreadcrumbItem";
import ButtonCreate from "src/views/components/button/ButtonCreate";
import ButtonDelete from "src/views/components/button/ButtonDelete";
import ButtonEdit from "src/views/components/button/ButtonEdit";
import Card from "src/views/components/utility/Card";
import DataTable from "react-data-table-component";

export default function ManageRole(props) {
    usePageTitle('Manage Role');
    const { t } = useTranslation();

    const columns = [
        {
            name: t('label.name'),
            selector: (row) => row.name,
        },
        {
            name: t('label.created_at'),
            selector: (row) => row.created_at,
            cell: (row) => dateFormat(row.created_at),
        },
        {
            name: t('label.actions'),
            button: true,
            cell: (row) =>
                <>
                    <ButtonEdit onClick={(e) => navigate(`edit/${row.id}`)} />
                    <ButtonDelete onClick={(e) => handleDelete(row)} />
                </>
        },
    ];

    const { isLoading, setIsLoading, setAlert } = useOutletContext();
    const { listState, deleteState, list, deleteData } = RoleService();
    const [roleList, setRoleList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(listState.LOADING);

        if (listState.SUCCESS) {
            const { message, data = {} } = listState.RESULT;
            setRoleList(data);
        } else if (listState.ERROR) {
            const { message, error = {} } = listState.RESULT;

            setAlert({
                show: true,
                type: 'error',
                message,
            });

            Toast.error(message);
        }
    }, [listState]);
    
    useEffect(() => {
        setIsLoading(deleteState.LOADING);

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
                    <BreadcrumbItem title="User" link="/dashboard/user/role" />
                    <BreadcrumbItem title="Role" active />
                </Breadcrumb>
                <div className="row">
                    <div className="col-md-12">
                        <Card title={t('label.role_management')}>
                            <ButtonCreate text={t('label.create_new')} onClick={(e) => navigate(`create`)} />
                            <DataTable
                                columns={columns}
                                data={roleList}
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