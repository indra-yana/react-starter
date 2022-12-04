import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePageTitle } from "../../../hooks/usePageTitle";

export default function Reset(props) {
    usePageTitle('Reset Password');

    return (
        <>
            <section className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="/assets/img/draw2.webp" className="img-fluid" alt="Sample image" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form>
                            <input type="hidden" name="token"/>
                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0 fs-5">Reset Password</p>
                            </div>

                            <div className="form-outline mb-3">
                                <label className="form-label" htmlFor="password">New Password <span className="text-danger">*</span></label>
                                <input type="password" name="password" id="password" className="form-control form-control-md" placeholder="Enter password" required />
                            </div>
                            
                            <div className="form-outline mb-3">
                                <label className="form-label" htmlFor="password_confirmation">Repeat Password <span className="text-danger">*</span></label>
                                <input type="password" name="password_confirmation" id="password_confirmation" className="form-control form-control-md" placeholder="Enter password confirmation" required />
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="submit" className="btn btn-outline-primary px-5">Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}