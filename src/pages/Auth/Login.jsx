import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { usePageTitle } from "../../hooks/usePageTitle";
import { sleep } from "../../repository/contact-repository";

export default function Login(props) {
    usePageTitle('Login');
    const  [email, setEmail] = useLocalStorage("email", "");
    const { setIsLoading } = useOutletContext();

    function handleChange(e) {
        setEmail(e.target.value);
    }

    async function handleSubmit() {
        // Some expensive operation
        setIsLoading(true);
        await sleep(3000);
        setIsLoading(false);
    }

    return (
        <>
            <section className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="/assets/img/draw2.webp" className="img-fluid" alt="Sample image" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form>
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
                                <label className="form-label" htmlFor="email">Email address <span className="text-danger">*</span></label>
                                <input type="email" name="email" value={email} onChange={handleChange} id="email" className="form-control form-control-md" placeholder="Enter a valid email address" required />
                            </div>

                            <div className="form-outline mb-3">
                                <label className="form-label" htmlFor="password">Password <span className="text-danger">*</span></label>
                                <input type="password" name="password" id="password" className="form-control form-control-md" placeholder="Enter password" required />
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                <div className="form-check mb-0">
                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                    <label className="form-check-label" htmlFor="form2Example3">
                                        Remember me
                                    </label>
                                </div>
                                <Link to={'/auth/forgot'} className="text-body"> Forgot password?</Link>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="button" onClick={handleSubmit} className="btn btn-outline-primary px-5">Login</button>
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