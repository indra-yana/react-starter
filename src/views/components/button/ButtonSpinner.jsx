export default function ButtonSpinner(props) {
    const {
        className = '',
        isLoading = false,
        text = 'Submit',
        loadingText = 'Loading...',
        type = 'button',
        variant = 'btn-primary',
        onClick = (e) => { },
    } = props;

    return(
        <>
            <button type={type} className={`btn px-5 ${variant} ${className}`} disabled={isLoading} onClick={onClick}>
                {isLoading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
                {isLoading ? loadingText : text}
            </button>
        </>
    )
}