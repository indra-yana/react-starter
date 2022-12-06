import { handleInputType } from "../../../utils/input-helper";
import { Link, useOutletContext } from "react-router-dom";
import { Toast } from "../../../utils/alert";
import { AuthViewModel } from "../../../core/viewmodel/AuthViewModel";
import { useEffect } from "react";
import { usePageTitle } from "../../../hooks/usePageTitle";
import { useState } from "react";
import React from "react";

const defaultForm = {
    email: "",
}

export default function Forgot(props) {
    usePageTitle('Forgot Password');
    const { setIsLoading, setAlert } = useOutletContext();
    
    const [validation, setValidation] = useState({});
    const [form, setForm] = useState(defaultForm);
    
    const [state, sendResetPasswordLink] = AuthViewModel();

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

    useEffect(() => {
        setIsLoading(state.LOADING);

        if (state.SUCCESS) {
            const { message, data = {} } = state.RESULT;
            setAlert({
                show: true,
                type: 'success',
                autoClose: true,
                message,
            });

            Toast.success(message);
            resetForm();
            console.log(data);
        } else if (state.ERROR) {
            const { message, error = {} } = state.RESULT;
            setValidation(error);

            setAlert({
                show: true,
                type: 'error',
                message,
            });

            Toast.error(message);
        }

    }, [state])

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
                                <button type="submit" className="btn btn-outline-primary px-5">Send Reset Link</button>
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