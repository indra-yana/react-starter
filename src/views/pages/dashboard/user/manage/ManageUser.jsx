import { Toast } from "../../../../../utils/alert";
import { useAuthContext } from "../../../../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { NavLink, useOutletContext } from "react-router-dom";
import { usePageTitle } from "../../../../../hooks/usePageTitle"
import { UserService } from "../../../../../core/service/UserService";
import Breadcrumb from "../../../../components/utility/Breadcrumb";
import BreadcrumbItem from "../../../../components/utility/BreadcrumbItem";
import DataTable from 'react-data-table-component';
import ButtonEdit from "../../../../components/button/ButtonEdit";
import ButtonDelete from "../../../../components/button/ButtonDelete";
import ButtonCreate from "../../../../components/button/ButtonCreate";
import Card from "../../../../components/utility/Card";



export default function ManageUser(props) {
    const columns = [
        {
            name: 'Name',
            selector: (row) => row.name,
        },
        {
            name: 'Email',
            selector: (row) => row.email,
        },
        {
            name: 'Username',
            selector: (row) => row.username,
        },
        {
            name: 'Verified At',
            selector: (row) => row.emailVerifiedAt,
            cell: (row) => row.emailVerifiedAt ?? 'N/A',
        },
        {
            name: 'Actions',
            button: true,
            cell: (row) =>
                <>
                    <ButtonEdit onClick={(e) => handleEdit(row)} />
                    <ButtonDelete onClick={(e) => handleDelete(row)} />
                </>
        },
    ];

    usePageTitle('Manage User');
    const { auth } = useAuthContext();
    const { isLoading, setIsLoading, setAlert } = useOutletContext();
    const { isLogin = false, user = {} } = auth;
    const { listState, list } = UserService();
    const [userList, setUserList] = useState([]);

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
        list();
    }, []);

    function handleCreate() {
        console.log('Create');
    }

    function handleEdit(row) {
        console.log(row);
    }

    function handleDelete(row) {
        console.log(row);
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
                        <Card title="Registered User">
                            <NavLink to={'create'} className={'btn btn-sm btn-warning m-1'}>
                                <i className="fas fa-pencil-alt me-2"></i>
                                Create New
                            </NavLink>
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