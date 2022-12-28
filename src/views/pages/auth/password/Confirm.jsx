import { handleInputType } from "src/utils/input-helper";
import { Link, useOutletContext } from "react-router-dom";
import { t } from "i18next";
import { Toast } from "src/utils/alert";
import { usePageTitle } from "src/hooks/usePageTitle";
import AuthService from "src/core/service/AuthService";
import ButtonSpinner from "src/views/components/button/ButtonSpinner";
import React, { useEffect, useState } from "react";
import FormInput from "src/views/components/form/FormInput";

const defaultForm = {
    password: "",
}

export default function Confirm(props) {
    usePageTitle('Password Confirmation');
    const { isLoading, setIsLoading, setAlert } = useOutletContext();
    const { confirmPasswordState, confirmPassword } = AuthService();

    const [validation, setValidation] = useState({});
    const [form, setForm] = useState(defaultForm);

    useEffect(() => {
        setIsLoading(confirmPasswordState.LOADING);

        if (confirmPasswordState.SUCCESS) {
            const { message, data = {} } = confirmPasswordState.RESULT;
            setAlert({
                show: true,
                type: 'success',
                autoClose: true,
                message,
            });

            Toast.success(message);
            resetForm();
            console.log(data);
        } else if (confirmPasswordState.ERROR) {
            const { message, error = {} } = confirmPasswordState.RESULT;
            setValidation(error);

            setAlert({
                show: true,
                type: 'error',
                message,
            });

            Toast.error(message);
        }

    }, [confirmPasswordState])

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
        await confirmPassword(form.password);
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
                                <p className="text-center fw-bold mx-3 mb-0 fs-5">{t('label.password_confirm')}</p>
                            </div>

                            <FormInput type="password" name="password" value={form.password} onChange={handleInputChange} validation={validation} handleId="password" label={t('label.password')} placeholder={t('placeholder.password')} required />

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <ButtonSpinner type="submit" isLoading={isLoading} text={t('label.confirm')} />
                                <p className="small fw-bold mt-2 pt-1 mb-0">{t('label.forgot_password_question')}
                                    <Link to={'/auth/forgot'} className="link-danger" state={{from: 'confirm'}}> {t('label.reset_password')}</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}