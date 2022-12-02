import { Link, useRouteError } from "react-router-dom";

function CommonError(props) {
    const error = useRouteError();
    console.log(error);
    
    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <Link to={`/`}>
                <button type="button">Home</button>
            </Link>
        </div>
    )
}

export default CommonError;