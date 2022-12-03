import { Link } from "react-router-dom";

function Landing(props) {    
    return (
        <div id="error-page">
            <h1>Welcome Back!</h1>
            <p>This is an entry point for your app!</p>
            <Link to={`/contacts`}>
                <button class="btn btn-primary" type="button">{'Goto Main Menu ->'}</button>
            </Link>
        </div>
    )
}

export default Landing;