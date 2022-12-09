import { useLocation } from "react-router-dom";

export default function Breadcrumb(props) {
    return (
        <>
            <nav>
                <ol className="breadcrumb">
                    {props.children}
                </ol>
            </nav>
        </>
    )
}