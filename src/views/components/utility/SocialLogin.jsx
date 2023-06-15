import { LoginSocialGoogle, LoginSocialFacebook, LoginSocialGithub, LoginSocialMicrosoft, LoginSocialTwitter, } from 'reactjs-social-login';
import { Toast } from "src/utils/alert";
import { useAuthContext } from "src/hooks/useAuthContext";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthService from "src/core/service/AuthService";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const FB_CLIENT_ID = import.meta.env.VITE_FB_CLIENT_ID;
const TWITTER_CLIENT_ID = import.meta.env.VITE_TWITTER_CLIENT_ID;
const TWITTER_V2_CLIENT_KEY = import.meta.env.VITE_TWITTER_V2_CLIENT_KEY;
const TWITTER_V2_CLIENT_SECRET = import.meta.env.VITE_TWITTER_V2_CLIENT_SECRET;
const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = import.meta.env.VITE_GITHUB_CLIENT_SECRET;
const MICROSOFT_CLIENT_ID = import.meta.env.VITE_MICROSOFT_CLIENT_ID;

// REDIRECT URL must be same with URL where the (reactjs-social-login) components is locate
// MAKE SURE the (reactjs-social-login) components aren't unmounted or destroyed before the ask permission dialog closes
const REDIRECT_URI = window.location.href;

export default function SocialLogin(props) {
    const navigate = useNavigate();
    const [provider, setProvider] = useState('');
    const [authResponse, setAuthResponse] = useState(null);
    const { isLoading, setIsLoading, setAlert } = useOutletContext();
    const { auth, setAuth } = useAuthContext();
    const { loginState, whoamiState, socialLogin, whoami } = AuthService();

    const { t } = useTranslation();

    useEffect(() => {
        console.log(provider, authResponse);
        if (!isLoading && provider && authResponse) {
            socialLogin(authResponse, provider);
        }
    }, [authResponse, provider])

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

            console.log(data);
            setAuth({
                ...data,
            });

            whoami();
        } else if (loginState.ERROR) {
            const { message, error = {} } = loginState.RESULT;
            console.log(error);

            setAlert({
                show: true,
                type: 'error',
                message,
            });

            Toast.error(message);
        }

    }, [loginState]);
   
    useEffect(() => {
        setIsLoading(whoamiState.LOADING);

        if (whoamiState.SUCCESS) {
            const { message, data = {} } = whoamiState.RESULT;
            
            setAlert({
                show: true,
                type: 'success',
                autoClose: true,
                message,
            });

            Toast.success(message);

            console.log(data);

            setAuth((prevState) => ({
                ...prevState,
                isLogin: true,
                user: data,
            }));
        } else if (whoamiState.ERROR) {
            const { message, error = {} } = whoamiState.RESULT;
            console.log(error);

            setAlert({
                show: true,
                type: 'error',
                message,
            });

            Toast.error(message);
        }

    }, [whoamiState]);

    useEffect(() => {
        if (auth.isLogin) {
            setTimeout(() => navigate('/dashboard'), 2000);
        }
    }, [auth]);

    function onAuthError(error) {
        Toast.error(error);

        setAlert({
            show: true,
            type: 'error',
            message: error,
        });
    }

    return (
        <>
            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <div className="d-flex flex-column flex-md-row align-items-center gap-3">
                    <p className="fw-normal mb-0">{t('label.sign_in_with')}</p>
                    <div className="d-flex gap-3">
                        <LoginSocialGoogle
                            isOnlyGetToken
                            client_id={GOOGLE_CLIENT_ID || ''}
                            onResolve={({ provider, data }) => {
                                setProvider(provider)
                                setAuthResponse(data)
                            }}
                            onReject={onAuthError}
                        >
                            <button type="button" className="btn btn-outline-danger btn-social btn-circle shadow-sm" title="Google">
                                <i className="fab fa-google"> </i>
                            </button>
                        </LoginSocialGoogle>

                        <LoginSocialMicrosoft
                            isOnlyGetToken
                            client_id={MICROSOFT_CLIENT_ID || ''}
                            redirect_uri={REDIRECT_URI}
                            scope="profile openid email User.Read User.Read.All"
                            onResolve={({ provider, data }) => {
                                setProvider(provider)
                                setAuthResponse(data)
                            }}
                            onReject={onAuthError}
                        >
                            <button type="button" className="btn btn-outline-success btn-social btn-circle shadow-sm" title="Microsoft">
                                <i className="fab fa-microsoft"> </i>
                            </button>
                        </LoginSocialMicrosoft>

                        <LoginSocialFacebook
                            isOnlyGetToken
                            appId={FB_CLIENT_ID || ''}
                            onResolve={({ provider, data }) => {
                                setProvider(provider)
                                setAuthResponse(data)
                            }}
                            onReject={(err) => {
                                console.log(err)
                            }}
                        >
                            <button type="button" className="btn btn-outline-primary btn-social btn-circle shadow-sm" title="Facebook">
                                <i className="fab fa-facebook"></i>
                            </button>
                        </LoginSocialFacebook>

                        <LoginSocialTwitter
                            isOnlyGetToken
                            client_id={TWITTER_V2_CLIENT_KEY || ''}
                            redirect_uri={REDIRECT_URI}
                            onResolve={({ provider, data }) => {
                                setProvider(provider)
                                setAuthResponse(data)
                            }}
                            onReject={(err) => {
                                console.log(err)
                            }}
                        >
                            <button type="button" className="btn btn-outline-info btn-social btn-circle shadow-sm" title="Twitter">
                                <i className="fab fa-twitter"> </i>
                            </button>
                        </LoginSocialTwitter>

                        <LoginSocialGithub
                            isOnlyGetToken
                            client_id={GITHUB_CLIENT_ID || ''}
                            client_secret={GITHUB_CLIENT_SECRET || ''}
                            redirect_uri={REDIRECT_URI}
                            onResolve={({ provider, data }) => {
                                setProvider(provider)
                                setAuthResponse(data)
                            }}
                            onReject={(err) => {
                                console.log(err)
                            }}
                        >
                            <button type="button" className="btn btn-outline-secondary btn-social btn-circle shadow-sm" title="Github">
                                <i className="fab fa-github"> </i>
                            </button>
                        </LoginSocialGithub>
                    </div>
                </div>
            </div>

            <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">{t('label.or')}</p>
            </div>
        </>
    )
}