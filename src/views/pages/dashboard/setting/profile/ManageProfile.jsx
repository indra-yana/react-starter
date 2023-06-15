import { dateFormat } from "src/utils/dateformater";
import { handleInputType } from "src/utils/input-helper";
import { Toast } from "src/utils/alert";
import { useAuthContext } from "src/hooks/useAuthContext";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { usePageTitle } from "src/hooks/usePageTitle"
import { UserService } from "src/core/service/UserService";
import { useTranslation } from "react-i18next";
import AvatarPreview from "src/views/components/utility/AvatarPreview";
import ButtonSpinner from "src/views/components/button/ButtonSpinner";
import FormInput from "src/views/components/form/FormInput";
import FormInputPlain from "src/views/components/form/FormInputPlain";

const defaultPreview = '/assets/img/user.png';
const defaultForm = {
    id: "",
    name: "",
    username: "",
    email: "",
    avatar: null,
}

export default function ManageProfile(props) {
    const { t } = useTranslation();

    usePageTitle('Manage Profile');
    const { auth, setAuth } = useAuthContext();
    const { isLoading, setIsLoading, setAlert } = useOutletContext();
    const { isLogin = false, user = {} } = auth;
    const { updateState, showState, show, update } = UserService();
    const [avatarPreview, setAvatarPreview] = useState(defaultPreview);
    const [validation, setValidation] = useState({});
    const [form, setForm] = useState(defaultForm);

    useEffect(() => {
        show(user.id);
    }, [])

    useEffect(() => {
        setIsLoading(updateState.LOADING);

        if (updateState.SUCCESS) {
            const { message, data = {} } = updateState.RESULT;
            setAlert({
                show: true,
                type: 'success',
                autoClose: true,
                message,
            });

            Toast.success(message);

            const {
                id,
                name,
                username,
                email,
                avatar,
                updatedAt,
                created_at,
            } = data;

            if (user.id === id) {
                setAuth((prevAuth) => ({
                    ...prevAuth,
                    user: {
                        ...user,
                        name,
                        username,
                        email,
                        avatar,
                        updatedAt,
                        created_at,
                    }
                }));
            }

            setForm((prevState) => ({
                ...prevState,
                updatedAt,
                created_at,
            }));
        } else if (updateState.ERROR) {
            const { message, error = {} } = updateState.RESULT;
            setValidation(error);

            setAlert({
                show: true,
                type: 'error',
                message,
            });

            Toast.error(message);
        }
    }, [updateState]);

    useEffect(() => {
        setIsLoading(showState.LOADING);

        if (showState.SUCCESS) {
            const { message, data = {} } = showState.RESULT;
            const {
                id,
                name,
                username,
                email,
                avatar,
                updatedAt,
                created_at,
            } = data;

            setForm((prevState) => ({
                ...prevState,
                id,
                name,
                username,
                email,
                updatedAt,
                created_at,
            }));

            if (avatar) {
                setAvatarPreview(avatar);
            }
        } else if (showState.ERROR) {
            const { message, error = {} } = showState.RESULT;
            setValidation(error);

            setAlert({
                show: true,
                type: 'error',
                message,
            });

            Toast.error(message);
        }
    }, [showState]);

    function handleInputChange(e) {
        const { name } = e.target;
        const value = handleInputType(e);
        delete validation[name];

        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (name === 'avatar' && value) {
            setAvatarPreview(URL.createObjectURL(value));
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        delete form.created_at;
        delete form.updatedAt;

        await update(form);
    }

    return (
        <>
            <section className="px-3">
                <div className="row">
                    <div className="col-md-12">
                        {/* <h4>TODO: Profile Management</h4> */}
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <FormInput type="text" name="name" handleId="name" value={form.name} onChange={handleInputChange} validation={validation} label={t('label.name')} placeholder={t('placeholder.name')} required />

                            <FormInput type="text" name="username" handleId="username" value={form.username} onChange={handleInputChange} validation={validation} label={t('label.username')} placeholder={t('placeholder.username')} required autoComplete="new-password" />

                            <FormInput type="email" name="email" handleId="email" value={form.email} onChange={handleInputChange} validation={validation} label={t('label.email_address')} placeholder={t('placeholder.email_address')} required />

                            <div className="row">
                                <div className="col-lg-6 col-md-12">
                                    <FormInput type="file" name="avatar" handleId="avatar" onChange={handleInputChange} validation={validation} label={t('label.avatar')} accept="image/*" />
                                </div>
                                <div className="col-lg-6 col-md-12">
                                    <AvatarPreview src={avatarPreview} handleId={'avatar-preview'} />
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col-lg-6 col-md-12">
                                    <FormInputPlain label={t('label.registered_at')} value={dateFormat(form.created_at, true)} />
                                </div>
                                <div className="col-lg-6 col-md-12">
                                    <FormInputPlain label={t('label.last_updated_at')} value={dateFormat(form.updatedAt, true)} />
                                </div>
                            </div>

                            <hr />
                            <div className="text-center text-lg-start mt-4 pt-2">
                                <ButtonSpinner type="submit" variant="btn-success" isLoading={isLoading} text={t('label.save_changes')} />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}