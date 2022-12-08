import { AuthViewModel } from "../../core/viewmodel/AuthViewModel";
import { handleInputType } from "../../utils/input-helper";
import { Link, useOutletContext } from "react-router-dom";
import { Toast } from "../../utils/alert";
import { useEffect } from "react";
import { usePageTitle } from "../../hooks/usePageTitle";
import React, { useState } from "react";
import ValidationFeedback from "../../components/form/ValidationFeedback";
import ButtonSpinner from "../../components/button/ButtonSpinner";

const defaultPreview = '/assets/img/user.png';
const defaultForm = {
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    avatar: null,
}

export default function Register(props) {
    usePageTitle('Register');
    const { isLoading, setIsLoading, setAlert } = useOutletContext();
    const { registerState, register } = AuthViewModel();

    const [validation, setValidation] = useState({});
    const [avatarPreview, setAvatarPreview] = useState(defaultPreview);
    const [form, setForm] = useState(defaultForm);

    useEffect(() => {
        setIsLoading(registerState.LOADING);

        if (registerState.SUCCESS) {
            const { message, data = {} } = registerState.RESULT;
            setAlert({
                show: true,
                type: 'success',
                autoClose: true,
                message,
            });

            Toast.success(message);
            resetForm();
            console.log(data);
        } else if (registerState.ERROR) {
            const { message, error = {} } = registerState.RESULT;
            setValidation(error);

            setAlert({
                show: true,
                type: 'error',
                message,
            });

            Toast.error(message);
        }

    }, [registerState])

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

        if (name === 'avatar' && value) {
            setAvatarPreview(URL.createObjectURL(value));
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await register(form);
    }

    function resetForm() {
        setForm(defaultForm);
        setAvatarPreview(defaultPreview);
    }

    return (
        <>
            <section className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="/assets/img/draw2.webp" className="img-fluid" alt="Sample image" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 py-4">
                        <form onSubmit={handleSubmit}>
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
                                <input type="text" name="name" id="name" value={form.name} onChange={handleInputChange} className={`form-control ${validation.name && 'is-invalid'}`} placeholder="Enter your name" required />
                                <ValidationFeedback validation={validation.name} />
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="username">Username <span className="text-danger">*</span></label>
                                <input type="text" name="username" id="username" value={form.username} onChange={handleInputChange} className={`form-control ${validation.username && 'is-invalid'}`} placeholder="Enter your unique name" required />
                                <ValidationFeedback validation={validation.username} />
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="email">Email address <span className="text-danger">*</span></label>
                                <input type="email" name="email" id="email" value={form.email} onChange={handleInputChange} className={`form-control ${validation.email && 'is-invalid'}`} placeholder="Enter a valid email address" required />
                                <ValidationFeedback validation={validation.email} />
                            </div>

                            <div className="form-outline mb-3">
                                <label className="form-label" htmlFor="password">Password <span className="text-danger">*</span></label>
                                <input type="password" name="password" id="password" value={form.password} onChange={handleInputChange} className={`form-control ${validation.password && 'is-invalid'}`} placeholder="Enter password" required />
                                <ValidationFeedback validation={validation.password} />
                            </div>

                            <div className="form-outline mb-3">
                                <label className="form-label" htmlFor="password_confirmation">Repeat Password <span className="text-danger">*</span></label>
                                <input type="password" name="password_confirmation" id="password_confirmation" value={form.password_confirmation} onChange={handleInputChange} className={`form-control ${validation.password_confirmation && 'is-invalid'}`} placeholder="Enter password confirmation" required />
                                <ValidationFeedback validation={validation.password_confirmation} />
                            </div>

                            <div className="form-outline mb-3">
                                <label className="form-label" htmlFor="avatar">Avatar</label>
                                <input type="file" name="avatar" id="avatar" onChange={handleInputChange} className={`form-control ${validation.avatar && 'is-invalid'}`} accept="image/*" />
                                <ValidationFeedback validation={validation.avatar} />
                                <br />
                                <img className="img-fluid rounded-circle border border-1 border-secondary avatar-95" src={avatarPreview} id="img-preview" alt="Avatar" />
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <ButtonSpinner type="submit" isLoading={isLoading} text="Register" />
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