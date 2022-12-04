import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePageTitle } from "../../hooks/usePageTitle";

export default function Verify(props) {
    usePageTitle('Verify Account');

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
                                <p className="text-center fw-bold mx-3 mb-0 fs-5">Verify Account</p>
                            </div>
                                <div class="row mb-3">
                                    <div class="col-sm-12 col-form-label text-md-right">
                                        <h5>Before continuing, please check your email for a verification link.</h5>
                                        <p class="m-0">If you did not receive the email, click the action <cite>Resend</cite> verification bellow.</p>
                                    </div>
                                </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="button" className="btn btn-outline-primary px-5">Verify</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0 me-2">Or resend verification link.&nbsp;
                                    <a type="button" className="link-danger"> Resend</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}