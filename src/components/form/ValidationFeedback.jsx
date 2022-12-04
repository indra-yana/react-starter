export default function ValidationFeedback(props) {
    let validation = props.validation || [];
    let validationItems = validation.map((error, index) =>
        <li key={index.toString()}>{error}</li>
    )

    return (
        <div className="invalid-feedback mt-1">
            <ul>{validationItems}</ul>
        </div>
    )
}