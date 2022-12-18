export default function ButtonCreate(props) {
    const {
        text = '',
        onClick = (e) => { },
    } = props;

    return(
        <>
            <button type={'button'} className={`btn btn-sm btn-warning m-1`} onClick={onClick} title={text}>
                <i className="fas fa-pencil-alt me-2"></i>
                {text}
            </button>
        </>
    )
}