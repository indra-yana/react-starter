import AuthViewModel from "../../../core/viewmodel/AuthViewModel";
import { handleInputType } from "../../../utils/input-helper";
import { Link, useOutletContext } from "react-router-dom";
import { Toast } from "../../../utils/alert";
import { usePageTitle } from "../../../hooks/usePageTitle";
import ButtonSpinner from "../../../components/button/ButtonSpinner";
import React, { useEffect, useState } from "react";
import ValidationFeedback from "../../../components/form/ValidationFeedback";

const defaultForm = {
    password: "",
}

export default function Confirm(props) {
    usePageTitle('Password Confirmation');
    const { isLoading, setIsLoading, setAlert } = useOutletContext();
    const { confirmPasswordState, confirmPassword } = AuthViewModel();

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
                                <p className="text-center fw-bold mx-3 mb-0 fs-5">Password Confirmation</p>
                            </div>

                            <div className="form-outline mb-3">
                                <label className="form-label" htmlFor="password">Password <span className="text-danger">*</span></label>
                                <input type="password" name="password" value={form.password} onChange={handleInputChange} id="password" className={`form-control ${validation.password ? 'is-invalid' : ''}`} placeholder="Enter your password" required autoComplete="new-password" />
                                <ValidationFeedback validation={validation.password} />
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <ButtonSpinner type="submit" isLoading={isLoading} text="Confirm" />
                                <p className="small fw-bold mt-2 pt-1 mb-0">Forgot your password?
                                    <Link to={'/auth/forgot'} className="link-danger"> Reset Password</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}