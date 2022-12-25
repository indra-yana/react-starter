import { useTranslation } from "react-i18next"

export default function SocialLogin(props) {
    const { t } = useTranslation();

    return (
        <>
            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <div className="d-flex flex-column flex-md-row align-items-center gap-3">
                    <p className="fw-normal mb-0">{t('label.sign_in_with')}</p>
                    <div className="d-flex gap-3">
                        <a href="#" class="btn btn-outline-danger btn-social btn-circle shadow-sm" title="Google">
                            <i class="fab fa-google"> </i>
                        </a>

                        <a href="#" class="btn btn-outline-primary btn-social btn-circle shadow-sm" title="Facebook">
                            <i class="fab fa-facebook"></i>
                        </a>

                        <a href="#" class="btn btn-outline-info btn-social btn-circle shadow-sm" title="Twitter">
                            <i class="fab fa-twitter"> </i>
                        </a>

                        <a href="#" class="btn btn-outline-secondary btn-social btn-circle shadow-sm" title="Github">
                            <i class="fab fa-github"> </i>
                        </a>
                    </div>
                </div>
            </div>

            <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">{t('label.or')}</p>
            </div>
        </>
    )
}