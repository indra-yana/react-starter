import { handleInputType } from "../../../../utils/input-helper";
import { Link, useOutletContext } from "react-router-dom";
import { Toast } from "../../../../utils/alert";
import { usePageTitle } from "../../../../hooks/usePageTitle";
import { useTranslation } from "react-i18next";
import AuthService from "../../../../core/service/AuthService";
import ButtonSpinner from "../../../components/button/ButtonSpinner";
import FormInput from "../../../components/form/FormInput";
import React, { useEffect, useState } from "react";

const defaultForm = {
    email: "",
}

export default function Forgot(props) {
    usePageTitle('Forgot Password');
    const { isLoading, setIsLoading, setAlert } = useOutletContext();
    const { sendResetLinkState, sendResetPasswordLink } = AuthService();
    const { t } = useTranslation();

    const [validation, setValidation] = useState({});
    const [form, setForm] = useState(defaultForm);

    useEffect(() => {
        setIsLoading(sendResetLinkState.LOADING);

        if (sendResetLinkState.SUCCESS) {
            const { message, data = {} } = sendResetLinkState.RESULT;
            setAlert({
                show: true,
                type: 'success',
                autoClose: true,
                message,
            });

            Toast.success(message);
            resetForm();
            console.log(data);
        } else if (sendResetLinkState.ERROR) {
            const { message, error = {} } = sendResetLinkState.RESULT;
            setValidation(error);

            setAlert({
                show: true,
                type: 'error',
                message,
            });

            Toast.error(message);
        }

    }, [sendResetLinkState])

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
        await sendResetPasswordLink(form.email);
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
                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0 fs-5">{t('label.forgot_password')}</p>
                            </div>

                            <FormInput type="email" name="email" handleId="email" value={form.email} onChange={handleInputChange} validation={validation} label={t('label.email_address')} placeholder={t('placeholder.email_address')} required />

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <ButtonSpinner type="submit" isLoading={isLoading} text={t('label.send_reset_link')} />
                                <p className="small fw-bold mt-2 pt-1 mb-0">{t('label.already_remember_password_question')}
                                    <Link to={'/auth/login'} className="link-danger"> {t('label.back_to_login')}</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}