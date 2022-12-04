export default function ValidationFeedback(props) {
    let validation = props.validation || [];
    let validationItems = validation.map((error, index) =>
        <li key={index.toString()}>{error}</li>
    )

    return (
        <div class="invalid-feedback mt-1">
            <ul className="p-0">{validationItems}</ul>
        </div>
    )
}