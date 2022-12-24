import BackControl from "./BackControl";

export default function Card(props) {
    const { 
        title = '',
        onBackHandler = null
    } = props;

    return (
        <>
            <div className="card">
                <div className="card-header d-flex align-items-center">
                    {onBackHandler && <BackControl navigateTo={onBackHandler} className="btn btn-warning btn-circle btn-circle-sm me-2 shadow-sm" />}
                    <h5 className="m-0">{title}</h5>
                </div>
                <div className="card-body">
                    {props.children}
                </div>
            </div>
        </>
    )

}