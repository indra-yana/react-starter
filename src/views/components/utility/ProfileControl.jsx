import { useAuthContext } from "../../../hooks/useAuthContext";

export default function ProfileControl(props) {
    const { auth, setAuth } = useAuthContext();

    function handleLogout(e) {
        e.preventDefault();
        setAuth({});
    }

    return (
        <>
            {auth.isLogin &&
                <li className="nav-item dropdown mt-2 mt-sm-0 ms-2">
                    <a id="navbarDropdown" className="nav-link dropdown-toggle p-1" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                        <img src={auth.user.avatar || "/vite.svg"} alt="avatar" width="32" height="32" className="rounded-circle border border-1 border-secondary" />
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end rounded-3 border-0 shadow p-2" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item rounded-2" href="#">{auth.user.name}</a></li>
                        <li><a className="dropdown-item rounded-2" href="#">{auth.user.email}</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item rounded-2" style={{ cursor: 'pointer', }} onClick={handleLogout}>Logout</a></li>
                    </ul>
                </li>
            }
        </>
    )
}