export default function ButtonEdit(props) {
    const {
        text = '',
        onClick = (e) => { },
    } = props;

    return(
        <>
            <button type={'button'} className={`btn btn-sm btn-success m-1`} onClick={onClick} title="Edit">
                <i className="text-light fas fa-edit"></i>
                {text}
            </button>
        </>
    )
}