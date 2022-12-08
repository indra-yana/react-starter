import { AuthViewModel } from "../../../core/viewmodel/AuthViewModel";
import { handleInputType } from "../../../utils/input-helper";
import { Toast } from "../../../utils/alert";
import { useOutletContext, useParams, useSearchParams } from "react-router-dom";
import { usePageTitle } from "../../../hooks/usePageTitle";
import ButtonSpinner from "../../../components/button/ButtonSpinner";
import React, { useEffect, useState } from "react";
import ValidationFeedback from "../../../components/form/ValidationFeedback";

const defaultForm = {
    email: "",
    token: "",
    password: "",
    password_confirmation: "",
}

export default function Reset(props) {
    usePageTitle('Reset Password');
    const { isLoading, setIsLoading, setAlert } = useOutletContext();
    const { resetPasswordState, resetPassword } = AuthViewModel();
    const { token } = useParams();
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
                            <input type="hidden" name="token" />
                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0 fs-5">Reset Password</p>
                            </div>

                            <div className="form-outline mb-3">
                                <label className="form-label" htmlFor="password">New Password <span className="text-danger">*</span></label>
                                <input type="password" name="password" value={form.password} onChange={handleInputChange} id="password" className={`form-control ${validation.password ? 'is-invalid' : ''}`} placeholder="Enter new password" required autoComplete="new-password" />
                                <ValidationFeedback validation={validation.password} />
                            </div>

                            <div className="form-outline mb-3">
                                <label className="form-label" htmlFor="password_confirmation">Repeat Password <span className="text-danger">*</span></label>
                                <input type="password" name="password_confirmation" id="password_confirmation" value={form.password_confirmation} onChange={handleInputChange} className={`form-control ${validation.password_confirmation ? 'is-invalid' : ''}`} placeholder="Enter password confirmation" required autoComplete="new-password" />
                                <ValidationFeedback validation={validation.password_confirmation} />
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <ButtonSpinner type="submit" isLoading={isLoading} text="Reset" />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}