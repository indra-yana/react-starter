import { handleUploadedFile } from "src/utils/utility";
import { removeItem } from "src/core/datasource/local/local-storage";
import { useAuthContext } from "src/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function ProfileControl(props) {
    const { size = 'avatar-32', title = false, className = '', } = props;
    const { t } = useTranslation();
    const { auth, setAuth } = useAuthContext();
    const navigate = useNavigate();

    function handleLogout(e) {
        e.preventDefault();
        setAuth({});

        setTimeout(() => {
            removeItem('auth');
        }, 1000);

        navigate('/auth/login');
    }

    function handleAvatar(avatar) {
        return handleUploadedFile({
            folder: 'avatar',
            key: auth.user.id,
            filename: avatar,
        });
    }

    return (
        <>
            {auth.isLogin &&
                <>
                    <a id="navbarDropdown" className="nav-link dropdown-toggle p-1" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                        <img src={handleAvatar(auth.user.avatar)} alt="avatar" className={`img logo rounded-circle border border-1 border-secondary ${size} ${className}`} />
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