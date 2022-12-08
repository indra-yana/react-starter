import { AuthViewModel } from "../../core/viewmodel/AuthViewModel";
import { handleInputType } from "../../utils/input-helper";
import { Link, useOutletContext } from "react-router-dom";
import { Toast } from "../../utils/alert";
import { usePageTitle } from "../../hooks/usePageTitle";
import React, { useEffect, useState } from "react";
import ValidationFeedback from "../../components/form/ValidationFeedback";
import ButtonSpinner from "../../components/button/ButtonSpinner";
import { useAuthContext } from "../../hooks/useAuthContext";

const defaultForm = {
    credential: "",
    password: "",
    remember: false,
}

export default function Login(props) {
    usePageTitle('Login');
    const { isLoading, setIsLoading, setAlert } = useOutletContext();
    const { setAuth } = useAuthContext();
    const { loginState, login } = AuthViewModel();

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

    }, [loginState])

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
                            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                                <button type="button" className="btn btn-primary btn-floating mx-1">
                                    <i className="fab fa-facebook-f text-white"></i>
                                </button>

                                <button type="button" className="btn btn-primary btn-floating mx-1">
                                    <i className="fab fa-twitter text-white"></i>
                                </button>

                                <button type="button" className="btn btn-primary btn-floating mx-1">
                                    <i className="fab fa-linkedin-in text-white"></i>
                                </button>
                            </div>

                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0">Or</p>
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="credential">Email address / Username <span className="text-danger">*</span></label>
                                <input type="text" name="credential" value={form.credential} onChange={handleInputChange} id="credential" className={`form-control ${validation.credential ? 'is-invalid' : ''}`} placeholder="Enter a valid email address" required />
                                <ValidationFeedback validation={validation.credential} />
                            </div>

                            <div className="form-outline mb-3">
                                <label className="form-label" htmlFor="password">Password <span className="text-danger">*</span></label>
                                <input type="password" name="password" value={form.password} onChange={handleInputChange} id="password" className={`form-control ${validation.password ? 'is-invalid' : ''}`} placeholder="Enter password" required />
                                <ValidationFeedback validation={validation.password} />
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                <div className="form-check mb-0">
                                    <input className="form-check-input me-2" type="checkbox" name="remember" checked={form.remember} onChange={handleInputChange} id="remember" />
                                    <label className="form-check-label" htmlFor="remember">
                                        Remember me
                                    </label>
                                </div>
                                <Link to={'/auth/forgot'} className="text-body"> Forgot password?</Link>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <ButtonSpinner type="submit" isLoading={isLoading} text="Login" />
                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account?
                                    <Link to={'/auth/register'} className="link-danger"> Register</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}