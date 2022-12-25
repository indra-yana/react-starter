import { handleInputType } from "../../../../../utils/input-helper";
import { RoleService } from "../../../../../core/service/RoleService";
import { Toast } from "../../../../../utils/alert";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { usePageTitle } from "../../../../../hooks/usePageTitle"
import { useTranslation } from "react-i18next";
import Breadcrumb from "../../../../components/utility/Breadcrumb";
import BreadcrumbItem from "../../../../components/utility/BreadcrumbItem";
import ButtonSpinner from "../../../../components/button/ButtonSpinner";
import Card from "../../../../components/utility/Card";
import FormInput from "../../../../components/form/FormInput";

const defaultForm = {
    id: "",
    name: "",
}

export default function EditRole(props) {
    usePageTitle('Edit Role');
    const { t } = useTranslation();
    const { isLoading, setIsLoading, setAlert } = useOutletContext();
    const { updateState, showState, show, update } = RoleService();

    const [validation, setValidation] = useState({});
    const [form, setForm] = useState(defaultForm);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        show(id);
    }, []);

    useEffect(() => {
        setIsLoading(updateState.LOADING);

        if (updateState.SUCCESS) {
            const { message, data = {} } = updateState.RESULT;
            setAlert({
                show: true,
                type: 'success',
                autoClose: true,
                message,
            });

            Toast.success(message);

            setTimeout(() => navigate('/dashboard/user/role'), 2000);
            console.log(data);
        } else if (updateState.ERROR) {
            const { message, error = {} } = updateState.RESULT;
            setValidation(error);

            setAlert({
                show: true,
                type: 'error',
                message,
            });

            Toast.error(message);
        }
    }, [updateState]);

    useEffect(() => {
        setIsLoading(showState.LOADING);

        if (showState.SUCCESS) {
            const { message, data = {} } = showState.RESULT;
            const {
                id,
                name,
            } = data;

            setForm((prevState) => ({
                ...prevState,
                id,
                name,
            }));
        } else if (showState.ERROR) {
            const { message, error = {} } = showState.RESULT;
            setValidation(error);

            setAlert({
                show: true,
                type: 'error',
                message,
            });

            Toast.error(message);
        }
    }, [showState]);

    function handleInputChange(e) {
        const { name } = e.target;
        const value = handleInputType(e);
        delete validation[name];

        setForm((prevState) => {
            return {
                ...prevState,
                [name]: value,
            }
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await update(form);
    }

    return (
        <>
            <section className="px-3">
                <Breadcrumb>
                    <BreadcrumbItem title="Role" link="/dashboard/user/role" />
                    <BreadcrumbItem title="Manage" link="/dashboard/user/role" />
                    <BreadcrumbItem title="Edit" active />
                </Breadcrumb>
                <div className="row">
                    <div className="col-md-12">
                        <Card title={t('label.edit_role')} onBackHandler={'/dashboard/user/role'}>
                            <form onSubmit={handleSubmit} autoComplete="off">
                                <FormInput type="text" name="name" handleId="name" value={form.name} onChange={handleInputChange} validation={validation} label={t('label.name')} placeholder={t('placeholder.name')} required />

                                <hr />
                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <ButtonSpinner type="submit" variant="btn-success" isLoading={isLoading} text={t('label.save_changes')} />
                                </div>
                            </form>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    )
}