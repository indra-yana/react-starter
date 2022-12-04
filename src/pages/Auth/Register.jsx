import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function Register(props) {
    usePageTitle('Register');

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
                                <p className="lead fw-normal mb-0 me-3">Register Using</p>
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
                                <label className="form-label" htmlFor="name">Name <span className="text-danger">*</span></label>
                                <input type="text" name="name" id="name" className="form-control form-control-md" placeholder="Enter your name" required />
                            </div>
                            
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="email">Email address <span className="text-danger">*</span></label>
                                <input type="email" name="email" id="email" className="form-control form-control-md" placeholder="Enter a valid email address" required />
                            </div>

                            <div className="form-outline mb-3">
                                <label className="form-label" htmlFor="password">Password <span className="text-danger">*</span></label>
                                <input type="password" name="password" id="password" className="form-control form-control-md" placeholder="Enter password" required />
                            </div>
                            
                            <div className="form-outline mb-3">
                                <label className="form-label" htmlFor="password_confirmation">Repeat Password <span className="text-danger">*</span></label>
                                <input type="password" name="password_confirmation" id="password_confirmation" className="form-control form-control-md" placeholder="Enter password confirmation" required />
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="submit" className="btn btn-outline-primary px-5">Register</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account?
                                    <Link to={'/auth/login'} className="link-danger"> Login</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}