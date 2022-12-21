import ValidationFeedback from "./ValidationFeedback";

export default function FormInput(props) {

    const {
        name = '',
        type = 'text',
        handleId,
        label = '',
        required = false,
        placeholder = '',
        onChange = (e) => { },
        className = '',
        value,
        validation = {},
        autoComplete,
        accept,
    } = props;

    return (
        <>
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor={handleId}>{label} {required && <span className="text-danger">*</span>}</label>
                <input 
                    type={type} 
                    name={name} 
                    id={handleId} 
                    value={value} 
                    onChange={onChange} 
                    className={`form-control ${className} ${validation[name] && 'is-invalid'}`} 
                    placeholder={placeholder} 
                    required={required} 
                    autoComplete={autoComplete} 
                    accept={accept}
                />
                <ValidationFeedback validation={validation[name]} />
            </div>
        </>
    )
}