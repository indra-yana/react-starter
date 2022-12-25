import { handleInputType } from "../../../../../utils/input-helper";
import { RoleService } from "../../../../../core/service/RoleService";
import { Toast } from "../../../../../utils/alert";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { usePageTitle } from "../../../../../hooks/usePageTitle"
import { useTranslation } from "react-i18next";
import Breadcrumb from "../../../../components/utility/Breadcrumb";
import BreadcrumbItem from "../../../../components/utility/BreadcrumbItem";
import ButtonSpinner from "../../../../components/button/ButtonSpinner";
import Card from "../../../../components/utility/Card";
import FormInput from "../../../../components/form/FormInput";

const defaultForm = {
    name: "",
}

export default function CreateRole(props) {
    usePageTitle('Create Role');
    const { t } = useTranslation();
    const { isLoading, setIsLoading, setAlert } = useOutletContext();
    const { createState, create } = RoleService();

    const [validation, setValidation] = useState({});
    const [form, setForm] = useState(defaultForm);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(createState.LOADING);

        if (createState.SUCCESS) {
            const { message, data = {} } = createState.RESULT;
            setAlert({
                show: true,
                type: 'success',
                autoClose: true,
                message,
            });

            Toast.success(message);
            resetForm();

            setTimeout(() => navigate('/dashboard/user/role'), 2000);
            console.log(data);
        } else if (createState.ERROR) {
            const { message, error = {} } = createState.RESULT;
            setValidation(error);

            setAlert({
                show: true,
                type: 'error',
                message,
            });

            Toast.error(message);
        }
    }, [createState]);

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
        await create(form);
    }

    function resetForm() {
        setForm(defaultForm);
    }

    return (
        <>
            <section className="px-3">
                <Breadcrumb>
                    <BreadcrumbItem title="Role" link="/dashboard/user/role" />
                    <BreadcrumbItem title="Manage" link="/dashboard/user/role" />
                    <BreadcrumbItem title="Create" active />
                </Breadcrumb>
                <div className="row">
                    <div className="col-md-12">
                        <Card title={t('label.create_new_role')} onBackHandler={'/dashboard/user/role'}>
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