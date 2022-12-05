import { Link, useOutletContext } from "react-router-dom";
import { RepositoryFactory } from "../../../core/repository/RepositoryFactory";
import { Toast } from "../../../utils/alert";
import { usePageTitle } from "../../../hooks/usePageTitle";
import { useState } from "react";
import React from "react";

const authRepository = RepositoryFactory.get('auth');

export default function Forgot(props) {
    usePageTitle('Forgot Password');
    const { setIsLoading } = useOutletContext();
    
    const [validation, setValidation] = useState({});
    const [email, setEmail] = useState("");

    function handleInputChange(e) {
        const { name: inputName, value = "" } = e.target;
        delete validation[inputName];

        switch (inputName) {
            case 'email':
                setEmail(value);
                break;
            default:
                break;
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        const result = await authRepository.sendResetPasswordLink(email);
        const { message, status, data = {}, error = {} } = result;

        setIsLoading(false);
        if (status === 'error') {
            setValidation(error);
            Toast.error(message);
            return;
        }

        Toast.success(message);

        console.log(result);
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
                                <input type="email" name="email" id="email" value={email} onChange={handleInputChange} className="form-control form-control-md" placeholder="Enter a valid email address" required />
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