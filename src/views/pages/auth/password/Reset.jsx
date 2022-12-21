import { handleInputType } from "../../../../utils/input-helper";
import { Toast } from "../../../../utils/alert";
import { useOutletContext, useParams, useSearchParams } from "react-router-dom";
import { usePageTitle } from "../../../../hooks/usePageTitle";
import { useTranslation } from "react-i18next";
import AuthService from "../../../../core/service/AuthService";
import ButtonSpinner from "../../../components/button/ButtonSpinner";
import FormInput from "../../../components/form/FormInput";
import React, { useEffect, useState } from "react";

const defaultForm = {
    email: "",
    token: "",
    password: "",
    password_confirmation: "",
}

export default function Reset(props) {
    usePageTitle('Reset Password');
    const { isLoading, setIsLoading, setAlert } = useOutletContext();
    const { resetPasswordState, resetPassword } = AuthService();
    const { token } = useParams();
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const [validation, setValidation] = useState({});
    const [form, setForm] = useState(defaultForm);

    useEffect(() => {
        setForm((prevState) => ({
            ...prevState,
            token,
            email: searchParams.get('email'),
        }));
    }, [])

    useEffect(() => {
        setIsLoading(resetPasswordState.LOADING);

        if (resetPasswordState.SUCCESS) {
            const { message, data = {} } = resetPasswordState.RESULT;
            setAlert({
                show: true,
                type: 'success',
                autoClose: true,
                message,
            });

            Toast.success(message);
            resetForm();
            console.log(data);
        } else if (resetPasswordState.ERROR) {
            const { message, error = {} } = resetPasswordState.RESULT;
            setValidation(error);

            setAlert({
                show: true,
                type: 'error',
                message,
            });

            Toast.error(message);
        }

    }, [resetPasswordState])

    function handleInputChange(e) {
        const { name } = e.target;
        const value = handleInputType(e);
        delete validation[name];

        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await resetPassword(form);
    }

    function resetForm() {
        setForm({
            ...defaultForm,
            token,
            email: searchParams.get('email'),
        });
    }

    return (
        <>
            <section className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="/assets/img/draw2.webp" className="img-fluid" alt="Sample image" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={handleSubmit} >
                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0 fs-5">{t('label.reset_password')}</p>
                            </div>

                            <FormInput type="password" name="password" value={form.password} handleId="password" onChange={handleInputChange}  validation={validation} label={t('label.new_password')}  placeholder={t('placeholder.new_password')} required autoComplete="new-password" />

                            <FormInput type="password" name="password_confirmation" handleId="password_confirmation" value={form.password_confirmation} onChange={handleInputChange} validation={validation} label={t('label.password_confirmation')} placeholder={t('placeholder.password_confirmation')} required autoComplete="new-password" />

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <ButtonSpinner type="submit" isLoading={isLoading} text={t('label.reset')} />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}