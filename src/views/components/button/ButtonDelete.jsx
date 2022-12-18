export default function ButtonDelete(props) {
    const {
        text = '',
        onClick = (e) => { },
    } = props;

    return(
        <>
            <button type={'button'} className={`btn btn-sm btn-danger m-1`} onClick={onClick} title="Delete">
                <i className="text-light fas fa-trash-alt"></i>
                {text}
            </button>
        </>
    )
}