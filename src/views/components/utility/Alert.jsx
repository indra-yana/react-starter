import { useEffect } from "react";
import { Toast } from "src/utils/alert";

export default function Alert(props) {
    const { 
        type = 'info', 
        title = null, 
        message = "", 
        show = false, 
        autoClose = false, 
        toast = false, 
    } = props.alert;

    let alertType;
    let alertTitle;
    switch (type) {
        case 'warning':
            alertType = 'alert-warning';
            alertTitle = title || 'Warning!';
            break;
        case 'success':
            alertType = 'alert-success';
            alertTitle = title || 'Well done!';
            break;
        case 'error':
            alertType = 'alert-danger';
            alertTitle = title || 'Oh no! something went wrong';
            break;
        case 'info':
        default:
            alertType = 'alert-primary';
            alertTitle = title || 'FYI!';
            break;
    }

    useEffect(() => {
        // TODO: Hot fix, this is rendered twice
        if (show && toast) {
            Toast[type](message);
        }
    }, []);

    useEffect(() => {
        let closeTimeout = null;
        if (autoClose) {
            closeTimeout = setTimeout(() => {
                props.onAlertCloseClick();
            }, 8000);
        }
        
        return () => {
            if (closeTimeout != null) {
                clearTimeout(closeTimeout);
            }
        };
    }, []);

    return(
        <>
            {show && 
            <div className={`alert mb-3 alert-dismissible fade show ${alertType} ${props.className}`} role="alert">
                {alertTitle && <h5 className="alert-heading m-0 mb-1">{ alertTitle }</h5>}
                <p className="m-0">{ message }</p>
                <button type="button" className="btn btn-sm btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={props.onAlertCloseClick}></button>
            </div>}
        </>
    )
}