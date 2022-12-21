import { useTranslation } from "react-i18next"

export default function SocialLogin(props) {
    const { t } = useTranslation();

    return(
        <>
            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">{t('label.sign_in_with')}</p>
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
                <p className="text-center fw-bold mx-3 mb-0">{t('label.or')}</p>
            </div>
        </>
    )
}