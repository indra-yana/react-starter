import { handleInputType } from "../../../../../utils/input-helper";
import { Toast } from "../../../../../utils/alert";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { usePageTitle } from "../../../../../hooks/usePageTitle"
import { UserService } from "../../../../../core/service/UserService";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../../../../components/utility/Breadcrumb";
import BreadcrumbItem from "../../../../components/utility/BreadcrumbItem";
import ButtonSpinner from "../../../../components/button/ButtonSpinner";
import Card from "../../../../components/utility/Card";
import FormInput from "../../../../components/form/FormInput";
import AvatarPreview from "../../../../components/utility/AvatarPreview";

const defaultPreview = '/assets/img/user.png';
const defaultForm = {
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    avatar: null,
}

export default function CreateUser(props) {
    usePageTitle('Create User');
    const { isLoading, setIsLoading, setAlert } = useOutletContext();
    const { createState, create } = UserService();
    const { t } = useTranslation();

    const [avatarPreview, setAvatarPreview] = useState(defaultPreview);
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

            setTimeout(() => navigate('/dashboard/user/manage'), 2000);
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

        if (name === 'avatar' && value) {
            setAvatarPreview(URL.createObjectURL(value));
        }
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
                    <BreadcrumbItem title="User" link="/dashboard/user/manage" />
                    <BreadcrumbItem title="Manage" link="/dashboard/user/manage" />
                    <BreadcrumbItem title="Create" active />
                </Breadcrumb>
                <div className="row">
                    <div className="col-md-12">
                        <Card title={t('label.create_new_user')} onBackHandler={'/dashboard/user/manage'}>
                            <form onSubmit={handleSubmit} autoComplete="off">
                                <FormInput type="text" name="name" handleId="name" value={form.name} onChange={handleInputChange} validation={validation} label={t('label.name')} placeholder={t('placeholder.name')} required />

                                <FormInput type="text" name="username" handleId="username" value={form.username} onChange={handleInputChange} validation={validation} label={t('label.username')} placeholder={t('placeholder.username')} required autoComplete="new-password" />

                                <FormInput type="email" name="email" handleId="email" value={form.email} onChange={handleInputChange} validation={validation} label={t('label.email_address')} placeholder={t('placeholder.email_address')} required />

                                <FormInput type="password" name="password" handleId="password" value={form.password} onChange={handleInputChange} validation={validation} label={t('label.password')} placeholder={t('placeholder.password')} required autoComplete="new-password" />

                                <FormInput type="password" name="password_confirmation" handleId="password_confirmation" value={form.password_confirmation} onChange={handleInputChange} validation={validation} label={t('label.password_confirmation')} placeholder={t('placeholder.password_confirmation')} required autoComplete="new-password" />

                                <div className="row">
                                    <div className="col-lg-6 col-md-12">
                                        <FormInput type="file" name="avatar" handleId="avatar-preview" onChange={handleInputChange} validation={validation} label={t('label.avatar')} accept="image/*" />
                                    </div>
                                    <div className="col-lg-6 col-md-12">
                                        <AvatarPreview src={avatarPreview} handleId={'avatar-preview'} />
                                    </div>
                                </div>

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