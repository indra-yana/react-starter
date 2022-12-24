import { handleInputType } from "../../../utils/input-helper";
import { Link, useOutletContext } from "react-router-dom";
import { Toast } from "../../../utils/alert";
import { useEffect } from "react";
import { usePageTitle } from "../../../hooks/usePageTitle";
import { useTranslation } from "react-i18next";
import AuthService from "../../../core/service/AuthService";
import AvatarPreview from "../../components/utility/AvatarPreview";
import ButtonSpinner from "../../components/button/ButtonSpinner";
import FormInput from "../../components/form/FormInput";
import React, { useState } from "react";
import SocialLogin from "../../components/utility/SocialLogin";

const defaultPreview = '/assets/img/user.png';
const defaultForm = {
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    avatar: null,
}

export default function Register(props) {
    usePageTitle('Register');
    const { isLoading, setIsLoading, setAlert } = useOutletContext();
    const { registerState, register } = AuthService();
    const { t } = useTranslation();

    const [validation, setValidation] = useState({});
    const [avatarPreview, setAvatarPreview] = useState(defaultPreview);
    const [form, setForm] = useState(defaultForm);

    useEffect(() => {
        setIsLoading(registerState.LOADING);

        if (registerState.SUCCESS) {
            const { message, data = {} } = registerState.RESULT;
            setAlert({
                show: true,
                type: 'success',
                autoClose: true,
                message,
            });

            Toast.success(message);
            resetForm();
            console.log(data);
        } else if (registerState.ERROR) {
            const { message, error = {} } = registerState.RESULT;
            setValidation(error);

            setAlert({
                show: true,
                type: 'error',
                message,
            });

            Toast.error(message);
        }

    }, [registerState])

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
        await register(form);
    }

    function resetForm() {
        setForm(defaultForm);
        setAvatarPreview(defaultPreview);
    }

    return (
        <>
            <section className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="/assets/img/draw2.webp" className="img-fluid" alt="Sample image" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 py-4">
                        <form onSubmit={handleSubmit}>

                            <SocialLogin />

                            <FormInput type="text" name="name" handleId="name" value={form.name} onChange={handleInputChange} validation={validation} label={t('label.name')} placeholder={t('placeholder.name')} required />

                            <FormInput ype="text" name="username" handleId="username" value={form.username} onChange={handleInputChange} validation={validation} label={t('label.username')} placeholder={t('placeholder.username')} required />

                            <FormInput type="email" name="email" handleId="email" value={form.email} onChange={handleInputChange} validation={validation} label={t('label.email')} placeholder={t('placeholder.email_address')} required autoComplete="new-password" />

                            <FormInput type="password" name="password" handleId="password" value={form.password} onChange={handleInputChange} validation={validation} label={t('label.password')} placeholder={t('placeholder.password')} required autoComplete="new-password" />

                            <FormInput type="password" name="password_confirmation" handleId="password_confirmation" value={form.password_confirmation} onChange={handleInputChange} validation={validation} label={t('label.password_confirmation')} placeholder={t('placeholder.password_confirmation')} required autoComplete="new-password" />

                            <div className="mb-3">
                                <FormInput type="file" name="avatar" handleId="avatar-preview"  validation={validation} onChange={handleInputChange} label={t('label.avatar')} accept="image/*" />
                                <AvatarPreview src={avatarPreview} handleId={'avatar-preview'} />
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <ButtonSpinner type="submit" isLoading={isLoading} text={t('label.register')} />
                                <p className="small fw-bold mt-2 pt-1 mb-0">{t('label.already_have_account')}
                                    <Link to={'/auth/login'} className="link-danger"> {t('label.login')}</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}