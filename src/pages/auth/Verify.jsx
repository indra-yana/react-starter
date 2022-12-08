import { AuthViewModel } from "../../core/viewmodel/AuthViewModel";
import { Link, useOutletContext, useParams, useSearchParams } from "react-router-dom";
import { Toast } from "../../utils/alert";
import { usePageTitle } from "../../hooks/usePageTitle";
import ButtonSpinner from "../../components/button/ButtonSpinner";
import React, { useEffect, useState } from "react";

const defaultForm = {
    token: "",
    email: "",
}

export default function Verify(props) {
    usePageTitle('Verify Account');
    const { isLoading, setIsLoading, setAlert } = useOutletContext();
    const { verifyState, sendVerificationLinkState, verify, sendVerificationLink } = AuthViewModel();
    const { token } = useParams();
    const [searchParams] = useSearchParams();

    const [validation, setValidation] = useState({});
    const [form, setForm] = useState(defaultForm);

    useEffect(() => {
        setForm({
            token,
            email: searchParams.get('email'),
        });
    }, [])

    useEffect(() => {
        setIsLoading(verifyState.LOADING);

        if (verifyState.SUCCESS) {
            const { message, data = {} } = verifyState.RESULT;
            setAlert({
                show: true,
                type: 'success',
                autoClose: true,
                message,
            });

            Toast.success(message);
            console.log(data);
        } else if (verifyState.ERROR) {
            const { message, error = {} } = verifyState.RESULT;
            setValidation(error);

            setAlert({
                show: true,
                type: 'error',
                message,
            });

            Toast.error(message);
        }
    }, [verifyState]);

    useEffect(() => {
        setIsLoading(sendVerificationLinkState.LOADING);

        if (sendVerificationLinkState.SUCCESS) {
            const { message, data = {} } = sendVerificationLinkState.RESULT;
            setAlert({
                show: true,
                type: 'success',
                autoClose: true,
                message,
            });

            Toast.success(message);
            console.log(data);
        } else if (sendVerificationLinkState.ERROR) {
            const { message, error = {} } = sendVerificationLinkState.RESULT;
            setValidation(error);

            setAlert({
                show: true,
                type: 'error',
                message,
            });

            Toast.error(message);
        }
    }, [sendVerificationLinkState]);

    async function handleVerify(e) {
        e.preventDefault();
        await verify(form.token, form.email);
    }

    async function handleResendVerificationLink(e) {
        e.preventDefault();
        await sendVerificationLink(form.email);
    }

    return (
        <>
            <section className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="/assets/img/draw2.webp" className="img-fluid" alt="Sample image" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={handleVerify}>
                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0 fs-5">Verify Account</p>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-12 col-form-label text-md-right">
                                    <h5>Hi <span className="fst-italic">{form.email}</span></h5>
                                    <h5>Before continuing, please check your email for a verification link.</h5>
                                    <p className="m-0">If you did not receive the email, click <cite>Resend</cite> verification bellow.</p>
                                </div>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <ButtonSpinner type="submit" isLoading={isLoading} text="Verify" />
                                <p className="small fw-bold mt-2 pt-1 mb-0 me-2">Or resend verification link.&nbsp;
                                    <a type="button" className="link-danger" onClick={handleResendVerificationLink}> Resend</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}