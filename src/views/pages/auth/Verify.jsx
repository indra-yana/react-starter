import { Toast } from "src/utils/alert";
import { useAuthContext } from "src/hooks/useAuthContext";
import { useNavigate, useOutletContext, useParams, useSearchParams } from "react-router-dom";
import { usePageTitle } from "src/hooks/usePageTitle";
import { useTranslation } from "react-i18next";
import AuthService from "src/core/service/AuthService";
import ButtonSpinner from "src/views/components/button/ButtonSpinner";
import React, { useEffect, useState } from "react";

const defaultForm = {
    token: "",
    email: "",
}

export default function Verify(props) {
    usePageTitle('Verify Account');
    const { auth, setAuth } = useAuthContext();
    const { isLoading, setIsLoading, setAlert } = useOutletContext();
    const { verifyState, sendVerificationLinkState, verify, sendVerificationLink } = AuthService();
    const { token } = useParams();
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [validation, setValidation] = useState({});
    const [form, setForm] = useState(defaultForm);
    const email = auth.user ? auth.user.email : searchParams.get('email');

    useEffect(() => {
        if (!auth.isLogin) {
            navigate('/auth/login');
        }
    }, [auth.isLogin]);

    useEffect(() => {
        if (token !== 'undefined') {
            setForm({
                token,
                email,
            });
        }
    }, []);

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

            const { user = {} } = data;
            if (user.email_verified_at) {
                redirectToDashboard(user);
            }

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

            const { user = {} } = data;
            if (user.email_verified_at) {
                redirectToDashboard(user);
            }

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

    function redirectToDashboard(newUser) {
        setAuth((prevAuth) => ({
            ...prevAuth,
            user: {
                ...auth.user,
                email_verified_at: newUser.email_verified_at,
            }
        }));
        
        setTimeout(() => navigate('/dashboard'), 2000);
    }

    async function handleVerify(e) {
        e.preventDefault();
        await verify(form.token, form.email);
    }

    async function handleResendVerificationLink(e) {
        e.preventDefault();
        await sendVerificationLink(email);
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
                                <p className="text-center fw-bold mx-3 mb-0 fs-5">{t('label.verify_account')}</p>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-12 col-form-label text-md-right">
                                    <h5>{t('label.hi')} <span className="fst-italic">{email}</span></h5>
                                    <h5>{t('label.verify_account_desc_1')}</h5>
                                    <p className="m-0">{t('label.verify_account_desc_1')}</p>
                                </div>
                            </div>
                            
                            {token !== 'undefined' 
                                ? (<div className="text-center text-lg-start mt-4 pt-2">
                                    <ButtonSpinner type="submit" isLoading={isLoading} text={t('label.verify')} />
                                    <p className="small fw-bold mt-2 pt-1 mb-0 me-2">{t('label.verify_resend_link')}&nbsp;
                                        <a type="button" className="link-danger" onClick={handleResendVerificationLink}> {t('label.resend')}</a>
                                    </p>
                                    </div>)
                                : (<ButtonSpinner type="button" isLoading={isLoading} text={t('label.resend')} onClick={handleResendVerificationLink}/>)
                            }
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}