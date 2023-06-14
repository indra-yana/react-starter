import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    LoginSocialGoogle,
    LoginSocialFacebook,
    LoginSocialGithub,
    LoginSocialMicrosoft,
    LoginSocialTwitter,
} from 'reactjs-social-login';

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
    const [provider, setProvider] = useState('')
    const [profile, setProfile] = useState(null)
    const { t } = useTranslation();

    useEffect(() => {
        console.log(provider);
    }, [provider])

    useEffect(() => {
        console.log(profile);
    }, [profile])

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
                                setProfile(data)
                            }}
                            onReject={(err) => {
                                console.log(err)
                            }}
                        >
                            <button type="button" className="btn btn-outline-danger btn-social btn-circle shadow-sm" title="Google">
                                <i className="fab fa-google"> </i>
                            </button>
                        </LoginSocialGoogle>

                        <LoginSocialFacebook
                            isOnlyGetToken
                            appId={FB_CLIENT_ID || ''}
                            onResolve={({ provider, data }) => {
                                setProvider(provider)
                                setProfile(data)
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
                                setProfile(data)
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
                                setProfile(data)
                            }}
                            onReject={(err) => {
                                console.log(err)
                            }}
                        >
                            <button type="button" className="btn btn-outline-secondary btn-social btn-circle shadow-sm" title="Github">
                                <i className="fab fa-github"> </i>
                            </button>
                        </LoginSocialGithub>

                        <LoginSocialMicrosoft
                            isOnlyGetToken
                            client_id={MICROSOFT_CLIENT_ID || ''}
                            redirect_uri={REDIRECT_URI}
                            scope="profile openid email User.Read User.Read.All"
                            onResolve={({ provider, data }) => {
                                setProvider(provider)
                                setProfile(data)
                            }}
                            onReject={(err) => {
                                console.log(err)
                            }}
                        >
                            <button type="button" className="btn btn-outline-info btn-social btn-circle shadow-sm" title="Microsoft">
                                <i className="fab fa-microsoft"> </i>
                            </button>
                        </LoginSocialMicrosoft>

                    </div>
                </div>
            </div>

            <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">{t('label.or')}</p>
            </div>
        </>
    )
}