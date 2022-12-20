import { useAuthContext } from "../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function ProfileControl(props) {
    const {
        size = 'avatar-32',
        title = false,
        className = '',
    } = props;

    const { t } = useTranslation();
    const { auth, setAuth } = useAuthContext();
    const navigate = useNavigate();

    function handleLogout(e) {
        e.preventDefault();
        setAuth({});
        navigate('/auth/login');
    }

    return (
        <>
            {auth.isLogin &&
                <>
                    <a id="navbarDropdown" className="nav-link dropdown-toggle p-1" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                        <img src={auth.user.avatar || "/assets/img/avatar-profile.png"} alt="avatar" className={`img logo rounded-circle border border-1 border-secondary ${size} ${className}`} />
                        {title && <span >{t('message.welcome_back', { name: auth.user.name || '' })}</span>}
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end rounded-3 border-0 shadow p-2" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item rounded-2" href="#">{auth.user.email}</a></li>
                        <li><a className="dropdown-item rounded-2" href="#">Profile</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item rounded-2" style={{ cursor: 'pointer', }} onClick={handleLogout}>{t('label.logout')}</a></li>
                    </ul>
                </>
            }
        </>
    )
}