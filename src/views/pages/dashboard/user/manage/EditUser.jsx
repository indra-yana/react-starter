import { handleInputType } from "../../../../../utils/input-helper";
import { Toast } from "../../../../../utils/alert";
import { useAuthContext } from "../../../../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { usePageTitle } from "../../../../../hooks/usePageTitle"
import { UserService } from "../../../../../core/service/UserService";
import Breadcrumb from "../../../../components/utility/Breadcrumb";
import BreadcrumbItem from "../../../../components/utility/BreadcrumbItem";
import ButtonSpinner from "../../../../components/button/ButtonSpinner";
import Card from "../../../../components/utility/Card";
import ValidationFeedback from "../../../../components/form/ValidationFeedback";
import { useTranslation } from "react-i18next";

const defaultPreview = '/assets/img/user.png';
const defaultForm = {
    id: "",
    name: "",
    username: "",
    email: "",
    avatar: null,
}

export default function EditUser(props) {
    usePageTitle('Edit User');
    const { isLoading, setIsLoading, setAlert } = useOutletContext();
    const { updateState, showState, show, update } = UserService();
    const { auth, setAuth } = useAuthContext();
    const { t } = useTranslation();

    const [avatarPreview, setAvatarPreview] = useState(defaultPreview);
    const [validation, setValidation] = useState({});
    const [form, setForm] = useState(defaultForm);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        show(id);
    }, [])

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

            const {
                id,
                name,
                username,
                email,
                avatar,
            } = data;

            if (avatar && auth.user.id === id) {
                setAuth((prevAuth) => ({
                    ...prevAuth,
                    user: {
                        ...auth.user,
                        name,
                        username,
                        email,
                        avatar
                    }
                }));
            }

            setTimeout(() => navigate('/dashboard/user/manage'), 2000);
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
                username,
                email,
                avatar,
            } = data;

            setForm((prevState) => ({
                ...prevState,
                id,
                name,
                username,
                email,
            }));

            if (avatar) {
                setAvatarPreview(avatar);
            }
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

        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (name === 'avatar' && value) {
            setAvatarPreview(URL.createObjectURL(value));
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await update(form);
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
                        <Card title={t('label.edit_user')} onBackHandler={'/dashboard/user/manage'}>
                            <form onSubmit={handleSubmit} autoComplete="off">
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="name">Name <span className="text-danger">*</span></label>
                                    <input type="text" name="name" id="name" value={form.name} onChange={handleInputChange} className={`form-control ${validation.name && 'is-invalid'}`} placeholder="Enter your name" required />
                                    <ValidationFeedback validation={validation.name} />
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="username">Username <span className="text-danger">*</span></label>
                                    <input type="text" name="username" id="username" value={form.username} onChange={handleInputChange} className={`form-control ${validation.username && 'is-invalid'}`} placeholder="Enter your unique name" required autoComplete="new-password" />
                                    <ValidationFeedback validation={validation.username} />
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="email">Email address <span className="text-danger">*</span></label>
                                    <input type="email" name="email" id="email" value={form.email} onChange={handleInputChange} className={`form-control ${validation.email && 'is-invalid'}`} placeholder="Enter a valid email address" required />
                                    <ValidationFeedback validation={validation.email} />
                                </div>

                                <div className="row">
                                    <div className="col-lg-6 col-md-12">
                                        <div className="form-outline mb-3">
                                            <label className="form-label" htmlFor="avatar">Avatar</label>
                                            <input type="file" name="avatar" id="avatar" onChange={handleInputChange} className={`form-control ${validation.avatar && 'is-invalid'}`} accept="image/*" />
                                            <ValidationFeedback validation={validation.avatar} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-12">
                                        <img className="img-fluid rounded-circle border border-1 border-secondary avatar-95" src={avatarPreview} id="img-preview" alt="Avatar" />
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