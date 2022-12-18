import { useNavigate } from "react-router-dom";

export default function BackControl(props) {
    const navigate = useNavigate();
    const { navigateTo = '/', className = 'text-white' } = props;

    return (
        <>
            <a type="button" className="navbar-brand" onClick={() => navigate(navigateTo)} title="Back">
                <i className={`fas fa-arrow-left ${className}`}></i>
            </a>
        </>
    )
}