import { useNavigate } from "react-router-dom";
import BackControl from "./BackControl";

export default function Card(props) {
    const { 
        title = '',
        onBackHandler = null
    } = props;

    const navigate = useNavigate();

    return (
        <>
            <div className="card">
                <div className="card-header d-flex align-items-center">
                    {onBackHandler && <BackControl navigateTo={onBackHandler} className="text-dark me-2" />}
                    <h5 className="m-0">{title}</h5>
                </div>
                <div className="card-body">
                    {props.children}
                </div>
            </div>
        </>
    )

}