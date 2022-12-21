import { handleInputType } from "../../../utils/input-helper";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { Toast } from "../../../utils/alert";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { usePageTitle } from "../../../hooks/usePageTitle";
import { useTranslation } from "react-i18next";
import AuthService from "../../../core/service/AuthService";
import ButtonSpinner from "../../components/button/ButtonSpinner";
import FormInput from "../../components/form/FormInput";
import React, { useEffect, useState } from "react";
import SocialLogin from "../../components/utility/SocialLogin";

const defaultForm = {
    credential: "",
    password: "",
    remember: false,
}

export default function Login(props) {
    usePageTitle('Login');
    const navigate = useNavigate();
    const { isLoading, setIsLoading, setAlert } = useOutletContext();
    const { auth, setAuth } = useAuthContext();
    const { loginState, login } = AuthService();
    const { t } = useTranslation();

    const [validation, setValidation] = useState({});
    const [form, setForm] = useState(defaultForm);

    useEffect(() => {
        setIsLoading(loginState.LOADING);

        if (loginState.SUCCESS) {
            const { message, data = {} } = loginState.RESULT;
            setAlert({
                show: true,
                type: 'success',
                autoClose: true,
                message,
            });

            Toast.success(message);
            resetForm();

            console.log(data);
            setAuth({
                ...data,
                isLogin: true,
            });
        } else if (loginState.ERROR) {
            const { message, error = {} } = loginState.RESULT;
            setValidation(error);

            setAlert({
                show: true,
                type: 'error',
                message,
            });

            Toast.error(message);
        }

    }, [loginState]);

    useEffect(() => {
        if (auth.isLogin) {
            setTimeout(() => navigate('/dashboard'), 2000);
        }
    }, [auth]);

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
        await login(form.credential, form.password);
    }

    function resetForm() {
        setForm(defaultForm);
    }

    return (
        <>
            <section className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="/assets/img/draw2.webp" className="img-fluid" alt="Sample image" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={handleSubmit}>

                            <SocialLogin />

                            <FormInput type="text" name="credential" value={form.credential} onChange={handleInputChange} validation={validation} handleId="credential" label={t('label.email_address_username')} placeholder={t('placeholder.email_address')} required />

                            <FormInput type="password" name="password" value={form.password} onChange={handleInputChange} validation={validation} handleId="password" label={t('label.password')} placeholder={t('placeholder.password')} required />

                            <div className="d-flex justify-content-between align-items-center">
                                <div className="form-check mb-0">
                                    <input className="form-check-input me-2" type="checkbox" name="remember" checked={form.remember} onChange={handleInputChange} id="remember" />
                                    <label className="form-check-label" htmlFor="remember">
                                        {t('label.remember_me')}
                                    </label>
                                </div>
                                <Link to={'/auth/forgot'} className="text-body"> {t('label.forgot_password_question')}</Link>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <ButtonSpinner type="submit" isLoading={isLoading} text={t('label.login')} />
                                <p className="small fw-bold mt-2 pt-1 mb-0">{t('label.donot_have_account')}
                                    <Link to={'/auth/register'} className="link-danger"> {t('label.register')}</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}