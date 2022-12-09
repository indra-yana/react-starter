import { Link } from "react-router-dom";

export default function BreadcrumbItem(props) {
    const {
        active = false,
        title = '',
        link = '/',
    } = props;

    return (
        <>
            <li className={`breadcrumb-item ${active && 'active'}`}>
                {!active ? <Link to={link}>{title}</Link> : title}
            </li>
        </>
    )
}