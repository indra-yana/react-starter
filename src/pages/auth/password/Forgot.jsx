import AuthViewModel from "../../../core/viewmodel/AuthViewModel";
import { handleInputType } from "../../../utils/input-helper";
import { Link, useOutletContext } from "react-router-dom";
import { Toast } from "../../../utils/alert";
import { useEffect } from "react";
import { usePageTitle } from "../../../hooks/usePageTitle";
import { useState } from "react";
import React from "react";
import ButtonSpinner from "../../../components/button/ButtonSpinner";

const defaultForm = {
    email: "",
}

export default function Forgot(props) {
    usePageTitle('Forgot Password');
    const { isLoading, setIsLoading, setAlert } = useOutletContext();
    const { sendResetLinkState, sendResetPasswordLink } = AuthViewModel();

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
                                <p className="text-center fw-bold mx-3 mb-0 fs-5">Forgot Password</p>
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="email">Email address <span className="text-danger">*</span></label>
                                <input type="email" name="email" id="email" value={form.email} onChange={handleInputChange} className="form-control form-control-md" placeholder="Enter a valid email address" required />
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <ButtonSpinner type="submit" isLoading={isLoading} text="Send Reset Link" />
                                <p className="small fw-bold mt-2 pt-1 mb-0">Already remember your password?
                                    <Link to={'/auth/login'} className="link-danger"> Back to Login</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}