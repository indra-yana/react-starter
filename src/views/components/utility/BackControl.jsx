import { useNavigate } from "react-router-dom";

export default function BackControl(props) {
    const navigate = useNavigate();
    const { navigateTo = '/' } = props;

    return (
        <>
            <a type="button" className="navbar-brand" onClick={() => navigate(navigateTo)} title="Back">
                <i className="fas fa-arrow-left text-white"></i>
            </a>
        </>
    )
}