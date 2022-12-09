import { useLocation } from "react-router-dom";

export default function Breadcrumb(props) {
    return (
        <>
            <nav>
                <ol class="breadcrumb">
                    {props.children}
                </ol>
            </nav>
        </>
    )
}