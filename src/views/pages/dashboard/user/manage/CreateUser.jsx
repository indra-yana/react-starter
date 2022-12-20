import { handleInputType } from "../../../../../utils/input-helper";
import { Toast } from "../../../../../utils/alert";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
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

                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="password">Password <span className="text-danger">*</span></label>
                                    <input type="password" name="password" id="password" value={form.password} onChange={handleInputChange} className={`form-control ${validation.password && 'is-invalid'}`} placeholder="Enter password" required autoComplete="new-password" />
                                    <ValidationFeedback validation={validation.password} />
                                </div>

                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="password_confirmation">Repeat Password <span className="text-danger">*</span></label>
                                    <input type="password" name="password_confirmation" id="password_confirmation" value={form.password_confirmation} onChange={handleInputChange} className={`form-control ${validation.password_confirmation && 'is-invalid'}`} placeholder="Enter password confirmation" required />
                                    <ValidationFeedback validation={validation.password_confirmation} />
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